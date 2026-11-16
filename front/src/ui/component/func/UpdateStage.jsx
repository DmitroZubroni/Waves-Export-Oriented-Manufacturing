import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const UpdateStage = () => {
  const { post, bids } = useContext(AtlantContext);

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
    <div className="mfg-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: updateStage</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Фиксация логистического этапа и транзита (UpdateStage)")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-4">
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
            <label className="mfg-label mono-data">ЭТАП ЛОГИСТИКИ (STAGESTATUS)</label>
            <select
              className="mfg-input mono-data"
              value={stageStatus}
              onChange={(e) => setStageStatus(e.target.value)}
            >
              <option value="PRODUCTION_COMPLETE">PRODUCTION_COMPLETE (Партия готова на заводе)</option>
              <option value="QA_LAB_VERIFIED">QA_LAB_VERIFIED (Аудит ISO 9001 пройден)</option>
              <option value="CUSTOMS_CLEARED">CUSTOMS_CLEARED (Экспортная таможня очищена)</option>
              <option value="SEA_FREIGHT">SEA_FREIGHT (Погрузка на борт судна / морем)</option>
              <option value="PORT_DISCHARGED">PORT_DISCHARGED (Выгрузка в порту назначения)</option>
              <option value="DELIVERED">DELIVERED (Доставлено на терминал покупателя)</option>
            </select>
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">ХЭШ КОНОСАМЕНТА / ПЛОМБЫ</label>
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
            <span>{submitting ? typograph("Подписание...") : typograph("Зафиксировать этап доставки в блокчейне")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStage;
