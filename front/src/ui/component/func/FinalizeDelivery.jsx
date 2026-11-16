import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import IsoQualityBadge from "../art/IsoQualityBadge.jsx";

export const FinalizeDelivery = () => {
  const { post, bids } = useContext(AtlantContext);

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
    <div className="mfg-card p-4 p-md-5">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-emerald mono-data mb-1">action: finalizeDelivery</span>
          <h3 className="fs-4 fw-bold text-white mb-1">
            {typograph("Финальная приемка и разблокировка эскроу (FinalizeDelivery)")}
          </h3>
          <p className="text-secondary mb-0" style={{ fontSize: "0.875rem" }}>
            {typograph("Подписание акта приема-передачи по стандарту ISO 9001 и перевод обеспечения поставщику.")}
          </p>
        </div>
        <IsoQualityBadge width={56} height={56} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ВЫБОР ЭКСПОРТНОЙ ЗАЯВКИ (BID ID)</label>
            <select
              className="mfg-input mono-data"
              value={bidId}
              onChange={(e) => setBidId(e.target.value)}
            >
              {bids.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.title} ({b.totalEscrow})
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ХЭШ АКТА ВХОДНОГО КОНТРОЛЯ И ПРИЕМКИ (ACCEPTANCEREPORT)</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={acceptanceReportHash}
              onChange={(e) => setAcceptanceReportHash(e.target.value)}
            />
          </div>

          <div className="col-12">
            <div className="p-3 rounded-3 mono-data" style={{ background: "#090D16", border: "1px solid rgba(16, 185, 129, 0.25)", fontSize: "0.8125rem" }}>
              <div className="text-emerald-400 font-bold mb-1">✓ ЮРИДИЧЕСКИЕ ПОСЛЕДСТВИЯ ФИНАЛИЗАЦИИ:</div>
              <div className="text-secondary">
                1. Смарт-контракт переводит 100% заблокированного эскроу на кошелек завода-изготовителя.<br />
                2. Заказчик получает подтвержденный электронный паспорт партии с цифровой подписью ISO 9001.<br />
                3. Запись получает необратимый статус COMPLETED в блокчейне Waves.
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
            style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", borderColor: "#34D399" }}
          >
            <span>{submitting ? typograph("Подписание акта...") : typograph("Утвердить приемку и разблокировать эскроу")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FinalizeDelivery;
