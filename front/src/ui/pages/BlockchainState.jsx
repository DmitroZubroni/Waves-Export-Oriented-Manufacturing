import { useState, useContext, useMemo } from "react";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState, ErrorState } from "../component/States.jsx";

const BlockchainState = () => {
  const { blockchainState, contractId, blockHeight, networkMode, setNetworkMode, addToast } =
    useContext(AtlantContext);

  const [filterQuery, setFilterQuery] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("ALL");
  const [viewMode, setViewMode] = useState("table"); // "table" or "grid"
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);
  const [expandedKey, setExpandedKey] = useState(null);

  const prefixes = [
    { id: "ALL", label: "Все ключи" },
    { id: "PRODS", label: "Продукция (PRODS_)" },
    { id: "BIDS", label: "Заявки (BIDS_)" },
    { id: "ORG", label: "Организации (ORG_)" },
    { id: "STAGE", label: "Логистика (STAGE_)" },
    { id: "CONTRACT", label: "Протокол (CONTRACT_)" },
  ];

  const filteredEntries = useMemo(() => {
    return blockchainState.filter((entry) => {
      // Prefix match
      if (selectedPrefix !== "ALL" && !entry.key.startsWith(selectedPrefix)) {
        return false;
      }
      // Search match
      if (filterQuery) {
        const q = filterQuery.toLowerCase();
        const kMatch = entry.key.toLowerCase().includes(q);
        const vMatch =
          typeof entry.value === "string"
            ? entry.value.toLowerCase().includes(q)
            : JSON.stringify(entry.value).toLowerCase().includes(q);
        return kMatch || vMatch;
      }
      return true;
    });
  }, [blockchainState, selectedPrefix, filterQuery]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    addToast({
      tone: "info",
      title: "Скопировано в буфер",
      message: `${label} скопирован в буфер обмена.`,
    });
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

        {/* Page Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="mfg-badge-cyan">
                <span className="mfg-diode mfg-diode-cyan" />
                <span>{typograph("Waves Enterprise Explorer")}</span>
              </span>
              <span className="mfg-badge-emerald">
                <span>БЛОК #{blockHeight.toLocaleString("ru-RU")}</span>
              </span>
            </div>
            <h1 className="fs-3 fw-bold text-white mb-1">
              {typograph("Реестр глобального состояния смарт-контракта")}
            </h1>
            <p className="text-secondary mono-data mb-0" style={{ fontSize: "0.8125rem" }}>
              Contract ID: {contractId} · Режим: {networkMode}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="btn-group" role="group" aria-label="Формат отображения данных">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`mfg-btn-secondary py-1 px-3 ${viewMode === "table" ? "bg-cyan-500/20 text-cyan-400" : ""}`}
                style={{ minHeight: 38, fontSize: "0.8125rem" }}
              >
                ≡ Таблица (Л2)
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`mfg-btn-secondary py-1 px-3 ${viewMode === "grid" ? "bg-cyan-500/20 text-cyan-400" : ""}`}
                style={{ minHeight: 38, fontSize: "0.8125rem" }}
              >
                ⊞ Карточки
              </button>
            </div>
          </div>
        </div>

        {/* Technical Ledger Stats Bar */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="mfg-card p-3">
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                ВСЕГО КЛЮЧЕЙ
              </div>
              <div className="fs-4 fw-bold text-white mono-data my-0.5">
                {blockchainState.length}
              </div>
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                В активном смарт-контракте
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="mfg-card p-3">
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                ОТФИЛЬТРОВАНО
              </div>
              <div className="fs-4 fw-bold text-cyan-400 mono-data my-0.5">
                {filteredEntries.length}
              </div>
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                Ключей в текущей выборке
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="mfg-card p-3">
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                СТАНДАРТ ДАННЫХ
              </div>
              <div className="fs-5 fw-bold text-amber-400 my-0.5">
                ISO 9001 + Blake2b
              </div>
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                Хэшированные спецификации
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="mfg-card p-3">
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                КОНСЕНСУС
              </div>
              <div className="fs-5 fw-bold text-emerald-400 my-0.5">
                PoS Finalized
              </div>
              <div className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                Все блоки подтверждены
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls (Rule Л4: 2-4 frequent filters visible and clearable) */}
        <div className="mfg-card p-3 mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex flex-wrap align-items-center gap-1.5">
              {prefixes.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPrefix(p.id)}
                  className={`mfg-btn-secondary py-1 px-2.5 ${
                    selectedPrefix === p.id
                      ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400 font-bold"
                      : ""
                  }`}
                  style={{ minHeight: 34, fontSize: "0.75rem" }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="flex-grow-1" style={{ maxWidth: 320 }}>
              <input
                type="text"
                className="mfg-input mono-data"
                placeholder="Поиск по ключу или JSON..."
                style={{ minHeight: 36, fontSize: "0.8125rem" }}
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4 States Handling (Rule У1) */}
        {simulatedError ? (
          <ErrorState
            title="Ошибка связи с нодой блокчейна"
            description="Не удалось прочитать состояние смарт-контракта из сетевого узла. Сервер вернул код 504 Gateway Timeout."
            onRetry={() => setSimulatedError(false)}
            secondaryAction={() => {
              setSimulatedError(false);
              setNetworkMode("demo");
            }}
          />
        ) : simulatedLoading ? (
          <LoadingSkeleton count={4} type={viewMode === "table" ? "table" : "cards"} />
        ) : filteredEntries.length === 0 ? (
          <EmptyState
            title="Записи не найдены"
            description="В реестре блокчейна нет записей, соответствующих заданному фильтру поиска или префиксу."
            actionLabel="Сбросить фильтры"
            onAction={() => {
              setFilterQuery("");
              setSelectedPrefix("ALL");
            }}
          />
        ) : viewMode === "table" ? (
          /* High-Density Industrial Table (Rule Л1, Л2) */
          <div className="mfg-card overflow-hidden">
            <div className="table-responsive">
              <table className="mfg-table">
                <thead>
                  <tr>
                    <th style={{ width: "28%" }}>КЛЮЧ СОСТОЯНИЯ (KEY)</th>
                    <th style={{ width: "10%" }}>ТИП</th>
                    <th>ДАННЫЕ / СТРУКТУРА (VALUE)</th>
                    <th style={{ width: "12%", textAlign: "right" }}>ДЕЙСТВИЯ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, idx) => {
                    const isExpanded = expandedKey === entry.key;
                    let parsed = null;
                    try {
                      parsed = JSON.parse(entry.value);
                    } catch {
                      parsed = null;
                    }

                    return (
                      <tr key={idx}>
                        <td className="mono-data">
                          <span className="text-cyan-400 font-bold d-block text-truncate" style={{ maxWidth: 260 }}>
                            {entry.key}
                          </span>
                        </td>
                        <td>
                          <span className="mfg-badge-cyan" style={{ fontSize: "0.65rem" }}>
                            {entry.type}
                          </span>
                        </td>
                        <td className="mono-data">
                          <div
                            style={{
                              maxHeight: isExpanded ? "none" : 48,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              color: "#CBD5E1",
                            }}
                          >
                            {parsed ? (
                              <pre className="mb-0 text-secondary" style={{ fontSize: "0.75rem" }}>
                                {JSON.stringify(parsed, null, 2)}
                              </pre>
                            ) : (
                              String(entry.value)
                            )}
                          </div>
                          {parsed && (
                            <button
                              type="button"
                              onClick={() => setExpandedKey(isExpanded ? null : entry.key)}
                              className="mfg-btn-ghost p-0 text-cyan-400 mt-1"
                              style={{ minHeight: 22, fontSize: "0.7rem" }}
                            >
                              {isExpanded ? "▲ Свернуть" : "▼ Развернуть JSON"}
                            </button>
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(entry.value, "Значение")}
                            className="mfg-btn-ghost py-1 px-2 mono-data"
                            style={{ minHeight: 30, fontSize: "0.75rem" }}
                            title="Скопировать значение"
                          >
                            Копировать
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Card Grid View */
          <div className="row g-3">
            {filteredEntries.map((entry, idx) => (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="mfg-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="mfg-badge-cyan mono-data text-truncate" style={{ maxWidth: 200 }}>
                        {entry.key}
                      </span>
                      <span className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                        #{idx + 1}
                      </span>
                    </div>

                    <div
                      className="p-3 rounded-3 mt-2 mono-data"
                      style={{
                        background: "#090D16",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        fontSize: "0.75rem",
                        color: "#94A3B8",
                        maxHeight: 140,
                        overflowY: "auto",
                      }}
                    >
                      {typeof entry.value === "string" && entry.value.startsWith("{") ? (
                        <pre className="mb-0 text-cyan-300">
                          {JSON.stringify(JSON.parse(entry.value), null, 2)}
                        </pre>
                      ) : (
                        String(entry.value)
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-top border-secondary border-opacity-15 d-flex justify-content-between align-items-center">
                    <span className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                      Тип: {entry.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(entry.value, "Значение ключа")}
                      className="mfg-btn-ghost py-0.5 px-2 text-cyan-400"
                      style={{ minHeight: 28, fontSize: "0.75rem" }}
                    >
                      Копировать
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

export default BlockchainState;
