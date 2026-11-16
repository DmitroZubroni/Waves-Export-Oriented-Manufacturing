import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import IsoQualityBadge from "../art/IsoQualityBadge.jsx";
import { Field, Input } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";
import { CheckIcon } from "../../kit/icons.jsx";

export const FinalizeDelivery = () => {
  const { post, bids } = useContext(AtlantContext);
  const bidOptions = bids.map((b) => ({ value: b.id, label: `${b.id} — ${b.title} (${b.totalEscrow})` }));

  const [bidId, setBidId] = useState(bids[0]?.id || "BIDS_EXP_2026_001");
  const [acceptanceReportHash, setAcceptanceReportHash] = useState("b58_final_customs_acceptance_report_hash_99182");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "finalizeDelivery" },
        { key: "bidId", type: "string", value: bidId },
        { key: "acceptanceReportHash", type: "string", value: acceptanceReportHash },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-lg">
      <div className="flex justify-between items-start flex-wrap gap-3 mb-6 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="badge badge-success mono-data mb-2" style={{ display: "inline-flex" }}>action: finalizeDelivery</span>
          <h3 className="text-xl fw-700 mb-1">{typograph("Финальная приёмка и разблокировка эскроу")}</h3>
          <p className="text-muted text-sm">
            {typograph("Подписание акта приёма-передачи по стандарту ISO 9001 и перевод обеспечения поставщику.")}
          </p>
        </div>
        <IsoQualityBadge width={56} height={56} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid mb-4">
          <Field label="Выбор экспортной заявки" hint="bidId">
            {(fp) => <Select {...fp} value={bidId} options={bidOptions} onChange={setBidId} />}
          </Field>

          <Field label="Хэш акта входного контроля и приёмки" hint="acceptanceReportHash" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={acceptanceReportHash}
                onChange={(e) => setAcceptanceReportHash(e.target.value)} />
            )}
          </Field>
        </div>

        <div className="panel" style={{ background: "var(--success-soft)", borderColor: "var(--success)", padding: "1rem" }}>
          <div className="flex items-center gap-2 fw-700 mb-2" style={{ color: "var(--success)" }}>
            <CheckIcon size={18} />
            <span>Юридические последствия финализации</span>
          </div>
          <ul className="text-sm text-muted stack-3" style={{ margin: 0, paddingLeft: "1.1rem" }}>
            <li>Смарт-контракт переводит 100% заблокированного эскроу на кошелёк завода-изготовителя.</li>
            <li>Заказчик получает подтверждённый электронный паспорт партии с цифровой подписью ISO 9001.</li>
            <li>Запись получает необратимый статус COMPLETED в блокчейне Waves.</li>
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание акта…") : typograph("Утвердить приёмку и разблокировать эскроу")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinalizeDelivery;
