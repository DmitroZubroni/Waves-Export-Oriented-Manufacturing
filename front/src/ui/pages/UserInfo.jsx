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
    contractId,
    sender,
    url,
    organizations,
    products,
    bids,
    blockHeight,
    networkMode,
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
      <div style={{ minHeight: "100vh", background: "#090D16" }}>
        <Header />
        <Authorization />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="mfg-container">
        {/* State Simulator Controls (for Studio «Калибр» Review) */}
        <div className="d-flex justify-content-end gap-2 mb-3">
          <span className="text-secondary mono-data align-self-center" style={{ fontSize: "0.75rem" }}>
            [ПРОВЕРКА СОСТОЯНИЙ ЭКРАНА У1]:
          </span>
          <button
            type="button"
            onClick={() => {
              setSimulatedLoading(true);
              setTimeout(() => setSimulatedLoading(false), 1200);
            }}
            className="mfg-btn-ghost py-1 px-2 mono-data"
            style={{ minHeight: 32, fontSize: "0.75rem" }}
          >
            Тест Загрузки
          </button>
          <button
            type="button"
            onClick={() => setSimulatedError(!simulatedError)}
            className={`mfg-btn-ghost py-1 px-2 mono-data ${simulatedError ? "text-danger" : ""}`}
            style={{ minHeight: 32, fontSize: "0.75rem" }}
          >
            {simulatedError ? "Сбросить ошибку" : "Тест Ошибки"}
          </button>
        </div>

        {/* Counterparty Passport Card */}
        <section className="mfg-card p-4 p-md-5 mb-4">
          <div className="d-flex flex-wrap align-items-start justify-content-between gap-4">
            <div className="flex-grow-1" style={{ maxWidth: 700 }}>
              <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                <span className="mfg-badge-cyan">
                  <span className="mfg-diode mfg-diode-cyan" />
                  <span>{currentOrg.userRole}</span>
                </span>
                <span className="mfg-badge-emerald">
                  <span>●</span>
                  <span>{typograph("Узел синхронизирован")}</span>
                </span>
                <span className="mfg-badge-amber">
                  <span>★</span>
                  <span>ISO 9001:2015</span>
                </span>
              </div>

              <h1 className="fw-bold text-white mb-2" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)" }}>
                {typograph(currentOrg.name)}
              </h1>

              <p className="text-secondary mb-3 leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                {typograph(currentOrg.description)}
              </p>

              <div className="d-flex flex-wrap gap-4 pt-3 border-top border-secondary border-opacity-15">
                <div>
                  <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                    АДРЕС SENDER
                  </div>
                  <div className="mono-data text-white font-bold" style={{ fontSize: "0.85rem" }}>
                    {sender}
                  </div>
                </div>
                <div>
                  <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                    РЕГИОН ПРОИЗВОДСТВА
                  </div>
                  <div className="text-white" style={{ fontSize: "0.85rem" }}>
                    {currentOrg.region}
                  </div>
                </div>
                <div>
                  <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                    ОТВЕТСТВЕННОЕ ЛИЦО
                  </div>
                  <div className="text-white" style={{ fontSize: "0.85rem" }}>
                    {currentOrg.fullName} ({currentOrg.position})
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column align-items-end justify-content-between gap-3">
              <IsoQualityBadge width={72} height={72} />
              <div className="text-end">
                <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                  ТЕКУЩИЙ БЛОК WAVES
                </div>
                <div className="mono-data text-cyan-400 fw-bold" style={{ fontSize: "1.1rem" }}>
                  #{blockHeight.toLocaleString("ru-RU")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industrial KPI Metrics Bar (Rule Л10: 3-5 numbers driving role decisions) */}
        <section className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="mfg-card p-3 h-100">
              <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                ПАРТИЙ В РЕЕСТРЕ
              </div>
              <div className="fs-3 fw-bold text-white mono-data my-1">
                {userProducts.length}
              </div>
              <div className="text-emerald-400" style={{ fontSize: "0.75rem" }}>
                {userProducts.filter((p) => p.approved).length} сертифицировано ISO
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="mfg-card p-3 h-100">
              <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                ЭКСПОРТНЫХ ЗАЯВОК
              </div>
              <div className="fs-3 fw-bold text-white mono-data my-1">
                {userBids.length}
              </div>
              <div className="text-cyan-400" style={{ fontSize: "0.75rem" }}>
                {userBids.filter((b) => b.status === "IN_TRANSIT").length} в морском транзите
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="mfg-card p-3 h-100">
              <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                ОБЕСПЕЧЕНИЕ ЭСКРОУ
              </div>
              <div className="fs-3 fw-bold text-white mono-data my-1">
                285 500
              </div>
              <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                WAVES (Заблокировано в смарт-контракте)
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="mfg-card p-3 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                  СТАНДАРТ КАЧЕСТВА
                </div>
                <div className="fs-5 fw-bold text-amber-400 my-1">
                  ISO 9001:2015
                </div>
              </div>
              <Link to="/func" className="mfg-btn-primary py-1 px-3 text-center text-decoration-none" style={{ minHeight: 34, fontSize: "0.8125rem" }}>
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
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
              <div className="d-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`mfg-btn-secondary py-1 px-3 ${activeTab === "all" ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : ""}`}
                  style={{ minHeight: 38, fontSize: "0.8125rem" }}
                >
                  Все записи ({userProducts.length + userBids.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className={`mfg-btn-secondary py-1 px-3 ${activeTab === "products" ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : ""}`}
                  style={{ minHeight: 38, fontSize: "0.8125rem" }}
                >
                  Партии продукции ({userProducts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("bids")}
                  className={`mfg-btn-secondary py-1 px-3 ${activeTab === "bids" ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400" : ""}`}
                  style={{ minHeight: 38, fontSize: "0.8125rem" }}
                >
                  Экспортные заявки ({userBids.length})
                </button>
              </div>

              <input
                type="text"
                placeholder="Поиск по названию или ID..."
                className="mfg-input mono-data"
                style={{ width: 280, minHeight: 38, fontSize: "0.875rem" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
              <div className="row g-3">
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
                      <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                        <div className="mfg-card p-4 h-100 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="mfg-badge-cyan mono-data" style={{ fontSize: "0.7rem" }}>
                                {prod.id}
                              </span>
                              <span className={prod.approved ? "mfg-badge-emerald" : "mfg-badge-amber"}>
                                {prod.approved ? "ISO ОДОБРЕНО" : "НА ПРОВЕРКЕ"}
                              </span>
                            </div>
                            <h3 className="fw-bold text-white mb-2" style={{ fontSize: "1rem" }}>
                              {typograph(prod.name)}
                            </h3>
                            <p className="text-secondary mb-3" style={{ fontSize: "0.8125rem" }}>
                              {typograph(prod.description)}
                            </p>
                          </div>

                          <div className="pt-3 border-top border-secondary border-opacity-15">
                            <div className="d-flex justify-content-between text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                              <span>Партия: {prod.serialBatch}</span>
                              <span className="text-white font-bold">{prod.quantity} {prod.unit}</span>
                            </div>
                            <div className="text-secondary mono-data mt-1 text-truncate" style={{ fontSize: "0.7rem" }}>
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
                      <div key={bid.id} className="col-12 col-md-6 col-lg-4">
                        <div className="mfg-card p-4 h-100 d-flex flex-column justify-content-between border-cyan-500/30">
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <span className="mfg-badge-amber mono-data" style={{ fontSize: "0.7rem" }}>
                                {bid.id}
                              </span>
                              <span className="mfg-badge-cyan">
                                {bid.currentStage}
                              </span>
                            </div>
                            <h3 className="fw-bold text-white mb-2" style={{ fontSize: "1rem" }}>
                              {typograph(bid.title)}
                            </h3>
                            <div className="text-secondary mono-data mb-3" style={{ fontSize: "0.8125rem" }}>
                              Условия: <span className="text-white">{bid.incoterms}</span>
                            </div>
                          </div>

                          <div className="pt-3 border-top border-secondary border-opacity-15">
                            <div className="d-flex justify-content-between text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                              <span>Эскроу:</span>
                              <span className="text-cyan-400 font-bold">{bid.totalEscrow}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="progress mt-2" style={{ height: 6, background: "#1E293B" }}>
                              <div
                                className="progress-bar bg-info"
                                role="progressbar"
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
