import { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import Authorization from "../component/Authorization.jsx";
import { typograph } from "../../core/typograph";
import { EmptyState, LoadingSkeleton, ErrorState } from "../component/States.jsx";
import IsoQualityBadge from "../component/art/IsoQualityBadge.jsx";

const UserInfo = () => {
  const {
    sender,
    organizations,
    products,
    bids,
    blockHeight,
    setNetworkMode,
  } = useContext(AtlantContext);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);

  // Identify current organization profile
  const currentOrg = useMemo(() => {
    return (
      organizations.find((o) => o.orgWallet === sender) || {
        name: "Авторизованный промышленный участник",
        userRole: "ENTERPRISE",
        orgType: "Участник цепи поставок",
        region: "Международный транзитный хаб",
        description: "Подтвержденная цифровая подпись в реестре Waves.",
        contact: "contact@waves-mfg.internal",
        fullName: "Уполномоченный представитель",
        isoCertified: true,
      }
    );
  }, [organizations, sender]);

  // Products linked to sender
  const userProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.creator === sender ||
        p.approvedBy === sender ||
        currentOrg.userRole === "MANUFACTURER" ||
        currentOrg.userRole === "INSPECTOR"
    );
  }, [products, sender, currentOrg]);

  // Bids linked to sender
  const userBids = useMemo(() => {
    return bids.filter(
      (b) =>
        b.supplierWallet === sender ||
        b.clientWallet === sender ||
        b.carrierWallet === sender ||
        currentOrg.userRole === "MANUFACTURER" ||
        currentOrg.userRole === "CARRIER" ||
        currentOrg.userRole === "CLIENT"
    );
  }, [bids, sender, currentOrg]);

  if (!sender) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Header />
        <Authorization />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />

      <main id="main-content" className="container cabinet">
        {/* State Simulator Controls (for Studio «Калибр» Review) */}
        <div className="flex justify-end gap-2 mb-3">
          <span className="text-muted mono-data self-center" style={{ fontSize: "0.75rem" }}>
            Демонстрация состояний:
          </span>
          <button
            type="button"
            onClick={() => {
              setSimulatedLoading(true);
              setTimeout(() => setSimulatedLoading(false), 1200);
            }}
            className="btn btn-ghost py-1 px-2 mono-data"
            style={{ minHeight: 44, fontSize: "0.75rem" }}
          >
            Тест Загрузки
          </button>
          <button
            type="button"
            onClick={() => setSimulatedError(!simulatedError)}
            className={`btn btn-ghost py-1 px-2 mono-data ${simulatedError ? "text-danger" : ""}`}
            style={{ minHeight: 44, fontSize: "0.75rem" }}
          >
            {simulatedError ? "Сбросить ошибку" : "Тест Ошибки"}
          </button>
        </div>

        {/* Counterparty Passport Card */}
        <section className="card p-4 cabinet-passport mb-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1" style={{ maxWidth: 700 }}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="badge badge-primary">
                  <span className="diode diode-primary" />
                  <span>{currentOrg.userRole}</span>
                </span>
                <span className="badge badge-success">
                  <span>●</span>
                  <span>{typograph("Узел синхронизирован")}</span>
                </span>
                <span className="badge badge-accent">
                  <span>★</span>
                  <span>ISO 9001:2015</span>
                </span>
              </div>

              <h1 className="fw-700 text-body mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)" }}>
                {typograph(currentOrg.name)}
              </h1>

              <p className="text-muted mb-3 max-prose" style={{ fontSize: "0.9375rem" }}>
                {typograph(currentOrg.description)}
              </p>

              <div className="flex flex-wrap gap-4 pt-3 border-top ">
                <div>
                  <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                    АДРЕС SENDER
                  </div>
                  <div className="mono-data text-body fw-700" style={{ fontSize: "0.85rem" }}>
                    {sender}
                  </div>
                </div>
                <div>
                  <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                    РЕГИОН ПРОИЗВОДСТВА
                  </div>
                  <div className="text-body" style={{ fontSize: "0.85rem" }}>
                    {currentOrg.region}
                  </div>
                </div>
                <div>
                  <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                    ОТВЕТСТВЕННОЕ ЛИЦО
                  </div>
                  <div className="text-body" style={{ fontSize: "0.85rem" }}>
                    {currentOrg.fullName} ({currentOrg.position})
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between gap-3">
              <IsoQualityBadge width={72} height={72} />
              <div className="text-right">
                <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                  ТЕКУЩИЙ БЛОК WAVES
                </div>
                <div className="mono-data text-primary fw-700" style={{ fontSize: "1.1rem" }}>
                  #{blockHeight.toLocaleString("ru-RU")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industrial KPI Metrics Bar (Rule Л10: 3-5 numbers driving role decisions) */}
        <section className="grid-stats mb-6">
          <div className="min-w-0">
            <div className="card p-3 h-100">
              <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                ПАРТИЙ В РЕЕСТРЕ
              </div>
              <div className="text-metric fw-700 text-body mono-data my-1">
                {userProducts.length}
              </div>
              <div className="text-success" style={{ fontSize: "0.75rem" }}>
                {userProducts.filter((p) => p.approved).length} сертифицировано ISO
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="card p-3 h-100">
              <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                ЭКСПОРТНЫХ ЗАЯВОК
              </div>
              <div className="text-metric fw-700 text-body mono-data my-1">
                {userBids.length}
              </div>
              <div className="text-primary" style={{ fontSize: "0.75rem" }}>
                {userBids.filter((b) => b.status === "IN_TRANSIT").length} в морском транзите
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="card p-3 h-100">
              <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                ОБЕСПЕЧЕНИЕ ЭСКРОУ
              </div>
              <div className="text-metric fw-700 text-body mono-data my-1">
                285 500
              </div>
              <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                WAVES (Заблокировано в смарт-контракте)
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="card p-3 h-100 flex flex-col justify-between">
              <div>
                <div className="text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                  СТАНДАРТ КАЧЕСТВА
                </div>
                <div className="text-xl fw-700 text-accent my-1">
                  ISO 9001:2015
                </div>
              </div>
              <Link to="/func" className="btn btn-primary py-1 px-3 text-center no-underline" style={{ minHeight: 44, fontSize: "0.8125rem" }}>
                + Новая операция
              </Link>
            </div>
          </div>
        </section>

        {/* 4 States of Screen (Rule У1) */}
        {simulatedError ? (
          <ErrorState
            title="Сбой связи с узлом блокчейна"
            description="Не удалось загрузить данные контрагента. Сервер не ответил в течение тайм-аута."
            onRetry={() => setSimulatedError(false)}
            secondaryAction={() => {
              setSimulatedError(false);
              setNetworkMode("demo");
            }}
          />
        ) : simulatedLoading ? (
          <LoadingSkeleton count={3} />
        ) : (
          <section>
            {/* Header with Search and Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`btn btn-secondary py-1 px-3 ${activeTab === "all" ? "is-active" : ""}`}
                  style={{ minHeight: 44, fontSize: "0.8125rem" }}
                >
                  Все записи ({userProducts.length + userBids.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className={`btn btn-secondary py-1 px-3 ${activeTab === "products" ? "is-active" : ""}`}
                  style={{ minHeight: 44, fontSize: "0.8125rem" }}
                >
                  Партии продукции ({userProducts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("bids")}
                  className={`btn btn-secondary py-1 px-3 ${activeTab === "bids" ? "is-active" : ""}`}
                  style={{ minHeight: 44, fontSize: "0.8125rem" }}
                >
                  Экспортные заявки ({userBids.length})
                </button>
              </div>

              <label htmlFor="cabinet-search" className="cabinet-search">Поиск по названию или ID
              <input
                id="cabinet-search"
                type="search"
                placeholder="Поиск по названию или ID..."
                className="control mono-data"
                style={{ width: 280, minHeight: 44, fontSize: "0.875rem" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              </label>
            </div>

            {/* Content Lists */}
            {activeTab === "products" && userProducts.length === 0 ? (
              <EmptyState
                title="Партии продукции не найдены"
                description="Для вашего адреса пока нет зарегистрированных партий продукции (ключи PRODS_*)."
                actionLabel="Зарегистрировать партию в реестре"
                onAction={() => window.location.assign("/func")}
              />
            ) : activeTab === "bids" && userBids.length === 0 ? (
              <EmptyState
                title="Экспортные заявки отсутствуют"
                description="Для вашего контрагента пока нет активных внешнеторговых заявок."
                actionLabel="Создать новую заявку"
                onAction={() => window.location.assign("/func")}
              />
            ) : (
              <div className="grid-cards">
                {/* Products cards */}
                {(activeTab === "all" || activeTab === "products") &&
                  userProducts
                    .filter((p) =>
                      searchQuery
                        ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase())
                        : true
                    )
                    .map((prod) => (
                      <div key={prod.id} className="min-w-0">
                        <div className="card p-4 h-100 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="badge badge-primary mono-data" style={{ fontSize: "0.75rem" }}>
                                {prod.id}
                              </span>
                              <span className={prod.approved ? "badge badge-success" : "badge badge-accent"}>
                                {prod.approved ? "ISO ОДОБРЕНО" : "НА ПРОВЕРКЕ"}
                              </span>
                            </div>
                            <h3 className="fw-700 text-body mb-2" style={{ fontSize: "1rem" }}>
                              {typograph(prod.name)}
                            </h3>
                            <p className="text-muted mb-3" style={{ fontSize: "0.8125rem" }}>
                              {typograph(prod.description)}
                            </p>
                          </div>

                          <div className="pt-3 border-top ">
                            <div className="flex justify-between text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                              <span>Партия: {prod.serialBatch}</span>
                              <span className="text-body fw-700">{prod.quantity} {prod.unit}</span>
                            </div>
                            <div className="text-muted mono-data mt-1 truncate" style={{ fontSize: "0.75rem" }}>
                              Контейнер: {prod.containerId}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                {/* Bids cards */}
                {(activeTab === "all" || activeTab === "bids") &&
                  userBids
                    .filter((b) =>
                      searchQuery
                        ? b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchQuery.toLowerCase())
                        : true
                    )
                    .map((bid) => (
                      <div key={bid.id} className="min-w-0">
                        <div className="card p-4 h-100 flex flex-col justify-between ">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="badge badge-accent mono-data" style={{ fontSize: "0.75rem" }}>
                                {bid.id}
                              </span>
                              <span className="badge badge-primary">
                                {bid.currentStage}
                              </span>
                            </div>
                            <h3 className="fw-700 text-body mb-2" style={{ fontSize: "1rem" }}>
                              {typograph(bid.title)}
                            </h3>
                            <div className="text-muted mono-data mb-3" style={{ fontSize: "0.8125rem" }}>
                              Условия: <span className="text-body">{bid.incoterms}</span>
                            </div>
                          </div>

                          <div className="pt-3 border-top ">
                            <div className="flex justify-between text-muted mono-data" style={{ fontSize: "0.75rem" }}>
                              <span>Эскроу:</span>
                              <span className="text-primary fw-700">{bid.totalEscrow}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="progress-track mt-2" style={{ height: 6, background: "var(--surface-2)" }}>
                              <div
                                className="progress-fill"
                                role="progressbar"
                                aria-label="Прогресс поставки"
                                style={{ width: `${bid.stageProgress}%` }}
                                aria-valuenow={bid.stageProgress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default UserInfo;
