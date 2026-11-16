import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

export const MarkDelivered = () => {
  const { post, bids } = useContext(AtlantContext);
  const bidOptions = bids.map((b) => ({ value: b.id, label: `${b.id} — ${b.title}` }));

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
    <div className="card card-lg">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: markDelivered</span>
        <h3 className="text-lg fw-700">{typograph("Отметка перевозчика о доставке груза")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Идентификатор заявки" hint="bidId">
            {(fp) => <Select {...fp} value={bidId} options={bidOptions} onChange={setBidId} />}
          </Field>

          <Field label="Хэш электронной накладной / транспортной пломбы" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={deliveryHash}
                onChange={(e) => setDeliveryHash(e.target.value)} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Подтвердить доставку в терминал")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MarkDelivered;
