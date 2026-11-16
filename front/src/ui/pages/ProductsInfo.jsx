import { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState, ErrorState } from "../component/States.jsx";
import IsoQualityBadge from "../component/art/IsoQualityBadge.jsx";

const ProductsInfo = () => {
  const { products, post, setNetworkMode, addToast } = useContext(AtlantContext);

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      if (filterStatus === "APPROVED" && !prod.approved) return false;
      if (filterStatus === "PENDING" && prod.approved) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          prod.name.toLowerCase().includes(q) ||
          prod.id.toLowerCase().includes(q) ||
          (prod.material && prod.material.toLowerCase().includes(q)) ||
          (prod.serialBatch && prod.serialBatch.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [products, filterStatus, searchQuery]);

  const handleQuickApprove = async (prod) => {
    await post([
      { key: "action", type: "string", value: "approveProduct" },
      { key: "productId", type: "string", value: prod.id },
      { key: "certificate", type: "string", value: `QC-ISO9001-RU-2026-${Date.now().toString().slice(-4)}` },
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
              <span className="mfg-badge-cyan">{typograph("Реестр партий экспорта")}</span>
              <span className="mfg-badge-amber">ISO 9001:2015</span>
            </div>
            <h1 className="fs-3 fw-bold text-white mb-1">
              {typograph("Производственная продукция и паспорта качества")}
            </h1>
            <p className="text-secondary mb-0" style={{ fontSize: "0.9375rem", maxWidth: "60ch" }}>
              {typograph(
                "Сертификаты соответствия, хэши лабораторных анализов и верифицированные спецификации готовых изделий в блокчейне Waves."
              )}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/func" className="mfg-btn-primary">
              <span>+ Зарегистрировать партию (PRODS)</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mfg-card p-3 mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilterStatus("ALL")}
                className={`mfg-btn-secondary py-1 px-3 ${filterStatus === "ALL" ? "bg-cyan-500/20 text-cyan-400" : ""}`}
                style={{ minHeight: 34, fontSize: "0.8125rem" }}
              >
                Все партии ({products.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("APPROVED")}
                className={`mfg-btn-secondary py-1 px-3 ${filterStatus === "APPROVED" ? "bg-emerald-500/20 text-emerald-400" : ""}`}
                style={{ minHeight: 34, fontSize: "0.8125rem" }}
              >
                Одобрено к экспорту ({products.filter((p) => p.approved).length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus("PENDING")}
                className={`mfg-btn-secondary py-1 px-3 ${filterStatus === "PENDING" ? "bg-amber-500/20 text-amber-400" : ""}`}
                style={{ minHeight: 34, fontSize: "0.8125rem" }}
              >
                Ожидает испытаний ({products.filter((p) => !p.approved).length})
              </button>
            </div>

            <div className="flex-grow-1" style={{ maxWidth: 300 }}>
              <input
                type="text"
                className="mfg-input mono-data"
                placeholder="Поиск по марке, партии, номеру..."
                style={{ minHeight: 36, fontSize: "0.8125rem" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4 States of Screen (Rule У1) */}
        {simulatedError ? (
          <ErrorState
            title="Ошибка загрузки спецификаций продукции"
            description="Не удалось получить криптографические паспорта партий из смарт-контракта. Проверьте сетевое соединение."
            onRetry={() => setSimulatedError(false)}
            secondaryAction={() => {
              setSimulatedError(false);
              setNetworkMode("demo");
            }}
          />
        ) : simulatedLoading ? (
          <LoadingSkeleton count={3} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            title="Партии продукции не найдены"
            description="По заданному фильтру в смарт-контракте нет зарегистрированных партий изделий."
            actionLabel="Добавить партию в производство"
            onAction={() => window.location.assign("/func")}
          />
        ) : (
          <div className="row g-4">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="col-12 col-md-6 col-lg-4">
                <div className="mfg-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="mfg-badge-cyan mono-data mb-1 d-inline-block" style={{ fontSize: "0.7rem" }}>
                          {prod.id}
                        </span>
                        <h2 className="fs-5 fw-bold text-white mb-0" style={{ lineHeight: 1.25 }}>
                          {typograph(prod.name)}
                        </h2>
                      </div>
                      <IsoQualityBadge width={44} height={44} />
                    </div>

                    <p className="text-secondary mb-3 leading-relaxed" style={{ fontSize: "0.8125rem" }}>
                      {typograph(prod.description)}
                    </p>

                    {/* Technical Specifications Matrix */}
                    <div
                      className="p-3 rounded-3 mb-3 mono-data"
                      style={{ background: "#090D16", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "0.75rem" }}
                    >
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Спецификация:</span>
                        <span className="text-white font-bold">{prod.standard}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Материал / сплав:</span>
                        <span className="text-cyan-400">{prod.material}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Серийная партия:</span>
                        <span className="text-white font-bold">{prod.serialBatch}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Объем партии:</span>
                        <span className="text-white font-bold">{prod.quantity} {prod.unit} ({prod.weightNetto})</span>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span className="text-secondary">Контейнер / пломба:</span>
                        <span className="text-amber-400">{prod.containerId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="pt-3 border-top border-secondary border-opacity-15 d-flex justify-content-between align-items-center">
                    <div>
                      {prod.approved ? (
                        <span className="mfg-badge-emerald">
                          <span>✓</span>
                          <span>Одобрено ISO</span>
                        </span>
                      ) : (
                        <span className="mfg-badge-amber">
                          <span>!</span>
                          <span>Ожидает проверки</span>
                        </span>
                      )}
                    </div>

                    <div className="d-flex align-items-center gap-1.5">
                      {!prod.approved && (
                        <button
                          type="button"
                          onClick={() => handleQuickApprove(prod)}
                          className="mfg-btn-primary py-1 px-2.5"
                          style={{ minHeight: 32, fontSize: "0.75rem" }}
                          title="Подтвердить качество лабораторией ISO 9001"
                        >
                          Одобрить QA
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(prod)}
                        className="mfg-btn-secondary py-1 px-2.5"
                        style={{ minHeight: 32, fontSize: "0.75rem" }}
                      >
                        Паспорт
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Technical Quality Passport */}
        {selectedProduct && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 z-3"
            style={{ background: "rgba(0, 0, 0, 0.8)", backdropFilter: "blur(8px)" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="passport-modal-title"
          >
            <div
              className="mfg-card p-4 p-md-5 max-w-2xl w-100 shadow-2xl"
              style={{ background: "#0F172A", border: "1px solid rgba(56, 189, 248, 0.4)" }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="mfg-badge-amber mb-1">ISO 9001:2015 PASSPORT</span>
                  <h3 id="passport-modal-title" className="fs-4 fw-bold text-white mb-0">
                    {selectedProduct.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="mfg-btn-ghost p-1 text-secondary"
                  style={{ minHeight: 36, minWidth: 36, fontSize: "1.2rem" }}
                  aria-label="Закрыть модальное окно"
                >
                  ✕
                </button>
              </div>

              <div className="mono-data p-3 rounded-3 mb-4" style={{ background: "#090D16", fontSize: "0.8125rem" }}>
                <div className="mb-2"><strong>ID записи:</strong> {selectedProduct.id}</div>
                <div className="mb-2"><strong>Сертификат:</strong> {selectedProduct.qualityCertificate}</div>
                <div className="mb-2"><strong>Хэш анализа (Blake2b):</strong> <span className="text-cyan-400">{selectedProduct.specHash}</span></div>
                <div className="mb-2"><strong>Создатель:</strong> {selectedProduct.creator}</div>
                <div><strong>Статус:</strong> {selectedProduct.status}</div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="mfg-btn-secondary"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsInfo;
