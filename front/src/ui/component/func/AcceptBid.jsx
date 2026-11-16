import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const AcceptBid = () => {
  const { post, bids } = useContext(AtlantContext);

  const [bidId, setBidId] = useState(bids[0]?.id || "BIDS_EXP_2026_001");
  const [stageHash, setStageHash] = useState("b58_stage_init_hash_994201");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "acceptBid" },
        { key: "bidId", type: "string", value: bidId },
        { key: "stageHash", type: "string", value: stageHash },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mfg-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: acceptBid</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Акцепт контракта и блокировка эскроу-обеспечения (AcceptBid)")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
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

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ХЭШ ЭТАПА АКЦЕПТА (STAGEHASH)</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={stageHash}
              onChange={(e) => setStageHash(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Акцептовать контракт")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptBid;
