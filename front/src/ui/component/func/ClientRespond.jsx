import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const ClientRespond = () => {
  const { post, bids } = useContext(AtlantContext);

  const [bidId, setBidId] = useState(bids[0]?.id || "BIDS_EXP_2026_001");
  const [accept, setAccept] = useState("true");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "clientRespond" },
        { key: "bidId", type: "string", value: bidId },
        { key: "accept", type: "boolean", value: accept === "true" },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mfg-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: clientRespond</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Решение покупателя по оферте (ClientRespond)")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-8">
            <label className="mfg-label mono-data">ИДЕНТИФИКАТОР ЗАЯВКИ (BID ID)</label>
            <select
              className="mfg-input mono-data"
              value={bidId}
              onChange={(e) => setBidId(e.target.value)}
            >
              {bids.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">РЕШЕНИЕ ИМПОРТЕРА</label>
            <select
              className="mfg-input mono-data"
              value={accept}
              onChange={(e) => setAccept(e.target.value)}
            >
              <option value="true">ПРИНЯТЬ УСЛОВИЯ (Accept)</option>
              <option value="false">ОТКЛОНИТЬ (Reject)</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Зафиксировать решение импортера")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientRespond;
