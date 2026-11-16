import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

const STAGE_OPTIONS = [
  { value: "PRODUCTION_COMPLETE", label: "Production complete — партия готова на заводе" },
  { value: "QA_LAB_VERIFIED", label: "QA lab verified — аудит ISO 9001 пройден" },
  { value: "CUSTOMS_CLEARED", label: "Customs cleared — экспортная таможня очищена" },
  { value: "SEA_FREIGHT", label: "Sea freight — погрузка на борт судна / морем" },
  { value: "PORT_DISCHARGED", label: "Port discharged — выгрузка в порту назначения" },
  { value: "DELIVERED", label: "Delivered — доставлено на терминал покупателя" },
];

export const UpdateStage = () => {
  const { post, bids } = useContext(AtlantContext);
  const bidOptions = bids.map((b) => ({ value: b.id, label: `${b.id} — ${b.title}` }));

  const [bidId, setBidId] = useState(bids[0]?.id || "BIDS_EXP_2026_001");
  const [stageStatus, setStageStatus] = useState("SEA_FREIGHT");
  const [stageHash, setStageHash] = useState("b58_sea_bol_hash_884901");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "updateStage" },
        { key: "bidId", type: "string", value: bidId },
        { key: "stageStatus", type: "string", value: stageStatus },
        { key: "stageHash", type: "string", value: stageHash },
        { key: "stage", type: "string", value: stageStatus },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-lg mb-4">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: updateStage</span>
        <h3 className="text-lg fw-700">{typograph("Фиксация логистического этапа и транзита")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Идентификатор заявки" hint="bidId">
            {(fp) => <Select {...fp} value={bidId} options={bidOptions} onChange={setBidId} />}
          </Field>

          <Field label="Этап логистики" hint="stageStatus">
            {(fp) => <Select {...fp} value={stageStatus} options={STAGE_OPTIONS} onChange={setStageStatus} />}
          </Field>

          <Field label="Хэш коносамента / пломбы" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={stageHash}
                onChange={(e) => setStageHash(e.target.value)} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Зафиксировать этап доставки")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStage;
