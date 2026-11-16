import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

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
    <div className="mfg-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: updateAccount</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Обновление реквизитов учетной записи")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">АДРЕС ОРГАНИЗАЦИИ (ORGWALLET)</label>
            <input
              type="text"
              required
              className="mfg-input mono-data"
              value={form.orgWallet}
              onChange={(e) => setForm({ ...form, orgWallet: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">ОБНОВЛЕННОЕ НАИМЕНОВАНИЕ (NAME)</label>
            <input
              type="text"
              className="mfg-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">РЕГИОН</label>
            <input
              type="text"
              className="mfg-input"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">КОНТАКТНЫЙ EMAIL / ТЕЛЕФОН</label>
            <input
              type="text"
              className="mfg-input"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">НОВОЕ ОПИСАНИЕ И СЕРТИФИКАТЫ</label>
            <textarea
              rows={2}
              className="mfg-input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Обновить реквизиты")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
