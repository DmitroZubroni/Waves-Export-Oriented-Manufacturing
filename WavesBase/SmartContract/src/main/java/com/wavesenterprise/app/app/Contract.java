package com.wavesenterprise.app.app;

import com.wavesenterprise.app.api.IContract;
import com.wavesenterprise.app.domain.*;
import com.wavesenterprise.sdk.contract.api.annotation.ContractAction;
import com.wavesenterprise.sdk.contract.api.annotation.ContractHandler;
import com.wavesenterprise.sdk.contract.api.annotation.ContractInit;
import com.wavesenterprise.sdk.contract.api.domain.ContractCall;
import com.wavesenterprise.sdk.contract.api.state.ContractState;
import com.wavesenterprise.sdk.contract.api.state.TypeReference;
import com.wavesenterprise.sdk.contract.api.state.mapping.Mapping;

/**
 * Смарт-контракт: цифровизация экспортно-ориентированных производств.
 *
 * Маппинги:
 *   ORGS  : orgWallet        → Organization  (смарт-аккаунт организации)
 *   USERS : userWallet       → User           (сотрудник; User.role — его роль)
 *   PRODS : orgWallet_name   → Product
 *   BIDS  : senderWallet_ts  → Bid
 *   HIST  : bidId_ts         → String         (хэш события/документа)
 *
 * Роль хранится в User.role, тип организации — в Organization.orgType.
 * Список ключей сотрудников организации — Organization.keys (через запятую).
 * Идентификатор вызывающего: call.getCaller().
 */
@ContractHandler
public class Contract implements IContract {

    private final ContractCall  call;
    private final ContractState state;

    private final Mapping<Organization> ORGS;
    private final Mapping<User>         USERS;
    private final Mapping<Product>      PRODS;
    private final Mapping<Bid>          BIDS;
    private final Mapping<String>       HIST;

    public Contract(ContractCall call, ContractState state) {
        this.call  = call;
        this.state = state;
        ORGS  = state.getMapping(new TypeReference<Organization>() {}, "ORGS");
        USERS = state.getMapping(new TypeReference<User>()         {}, "USERS");
        PRODS = state.getMapping(new TypeReference<Product>()      {}, "PRODS");
        BIDS  = state.getMapping(new TypeReference<Bid>()          {}, "BIDS");
        HIST  = state.getMapping(new TypeReference<String>()       {}, "HIST");
    }

    // ─────────────────────────────────────────────────────────────────────────
    // INIT
    // Деплоер → администратор системы.
    // Его wallet → ADMIN в state, организация OPERATOR, пользователь с ролью ADMIN.
    // ─────────────────────────────────────────────────────────────────────────

