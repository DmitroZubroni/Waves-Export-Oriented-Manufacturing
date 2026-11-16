import { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState, ErrorState } from "../component/States.jsx";

const BidInfo = () => {
  const { bids, post, setNetworkMode, addToast } = useContext(AtlantContext);

  const [filterStage, setFilterStage] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);

  const filteredBids = useMemo(() => {
    return bids.filter((bid) => {
      if (filterStage === "TRANSIT" && bid.status !== "IN_TRANSIT") return false;
      if (filterStage === "CUSTOMS" && bid.status !== "CUSTOMS_HOLD") return false;
      if (filterStage === "COMPLETED" && bid.status !== "COMPLETED") return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          bid.title.toLowerCase().includes(q) ||
          bid.id.toLowerCase().includes(q) ||
          bid.incoterms.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [bids, filterStage, searchQuery]);

  const handleAdvanceStage = async (bid) => {
    const nextStage =
      bid.currentStage === "CUSTOMS_CLEARANCE"
        ? "SEA_FREIGHT"
        : bid.currentStage === "SEA_FREIGHT"
        ? "FINALIZED_DELIVERY"
        : "IN_TRANSIT";

    await post([
      { key: "action", type: "string", value: "updateStage" },
      { key: "bidId", type: "string", value: bid.id },
      { key: "stage", type: "string", value: nextStage },
    ]);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="mfg-container">
        {/* State Simulator Controls */}
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

        {/* Page Banner */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="mfg-badge-cyan">{typograph("Внешнеторговый трекинг")}</span>
              <span className="mfg-badge-emerald">Smart Escrow</span>
            </div>
            <h1 className="fs-3 fw-bold text-white mb-1">
              {typograph("Экспортные заявки и логистические контракты")}
            </h1>
            <p className="text-secondary mb-0" style={{ fontSize: "0.9375rem", maxWidth: "60ch" }}>
              {typograph(
                "Прослеживаемость международных партий по стандартам Инкотермс, фиксация этапов доставки и автоматический расчет в смарт-контракте Waves."
              )}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/func" className="mfg-btn-primary">
              <span>+ Сформировать заявку (BIDS)</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mfg-card p-3 mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterStage("ALL")}
                className={`mfg-btn-secondary py-1 px-3 ${filterStage === "ALL" ? "bg-cyan-500/20 text-cyan-400" : ""}`}
                style={{ minHeight: 34, fontSize: "0.8125rem" }}
              >
                Все заявки ({bids.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStage("TRANSIT")}
                className={`mfg-btn-secondary py-1 px-3 ${filterStage === "TRANSIT" ? "bg-cyan-500/20 text-cyan-400" : ""}`}
                style={{ minHeight: 34, fontSize: "0.8125rem" }}
              >
                В транзите ({bids.filter((b) => b.status === "IN_TRANSIT").length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStage("CUSTOMS")}
                className={`mfg-btn-secondary py-1 px-3 ${filterStage === "CUSTOMS" ? "bg-amber-500/20 text-amber-400" : ""}`}
                style={{ minHeight: 34, fontSize: "0.8125rem" }}
              >
                Таможенный контроль ({bids.filter((b) => b.status === "CUSTOMS_HOLD").length})
              </button>
            </div>

            <div className="flex-grow-1" style={{ maxWidth: 300 }}>
              <input
                type="text"
                className="mfg-input mono-data"
                placeholder="Поиск по заявкам..."
                style={{ minHeight: 36, fontSize: "0.8125rem" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4 States Handling (Rule У1) */}
        {simulatedError ? (
          <ErrorState
            title="Сбой загрузки реестра заявок"
            description="Не удалось синхронизировать статусы экспортных контрактов с блокчейном Waves."
            onRetry={() => setSimulatedError(false)}
            secondaryAction={() => {
              setSimulatedError(false);
              setNetworkMode("demo");
            }}
          />
        ) : simulatedLoading ? (
          <LoadingSkeleton count={3} />
        ) : filteredBids.length === 0 ? (
          <EmptyState
            title="Экспортные заявки не найдены"
            description="В контракте пока нет заявок по выбранным условиям фильтрации."
            actionLabel="Создать новую заявку"
            onAction={() => window.location.assign("/func")}
          />
        ) : (
          <div className="row g-4">
            {filteredBids.map((bid) => (
              <div key={bid.id} className="col-12 col-lg-6">
                <div className="mfg-card p-4 h-100 d-flex flex-column justify-content-between border-cyan-500/30">
                  <div>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="mfg-badge-cyan mono-data" style={{ fontSize: "0.75rem" }}>
                        {bid.id}
                      </span>
                      <span className="mfg-badge-amber mono-data font-bold">
                        {bid.incoterms}
                      </span>
                    </div>

                    <h2 className="fs-5 fw-bold text-white mb-2" style={{ lineHeight: 1.3 }}>
                      {typograph(bid.title)}
                    </h2>

                    {/* Escrow & Volume Metrics */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div className="p-2.5 rounded-3 mono-data" style={{ background: "#090D16" }}>
                          <div className="text-secondary" style={{ fontSize: "0.7rem" }}>СУММА ЭСКРОУ:</div>
                          <div className="text-cyan-400 font-bold" style={{ fontSize: "0.95rem" }}>
                            {bid.totalEscrow}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-2.5 rounded-3 mono-data" style={{ background: "#090D16" }}>
                          <div className="text-secondary" style={{ fontSize: "0.7rem" }}>ОБЪЕМ ПОСТАВКИ:</div>
                          <div className="text-white font-bold" style={{ fontSize: "0.95rem" }}>
                            {bid.quantity} шт. ({bid.pricePerUnit} / шт.)
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parties */}
                    <div className="mono-data mb-3" style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                      <div>Поставщик: <span className="text-white">{bid.supplierWallet}</span></div>
                      <div>Заказчик: <span className="text-white">{bid.clientWallet}</span></div>
                      <div>Перевозчик: <span className="text-white">{bid.carrierWallet}</span></div>
                    </div>

                    {/* Pipeline Stage Tracker */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-secondary mono-data mb-1.5" style={{ fontSize: "0.75rem" }}>
                        <span>ЭТАП ДОСТАВКИ: <strong className="text-white">{bid.currentStage}</strong></span>
                        <span className="text-cyan-400 font-bold">{bid.stageProgress}%</span>
                      </div>
                      <div className="progress" style={{ height: 8, background: "#090D16" }}>
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

                    {/* Stage Step Checkmarks */}
                    {bid.stages && (
                      <div className="p-2.5 rounded-3 mono-data mb-3" style={{ background: "#090D16", fontSize: "0.75rem" }}>
                        {bid.stages.map((st, i) => (
                          <div key={i} className="d-flex align-items-center gap-2 py-0.5">
                            <span style={{ color: st.done ? "#34D399" : st.active ? "#38BDF8" : "#64748B" }}>
                              {st.done ? "✓" : st.active ? "●" : "○"}
                            </span>
                            <span className={st.done ? "text-secondary" : st.active ? "text-white font-bold" : "text-faint"}>
                              {st.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-top border-secondary border-opacity-15 d-flex justify-content-between align-items-center">
                    <span className="mfg-badge-emerald">
                      <span>●</span>
                      <span>{bid.status}</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAdvanceStage(bid)}
                      className="mfg-btn-primary py-1 px-3"
                      style={{ minHeight: 34, fontSize: "0.8125rem" }}
                    >
                      Продвинуть этап →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BidInfo;
