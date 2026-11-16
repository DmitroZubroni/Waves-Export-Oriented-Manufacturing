import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input, Textarea } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

export const ApproveProduct = () => {
  const { post, products } = useContext(AtlantContext);

  const productOptions = products.map((p) => ({
    value: p.id,
    label: `${p.id} — ${p.name} (${p.approved ? "одобрено" : "ожидает"})`,
  }));

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
    <div className="card card-lg">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-accent mono-data mb-2" style={{ display: "inline-flex" }}>action: approveProduct</span>
        <h3 className="text-lg fw-700">{typograph("Лабораторное подтверждение качества ISO 9001")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Выбор партии продукции" hint="productId">
            {(fp) => <Select {...fp} value={productId} options={productOptions} onChange={setProductId} />}
          </Field>

          <Field label="Аккредитованные дистрибьюторы / перевозчики" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={distributors}
                onChange={(e) => setDistributors(e.target.value)} />
            )}
          </Field>

          <Field label="Заключение экспертизы и номер паспорта ISO 9001" full>
            {(fp) => (
              <Textarea {...fp} rows={2} value={certInfo}
                onChange={(e) => setCertInfo(e.target.value)} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание сертификата…") : typograph("Утвердить паспорт качества ISO 9001")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApproveProduct;
