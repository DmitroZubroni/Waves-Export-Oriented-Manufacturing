import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

const DECISION_OPTIONS = [
  { value: "true", label: "Принять условия (Accept)" },
  { value: "false", label: "Отклонить (Reject)" },
];

export const ClientRespond = () => {
  const { post, bids } = useContext(AtlantContext);
  const bidOptions = bids.map((b) => ({ value: b.id, label: `${b.id} — ${b.title}` }));

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
    <div className="card card-lg">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: clientRespond</span>
        <h3 className="text-lg fw-700">{typograph("Решение покупателя по оферте")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Идентификатор заявки" hint="bidId">
            {(fp) => <Select {...fp} value={bidId} options={bidOptions} onChange={setBidId} />}
          </Field>

          <Field label="Решение импортёра">
            {(fp) => <Select {...fp} value={accept} options={DECISION_OPTIONS} onChange={setAccept} />}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Зафиксировать решение импортёра")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientRespond;
