import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input, Textarea } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

export const RespondToBid = () => {
  const { post, bids } = useContext(AtlantContext);
  const bidOptions = bids.map((b) => ({ value: b.id, label: `${b.id} — ${b.title}` }));

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
    <div className="card card-lg mb-4">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: respondToBid</span>
        <h3 className="text-lg fw-700">{typograph("Ответ поставщика на заявку")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Идентификатор заявки" hint="bidId">
            {(fp) => <Select {...fp} value={form.bidId} options={bidOptions} onChange={(v) => setForm({ ...form, bidId: v })} />}
          </Field>

          <Field label="Итоговая стоимость с доставкой" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={form.totalCost}
                onChange={(e) => setForm({ ...form, totalCost: e.target.value })} />
            )}
          </Field>

          <Field label="Подтверждённая дата отгрузки">
            {(fp) => (
              <Input {...fp} type="date" className="mono-data" value={form.deliveryDate}
                onChange={(e) => setForm({ ...form, deliveryDate: e.target.value })} />
            )}
          </Field>

          <Field label="Условия Инкотермс" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={form.deliveryCond}
                onChange={(e) => setForm({ ...form, deliveryCond: e.target.value })} />
            )}
          </Field>

          <Field label="Коммерческое предложение и условия качества" full>
            {(fp) => (
              <Textarea {...fp} rows={2} value={form.propose}
                onChange={(e) => setForm({ ...form, propose: e.target.value })} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Направить ответ заказчику")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RespondToBid;
