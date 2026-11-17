import { useState, useContext, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState, ErrorState } from "../component/States.jsx";
import { StateDemoBar } from "../kit/StateDemoBar.jsx";
import { Input } from "../kit/Field.jsx";
import IsoQualityBadge from "../component/art/IsoQualityBadge.jsx";
import { SearchIcon, CloseIcon, CheckIcon, AlertIcon } from "../kit/icons.jsx";

const ProductsInfo = () => {
  const { products, post, setNetworkMode } = useContext(AtlantContext);

  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);
  const [simulatedEmpty, setSimulatedEmpty] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  const filteredProducts = useMemo(() => {
    if (simulatedEmpty) return [];
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
  }, [products, filterStatus, searchQuery, simulatedEmpty]);

  const handleQuickApprove = async (prod) => {
    await post([
      { key: "action", type: "string", value: "approveProduct" },
      { key: "productId", type: "string", value: prod.id },
      { key: "certificate", type: "string", value: `QC-ISO9001-RU-2026-${Date.now().toString().slice(-4)}` },
    ]);
  };

  // Д3: модальное окно закрывается по Esc и держит фокус на кнопке закрытия
  useEffect(() => {
    if (!selectedProduct) return;
    const previousFocus = document.activeElement;
    dialogRef.current?.showModal();
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedProduct(null);
      if (event.key === 'Tab') {
        const controls = dialogRef.current?.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), [tabindex="0"]');
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [selectedProduct]);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main id="main-content" className="container">
        <StateDemoBar
          onTestLoading={() => {
            setSimulatedLoading(true);
            setTimeout(() => setSimulatedLoading(false), 1200);
          }}
          errorOn={simulatedError}
          onToggleError={() => setSimulatedError((v) => !v)}
          emptyOn={simulatedEmpty}
          onToggleEmpty={() => setSimulatedEmpty((v) => !v)}
        />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="badge badge-primary">{typograph("Реестр партий экспорта")}</span>
              <span className="badge badge-accent">ISO 9001:2015</span>
            </div>
            <h1 className="fw-700 mb-1" style={{ fontSize: "1.75rem" }}>
              {typograph("Производственная продукция и паспорта качества")}
            </h1>
            <p className="text-muted max-prose" style={{ maxWidth: "60ch" }}>
              {typograph(
                "Сертификаты соответствия, хэши лабораторных анализов и верифицированные спецификации готовых изделий в блокчейне Waves."
              )}
            </p>
          </div>

          <Link to="/func" className="btn btn-primary">
            {typograph("Зарегистрировать партию")}
          </Link>
        </div>

        <div className="card mb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => setFilterStatus("ALL")} aria-pressed={filterStatus === "ALL"}
                className={`btn btn-secondary btn-sm ${filterStatus === "ALL" ? "is-active" : ""}`}>
                Все партии ({products.length})
              </button>
              <button type="button" onClick={() => setFilterStatus("APPROVED")} aria-pressed={filterStatus === "APPROVED"}
                className={`btn btn-secondary btn-sm ${filterStatus === "APPROVED" ? "is-active" : ""}`}>
                Одобрено к экспорту ({products.filter((p) => p.approved).length})
              </button>
              <button type="button" onClick={() => setFilterStatus("PENDING")} aria-pressed={filterStatus === "PENDING"}
                className={`btn btn-secondary btn-sm ${filterStatus === "PENDING" ? "is-active" : ""}`}>
                Ожидает испытаний ({products.filter((p) => !p.approved).length})
              </button>
            </div>

            <div style={{ maxWidth: 300, width: "100%" }}>
              <label htmlFor="product-search" className="sr-only">Поиск по марке, партии, номеру</label>
              <div className="relative">
                <Input id="product-search" type="search" className="mono-data" style={{ paddingLeft: "2.25rem" }}
                  placeholder="Поиск по марке, партии, номеру…" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                <SearchIcon size={16} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>
        </div>

        {simulatedError ? (
          <ErrorState
            title="Ошибка загрузки спецификаций продукции"
            description="Не удалось получить криптографические паспорта партий из смарт-контракта. Проверьте сетевое соединение."
            onRetry={() => setSimulatedError(false)}
            secondaryAction={() => { setSimulatedError(false); setNetworkMode("demo"); }}
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
          <div className="grid-cards">
            {filteredProducts.map((prod) => (
              <div key={prod.id} className="card flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div>
                      <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>{prod.id}</span>
                      <h2 className="text-lg fw-700">{typograph(prod.name)}</h2>
                    </div>
                    <IsoQualityBadge width={44} height={44} />
                  </div>

                  <p className="text-muted mb-3 text-sm">{typograph(prod.description)}</p>

                  <dl className="panel mono-data text-xs mb-3" style={{ padding: "0.75rem" }}>
                    {[
                      ["Спецификация", prod.standard],
                      ["Материал / сплав", prod.material],
                      ["Серийная партия", prod.serialBatch],
                      ["Объём партии", `${prod.quantity} ${prod.unit} (${prod.weightNetto})`],
                      ["Контейнер / пломба", prod.containerId],
                    ].map(([dt, dd], i) => (
                      <div key={dt} className="flex justify-between gap-3" style={{ padding: "0.3rem 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                        <dt className="text-muted">{dt}</dt>
                        <dd className="text-right truncate" style={{ margin: 0 }}>{dd}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="flex justify-between items-center pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                  {prod.approved ? (
                    <span className="badge badge-success"><CheckIcon size={14} /> Одобрено ISO</span>
                  ) : (
                    <span className="badge badge-accent"><AlertIcon size={14} /> Ожидает проверки</span>
                  )}

                  <div className="flex items-center gap-2">
                    {!prod.approved && (
                      <button type="button" onClick={() => handleQuickApprove(prod)} className="btn btn-primary btn-sm"
                        title="Подтвердить качество лабораторией ISO 9001">
                        Одобрить QA
                      </button>
                    )}
                    <button type="button" onClick={() => setSelectedProduct(prod)} className="btn btn-secondary btn-sm">
                      Паспорт
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <dialog
            ref={dialogRef}
            className="passport-dialog"
            onCancel={() => setSelectedProduct(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="passport-modal-title"
            onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedProduct(null); }}
          >
            <div className="card card-lg" style={{ maxWidth: 560, width: "100%", background: "var(--surface)" }}>
              <div className="flex justify-between items-start gap-3 mb-4">
                <div>
                  <span className="badge badge-accent mono-data mb-2" style={{ display: "inline-flex" }}>ISO 9001:2015 PASSPORT</span>
                  <h3 id="passport-modal-title" className="text-xl fw-700">{selectedProduct.name}</h3>
                </div>
                <button
                  type="button"
                  ref={closeButtonRef}
                  onClick={() => setSelectedProduct(null)}
                  className="btn btn-ghost icon-btn"
                  aria-label="Закрыть паспорт качества"
                >
                  <CloseIcon size={18} />
                </button>
              </div>

              <dl className="panel mono-data text-sm mb-4" style={{ padding: "0.875rem" }}>
                {[
                  ["ID записи", selectedProduct.id],
                  ["Сертификат", selectedProduct.qualityCertificate],
                  ["Хэш анализа (Blake2b)", selectedProduct.specHash],
                  ["Создатель", selectedProduct.creator],
                  ["Статус", selectedProduct.status],
                ].map(([dt, dd], i) => (
                  <div key={dt} className="flex justify-between gap-3" style={{ padding: "0.3rem 0", borderTop: i ? "1px solid var(--border)" : "none" }}>
                    <dt className="text-muted">{dt}</dt>
                    <dd className="text-right truncate" style={{ margin: 0 }}>{dd}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex justify-end">
                <button type="button" onClick={() => setSelectedProduct(null)} className="btn btn-secondary">
                  Закрыть
                </button>
              </div>
            </div>
          </dialog>
        )}
      </main>
    </div>
  );
};

export default ProductsInfo;
