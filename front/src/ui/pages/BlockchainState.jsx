import { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState } from "../component/States.jsx";

const BlockchainState = () => {
  const { contractId, url } = useContext(AtlantContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterQuery, setFilterQuery] = useState("");

  const targetPort = url || "6882";

  useEffect(() => {
    if (!contractId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:${targetPort}/contracts/${contractId}`)
      .then((res) => res.json())
      .then((json) => setData(Array.isArray(json) ? json : []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [contractId, targetPort]);

  const filteredData = data.filter((item) =>
    filterQuery
      ? item.key.toLowerCase().includes(filterQuery.toLowerCase()) ||
        JSON.stringify(item.value).toLowerCase().includes(filterQuery.toLowerCase())
      : true
  );

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="container">
        {/* Page Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="mfg-badge-cyan mb-1">{typograph("Глобальный реестр")}</div>
            <h1 className="fs-3 fw-bold text-white mb-0">
              {typograph("Полное состояние смарт-контракта Waves")}
            </h1>
            <p className="text-secondary mb-0 mono-data" style={{ fontSize: "0.85rem" }}>
              Контракт: {contractId || "Не указан"} · Порт: {targetPort}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="mfg-input mono-data"
              placeholder="Поиск по ключу или данным..."
              style={{ width: 260 }}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton count={3} />
        ) : filteredData.length === 0 ? (
          <EmptyState
            title="Записи не найдены"
            description="В реестре блокчейна нет записей, соответствующих заданному фильтру поиска."
          />
        ) : (
          <Row className="g-3">
            {filteredData.map((item, index) => (
              <Col key={index} md={6} lg={4}>
                <div className="mfg-card p-4 h-100 d-flex flex-col justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="mfg-badge-cyan text-truncate mono-data" style={{ maxWidth: 180 }}>
                        {item.key}
                      </span>
                      <span className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                        #{index + 1}
                      </span>
                    </div>
                    <div
                      className="p-3 rounded-3 mt-2 mono-data"
                      style={{
                        background: "#090D16",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        fontSize: "0.8rem",
                        color: "#94A3B8",
                        maxHeight: 140,
                        overflowY: "auto",
                      }}
                    >
                      {typeof item.value === "object"
                        ? JSON.stringify(item.value, null, 2)
                        : String(item.value)}
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </main>
    </div>
  );
};

export default BlockchainState;
