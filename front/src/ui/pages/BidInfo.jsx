import { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState } from "../component/States.jsx";

const BidInfo = () => {
  const { contractId, url } = useContext(AtlantContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const bids = data.filter((i) => i.key.includes("BIDS"));

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="container">
        <div className="mb-4">
          <div className="mfg-badge-cyan mb-1">{typograph("Реестр заявок")}</div>
          <h1 className="fs-3 fw-bold text-white mb-1">
            {typograph("Экспортные заявки и контракты на поставку")}
          </h1>
          <p className="text-secondary" style={{ fontSize: "0.9rem" }}>
            {typograph("Официальные торговые предложения, зафиксированные в реестре блокчейна Waves.")}
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : bids.length === 0 ? (
          <EmptyState
            title="Заявки не найдены"
            description="В контракте пока отсутствуют активные экспортные заявки (ключи BIDS_*)."
          />
        ) : (
          <Row className="g-3">
            {bids.map((item, index) => (
              <Col key={index} md={6}>
                <div className="mfg-card p-4 h-100 d-flex flex-col justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: 20 }}>📑</span>
                        <h3 className="fs-5 fw-bold text-white mb-0">{item.key}</h3>
                      </div>
                      <span className="mfg-badge-emerald">ПОДТВЕРЖДЕНО</span>
                    </div>

                    <div
                      className="p-3 rounded-3 mt-3 mono-data"
                      style={{
                        background: "#090D16",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        fontSize: "0.85rem",
                        color: "#94A3B8",
                        maxHeight: 180,
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

export default BidInfo;