    @ContractInit
    public void init() {
        String wallet = call.getCaller();
        state.put("ADMIN", wallet);
        ORGS.put(wallet,  new Organization(wallet, "Operator", OrgType.OPERATOR, "ALL", ""));
        USERS.put(wallet, new User(wallet, wallet, Role.ADMIN, "Admin", "", "Administrator"));
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ПРОЦЕСС 1 — управление учётными записями (только ADMIN)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Регистрация организации и первого сотрудника.
     *
     * Смарт-аккаунт организации создаётся один раз; если уже существует —
     * к списку ключей (org.keys) добавляется wallet нового сотрудника.
     * Роль задаётся конкретному пользователю (user.role), не организации.
     *
     * Критерии: смарт-аккаунт организации; регистрация публичного ключа сотрудника;
     *           повторная регистрация не создаёт дубль; все роли поддерживаются.
     *
     * @param orgWallet   адрес организации (ключ смарт-аккаунта)
     * @param orgType     тип организации: OrgType.*
     * @param userWallet  wallet нового сотрудника (его публичный ключ)
     * @param userRole    роль сотрудника: Role.*
     */
    @ContractAction
    public void registerOrg(String orgWallet, String name, String orgType, String region,
                            String description, String userWallet, String userRole,
                            String fullName, String contact, String position) {
        String admin = state.get("ADMIN", new TypeReference<String>() {});
        if (!call.getCaller().equals(admin)) throw new RuntimeException("ADMIN only");

        if (!ORGS.has(orgWallet)) {
            // первая регистрация — создаём смарт-аккаунт организации
            ORGS.put(orgWallet, new Organization(orgWallet, name, orgType, region, description));
        } else {
            // организация уже есть — добавляем ключ нового сотрудника в список
            Organization org = ORGS.get(orgWallet);
            org.keys = org.keys + "," + userWallet;
            ORGS.put(orgWallet, org);
        }

        // регистрируем публичный ключ сотрудника с его персональной ролью
        if (!USERS.has(userWallet))
            USERS.put(userWallet, new User(userWallet, orgWallet, userRole, fullName, contact, position));
    }

    /**
     * Изменение данных организации и/или пользователя.
     * Пустая строка = не трогать соответствующий объект.
     *
     * Критерий: администратор изменяет параметры учётных записей.
     */
    @ContractAction
    public void updateAccount(String orgWallet, String name, String region, String description,
                              String userWallet, String fullName, String contact, String position) {
        String admin = state.get("ADMIN", new TypeReference<String>() {});
        if (!call.getCaller().equals(admin)) throw new RuntimeException("ADMIN only");

        if (!orgWallet.isEmpty()) {
            Organization org = ORGS.get(orgWallet);
            org.name = name; org.region = region; org.description = description;
            ORGS.put(orgWallet, org);
        }
        if (!userWallet.isEmpty()) {
            User user = USERS.get(userWallet);
            user.fullName = fullName; user.contact = contact; user.position = position;
            USERS.put(userWallet, user);
        }
    }

    /**
     * Блокировка (false) / разблокировка (true) организации и/или пользователя.
     *
     * Критерии: администратор блокирует и разблокирует учётные записи.
     */
    @ContractAction
    public void setActive(String orgWallet, String userWallet, boolean isActive) {
        String admin = state.get("ADMIN", new TypeReference<String>() {});
        if (!call.getCaller().equals(admin)) throw new RuntimeException("ADMIN only");

        if (!orgWallet.isEmpty()) {
            Organization org = ORGS.get(orgWallet);
            org.isActive = isActive;
            ORGS.put(orgWallet, org);
        }
        if (!userWallet.isEmpty()) {
            User user = USERS.get(userWallet);
            user.isActive = isActive;
            USERS.put(userWallet, user);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ПРОЦЕСС 2 — карточки продукции
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Поставщик или оператор создают карточку продукта.
     * approved = false — публикация ждёт подтверждения оператора.
     *
     * Критерии: поставщик вносит информацию о продукции; оператор вносит информацию о продукции.
     */
    @ContractAction
    public void addProduct(String name, String imageUrl, String description,
                           String regions, double minVolume, double maxVolume) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        Organization org = ORGS.get(user.orgAddress);
        if (!org.isActive) throw new RuntimeException("Organisation blocked");
        if (!user.role.equals(Role.SUPPLIER) && !user.role.equals(Role.OPERATOR) && !user.role.equals(Role.ADMIN))
            throw new RuntimeException("Access denied");

        Product p = new Product(user.orgAddress, name, imageUrl, description, regions, minVolume, maxVolume);
        PRODS.put(p.id, p);
    }

    /**
     * Оператор подтверждает карточку: approved = true, вносит certInfo и дистрибуторов.
     *
     * Критерии: соответствие продукции стандартам зафиксировано; покупатели видят certInfo.
     */
    @ContractAction
    public void approveProduct(String productId, String certInfo, String distributors) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.OPERATOR) && !user.role.equals(Role.ADMIN))
            throw new RuntimeException("Access denied");

        Product p = PRODS.get(productId);
        p.approved = true; p.certInfo = certInfo; p.distributors = distributors;
        PRODS.put(productId, p);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ПРОЦЕСС 3 — заявка клиента / дистрибутора
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Создание заявки на производство (PRODUCTION) или поставку (SUPPLY).
     * requestHash — SHA-256 данных заявки, фиксируется в реестре.
     *
     * Критерии: клиент и дистрибутор формируют заявку на производство и на поставку;
     *           хэш заявки сохраняется в распределённом реестре; тип заявки явно указан.
     */
    @ContractAction
    public void createBid(String type, String targetAddress, String productName, double volume,
                          String deliveryDate, String techReqs, String deliveryCond,
                          String address, String paymentTerms, String requestHash) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        Organization org = ORGS.get(user.orgAddress);
        if (!org.isActive) throw new RuntimeException("Organisation blocked");
        if (!user.role.equals(Role.CLIENT) && !user.role.equals(Role.DISTRIBUTOR))
            throw new RuntimeException("Access denied");

