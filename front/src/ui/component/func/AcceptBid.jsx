import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

export const AcceptBid = () => {
  const { post, bids } = useContext(AtlantContext);
  const bidOptions = bids.map((b) => ({ value: b.id, label: `${b.id} — ${b.title}` }));

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
    <div className="card card-lg mb-4">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: acceptBid</span>
        <h3 className="text-lg fw-700">{typograph("Акцепт контракта и блокировка эскроу-обеспечения")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Идентификатор заявки" hint="bidId">
            {(fp) => <Select {...fp} value={bidId} options={bidOptions} onChange={setBidId} />}
          </Field>

          <Field label="Хэш этапа акцепта" hint="stageHash" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={stageHash}
                onChange={(e) => setStageHash(e.target.value)} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Акцептовать контракт")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptBid;
