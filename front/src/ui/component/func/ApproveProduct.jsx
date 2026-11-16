import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const ApproveProduct = () => {
  const { post, products } = useContext(AtlantContext);

  const [productId, setProductId] = useState(
    products.find((p) => !p.approved)?.id || "PRODS_OPTICAL_PRESSURE_SENSOR_03"
  );
  const [certInfo, setCertInfo] = useState(
    "QC-ISO9001-RU-2026-FINAL: Проведены испытания на герметичность и гидроудар. Соответствует нормам экспорта."
  );
  const [distributors, setDistributors] = useState("3PLogisticsEuroTrans2026EU, 3PClientNordicEngineeringDK");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "approveProduct" },
        { key: "productId", type: "string", value: productId },
        { key: "certInfo", type: "string", value: certInfo },
        { key: "distributors", type: "string", value: distributors },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mfg-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-amber mono-data mb-1">action: approveProduct</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Лабораторное подтверждение качества ISO 9001 (ApproveProduct)")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ВЫБОР ПАРТИИ ПРОДУКЦИИ (PRODUCT ID)</label>
            <select
              className="mfg-input mono-data"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} — {p.name} ({p.approved ? "ОДОБРЕНО" : "ОЖИДАЕТ"})
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">АККРЕДИТОВАННЫЕ ДИСТРИБЬЮТОРЫ / ПЕРЕВОЗЧИКИ</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={distributors}
              onChange={(e) => setDistributors(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">ЗАКЛЮЧЕНИЕ ЭКСПЕРТИЗЫ И НОМЕР ПАСПОРТА ISO 9001</label>
            <textarea
              rows={2}
              className="mfg-input"
              value={certInfo}
              onChange={(e) => setCertInfo(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
            style={{ background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", borderColor: "#FBBF24" }}
          >
            <span>{submitting ? typograph("Подписание сертификата...") : typograph("Утвердить паспорт качества ISO 9001")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApproveProduct;