        Bid bid = new Bid(type, user.orgAddress, targetAddress, productName, volume,
                deliveryDate, techReqs, deliveryCond, address, paymentTerms, requestHash);
        BIDS.put(bid.id, bid);
    }

    /**
     * Оператор / дистрибутор отвечает на заявку.
     * propose = true  → NEGOTIATING (клиент должен подтвердить).
     * propose = false → IN_PROGRESS (принято сразу).
     * Обновлённый хэш фиксируется в HIST.
     *
     * Критерии: оператор вносит сведения по заказам; хэш обновлённых условий в реестре; totalCost.
     */
    @ContractAction
    public void respondToBid(String bidId, double totalCost, String deliveryDate,
                             String deliveryCond, String paymentTerms,
                             String updatedHash, boolean propose) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.OPERATOR) && !user.role.equals(Role.ADMIN) && !user.role.equals(Role.DISTRIBUTOR))
            throw new RuntimeException("Access denied");

        Bid bid = BIDS.get(bidId);
        if (!bid.status.equals(BidStatus.PENDING) && !bid.status.equals(BidStatus.NEGOTIATING))
            throw new RuntimeException("Wrong status: " + bid.status);

        bid.totalCost    = totalCost;
        bid.deliveryDate = deliveryDate;
        bid.deliveryCond = deliveryCond;
        bid.paymentTerms = paymentTerms;
        bid.requestHash  = updatedHash;
        bid.status = propose ? BidStatus.NEGOTIATING : BidStatus.IN_PROGRESS;

        HIST.put(bidId + "_" + System.currentTimeMillis(), updatedHash + "|responded");
        BIDS.put(bidId, bid);
    }

    /**
     * Клиент принимает (true → IN_PROGRESS) или отклоняет (false → CANCELLED) условия.
     */
    @ContractAction
    public void clientRespond(String bidId, boolean accept) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.CLIENT) && !user.role.equals(Role.DISTRIBUTOR))
            throw new RuntimeException("Access denied");

        Bid bid = BIDS.get(bidId);
        if (!bid.status.equals(BidStatus.NEGOTIATING))
            throw new RuntimeException("Wrong status: " + bid.status);

        bid.status = accept ? BidStatus.IN_PROGRESS : BidStatus.CANCELLED;
        BIDS.put(bidId, bid);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ПРОЦЕСС 4 — поставщик исполняет заявку
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Поставщик принимает заявку в работу.
     * Критерий: поставщик подтверждает получение заказа на производство.
     */
    @ContractAction
    public void acceptBid(String bidId, String stageHash) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.SUPPLIER)) throw new RuntimeException("Access denied");

        Bid bid = BIDS.get(bidId);
        if (!bid.status.equals(BidStatus.IN_PROGRESS))
            throw new RuntimeException("Wrong status: " + bid.status);

        bid.stageStatus = "Производство начато";
        HIST.put(bidId + "_" + System.currentTimeMillis(), stageHash + "|accepted");
        BIDS.put(bidId, bid);
    }

    /**
     * Поставщик обновляет текущий этап поставки + фиксирует хэш документа этапа в HIST.
     * Примеры stageStatus: "Производство завершено", "Груз на границе", "Таможня пройдена".
     *
     * Критерии: сведения о ходе заказа; этапы поставки в реестре; статус виден клиенту.
     */
    @ContractAction
    public void updateStage(String bidId, String stageStatus, String stageHash) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.SUPPLIER)) throw new RuntimeException("Access denied");

        Bid bid = BIDS.get(bidId);
        if (!bid.status.equals(BidStatus.IN_PROGRESS))
            throw new RuntimeException("Wrong status: " + bid.status);

        bid.stageStatus = stageStatus;
        HIST.put(bidId + "_" + System.currentTimeMillis(), stageHash + "|" + stageStatus);
        BIDS.put(bidId, bid);
    }

    /**
     * Поставщик завершает поставку последней партии → WAITING_PAYMENT.
     * Критерий: после доставки последней партии статус меняется на «Ожидает оплаты».
     */
    @ContractAction
    public void markDelivered(String bidId, String deliveryHash) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.SUPPLIER)) throw new RuntimeException("Access denied");

        Bid bid = BIDS.get(bidId);
        if (!bid.status.equals(BidStatus.IN_PROGRESS))
            throw new RuntimeException("Wrong status: " + bid.status);

        bid.stageStatus = "Передача груза покупателю";
        bid.status = BidStatus.WAITING_PAYMENT;
        HIST.put(bidId + "_" + System.currentTimeMillis(), deliveryHash + "|delivered");
        BIDS.put(bidId, bid);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ПРОЦЕСС 5 — приёмка, оплата и рекламация (один метод)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Оператор принимает поставку и сразу решает её судьбу.
     *
     * accepted = true  → товар принят, оплачен → статус PAID.
     *   paymentHash фиксируется в HIST.
     *
     * accepted = false → товар не принят, качество не соответствует → статус CLAIM.
     *   claimComment (причина претензии) и его хэш фиксируются в HIST.
     *   Рекламационная работа ведётся вне системы.
     *   После урегулирования оператор вызывает этот же метод с accepted = true.
     *
     * Критерии: оплата при успешной проверке; рекламация при несоответствии;
     *           хэши и даты рекламации в реестре; индекс надёжности через claimComment.
     */
    @ContractAction
    public void finalizeDelivery(String bidId, boolean accepted,
                                 String comment, String commentHash) {
        String wallet = call.getCaller();
        User user = USERS.get(wallet);
        if (user == null || !user.isActive) throw new RuntimeException("User blocked or not found");
        if (!user.role.equals(Role.OPERATOR) && !user.role.equals(Role.ADMIN) && !user.role.equals(Role.DISTRIBUTOR))
            throw new RuntimeException("Access denied");

        Bid bid = BIDS.get(bidId);
        if (!bid.status.equals(BidStatus.WAITING_PAYMENT) && !bid.status.equals(BidStatus.CLAIM))
            throw new RuntimeException("Wrong status: " + bid.status);

        if (accepted) {
            // товар принят → оплачиваем
            bid.status = BidStatus.PAID;
            HIST.put(bidId + "_" + System.currentTimeMillis(), commentHash + "|paid");
        } else {
            // товар не принят → рекламация
            bid.status = BidStatus.CLAIM;
            bid.claimComment = comment;
            HIST.put(bidId + "_" + System.currentTimeMillis(), commentHash + "|claim");
        }

        BIDS.put(bidId, bid);
    }
}