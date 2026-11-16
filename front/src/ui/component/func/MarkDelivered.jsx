import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const MarkDelivered = () => {
  const { post, bids } = useContext(AtlantContext);

  const [bidId, setBidId] = useState(bids[0]?.id || "BIDS_EXP_2026_001");
  const [deliveryHash, setDeliveryHash] = useState("b58_cmr_bol_delivery_proof_hash_4412");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "markDelivered" },
        { key: "bidId", type: "string", value: bidId },
        { key: "deliveryHash", type: "string", value: deliveryHash },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mfg-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: markDelivered</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Отметка перевозчика о доставке груза (MarkDelivered)")}
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
            <label className="mfg-label mono-data">ХЭШ ЭЛЕКТРОННОЙ НАКЛАДНОЙ / ТРАНСПОРТНОЙ ПЛОМБЫ</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={deliveryHash}
              onChange={(e) => setDeliveryHash(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Подтвердить доставку в терминал")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkDelivered;
