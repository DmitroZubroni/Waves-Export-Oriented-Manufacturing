import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const RespondToBid = () => {
  const { post, bids } = useContext(AtlantContext);

  const [form, setForm] = useState({
    bidId: bids[0]?.id || "BIDS_EXP_2026_001",
    totalCost: "145 000 WAVES",
    deliveryDate: "2026-12-15",
    deliveryCond: "CIF Rotterdam",
    paymentTerms: "100% Эскроу в блокчейне",
    updatedHash: "b58_updated_proposal_hash_8841",
    propose: "Подтверждаем готовность к отгрузке. Паспорта качества ISO 9001 оформлены.",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "respondToBid" },
        { key: "bidId", type: "string", value: form.bidId },
        { key: "totalCost", type: "string", value: form.totalCost },
        { key: "deliveryDate", type: "string", value: form.deliveryDate },
        { key: "deliveryCond", type: "string", value: form.deliveryCond },
        { key: "paymentTerms", type: "string", value: form.paymentTerms },
        { key: "updatedHash", type: "string", value: form.updatedHash },
        { key: "propose", type: "string", value: form.propose },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mfg-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: respondToBid</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Ответ поставщика на заявку (RespondToBid)")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ИДЕНТИФИКАТОР ЗАЯВКИ (BID ID)</label>
            <select
              className="mfg-input mono-data"
              value={form.bidId}
              onChange={(e) => setForm({ ...form, bidId: e.target.value })}
            >
              {bids.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ИТОГОВАЯ СТОИМОСТЬ С ДОСТАВКОЙ (TOTALCOST)</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={form.totalCost}
              onChange={(e) => setForm({ ...form, totalCost: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ПОДТВЕРЖДЕННАЯ ДАТА ОТГРУЗКИ</label>
            <input
              type="date"
              className="mfg-input mono-data"
              value={form.deliveryDate}
              onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">УСЛОВИЯ ИНКОТЕРМС</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={form.deliveryCond}
              onChange={(e) => setForm({ ...form, deliveryCond: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ И УСЛОВИЯ КАЧЕСТВА</label>
            <textarea
              rows={2}
              className="mfg-input"
              value={form.propose}
              onChange={(e) => setForm({ ...form, propose: e.target.value })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Направить ответ заказчику")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RespondToBid;
