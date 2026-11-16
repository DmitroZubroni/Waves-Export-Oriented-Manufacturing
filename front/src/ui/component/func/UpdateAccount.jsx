import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input, Textarea } from "../../kit/Field.jsx";

export const UpdateAccount = () => {
  const { post, sender } = useContext(AtlantContext);

  const [form, setForm] = useState({
    orgWallet: sender || "3PMfgWavesExpMain2026RU",
    name: "АО «Северный Криомаш Экспорт»",
    region: "RU-LED (Северо-Западный кластер)",
    description: "Обновление регламентов контроля качества по ISO 9001:2015",
    userWallet: sender || "3PMfgWavesExpMain2026RU",
    fullName: "Громов Виктор Васильевич",
    contact: "export@cryomash-nord.ru",
    position: "Директор по ВЭД",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "updateAccount" },
        { key: "orgWallet", type: "string", value: form.orgWallet },
        { key: "name", type: "string", value: form.name },
        { key: "region", type: "string", value: form.region },
        { key: "description", type: "string", value: form.description },
        { key: "userWallet", type: "string", value: form.userWallet },
        { key: "fullName", type: "string", value: form.fullName },
        { key: "contact", type: "string", value: form.contact },
        { key: "position", type: "string", value: form.position },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-lg mb-4">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: updateAccount</span>
        <h3 className="text-lg fw-700">{typograph("Обновление реквизитов учётной записи")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Адрес организации" hint="orgWallet" mono>
            {(fp) => (
              <Input {...fp} type="text" required className="mono-data" value={form.orgWallet}
                onChange={(e) => setForm({ ...form, orgWallet: e.target.value })} />
            )}
          </Field>

          <Field label="Обновлённое наименование">
            {(fp) => (
              <Input {...fp} type="text" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
          </Field>

          <Field label="Регион">
            {(fp) => (
              <Input {...fp} type="text" value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })} />
            )}
          </Field>

          <Field label="Контактный email / телефон">
            {(fp) => (
              <Input {...fp} type="text" value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            )}
          </Field>

          <Field label="Новое описание и сертификаты" full>
            {(fp) => (
              <Textarea {...fp} rows={2} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Обновить реквизиты")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
