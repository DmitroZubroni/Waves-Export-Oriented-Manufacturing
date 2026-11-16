import { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import Authorization from "../component/Authorization.jsx";
import { typograph } from "../../core/typograph";
import { EmptyState, LoadingSkeleton } from "../component/States.jsx";

const UserInfo = () => {
  const { contractId, sender, url } = useContext(AtlantContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sender || !contractId || !url) return;
    setLoading(true);

    const load = async () => {
      try {
        const res = await fetch(`http://localhost:${url}/contracts/${contractId}`);
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Failed to load user contract state:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [contractId, sender, url]);

  if (!sender) {
    return (
      <div style={{ minHeight: "100vh", background: "#090D16" }}>
        <Header />
        <Authorization />
      </div>
    );
  }

  const userItems = data.filter(
    (i) => typeof i.value === "string" && i.value.includes(sender)
  );

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="container">
        {/* User Account Overview */}
        <section
          className="mfg-card p-4 mb-4"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
          }}
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                {typograph("АВТОРИЗОВАННЫЙ КОНТРАГЕНТ ПРОИЗВОДСТВА")}
              </div>
              <h1 className="fs-4 fw-bold text-white mono-data text-truncate mb-0">
                {sender}
              </h1>
              <div className="text-secondary mono-data mt-1" style={{ fontSize: "0.8rem" }}>
                Контракт: {contractId} · Порт: {url}
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="mfg-badge-emerald">● Нода активна</span>
              <span className="mfg-badge-cyan">Записей: {userItems.length}</span>
            </div>
          </div>
        </section>

        {/* User Specific Blockchain State Records */}
        <section>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h2 className="fs-5 fw-bold text-white mb-0">
                {typograph("Производственные записи и партии")}
              </h2>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>
                {typograph("Связанные с вашим адресом транзакции и производственные спецификации")}
              </p>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : userItems.length === 0 ? (
            <EmptyState
              title="Записи не найдены"
              description="Для вашего адреса пока не создано активных производственных партий или заявок."
            />
          ) : (
            <Row className="g-3">
              {userItems.map((item, index) => (
                <Col key={index} md={6}>
                  <div className="mfg-card p-4 h-100 d-flex flex-col justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="mfg-badge-cyan text-truncate mono-data" style={{ maxWidth: 220 }}>
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
                          fontSize: "0.85rem",
                          color: "#94A3B8",
                          maxHeight: 180,
                          overflowY: "auto",
                        }}
                      >
                        {JSON.stringify(item.value, null, 2)}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserInfo;
