import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

export const RegisterOrg = () => {
  const { post, sender } = useContext(AtlantContext);

  const [form, setForm] = useState({
    orgWallet: "3PNewBalticMfg2026RU",
    name: "АО «Балтийские Прецизионные Системы»",
    orgType: "Приборостроение и оптические датчики",
    region: "RU-LED (Особая экономическая зона)",
    description: "Производство поверочных датчиков и волоконно-оптических компонентов. Аккредитация ISO 9001:2015.",
    userWallet: "3PNewBalticUser2026",
    userRole: "MANUFACTURER",
    fullName: "Волков Сергей Андреевич",
    contact: "export@baltic-precision.ru / +7 (812) 600-44-12",
    position: "Главный инженер по стандартизации",
  });

  const [submitting, setSubmitting] = useState(false);

  const fillSample = () => {
    setForm({
      orgWallet: `3POrg${Date.now().toString().slice(-6)}RU`,
      name: "ООО «Кронштадт Логистик Терминал»",
      orgType: "Морской стивидорный оператор",
      region: "RU-KRN (Большой порт Санкт-Петербург)",
      description: "Перевалка генеральных и опасных экспортных грузов. Лицензия ISO 9001:2015 №RU-9001-99214.",
      userWallet: `3PUser${Date.now().toString().slice(-6)}`,
      userRole: "CARRIER",
      fullName: "Калинин Дмитрий Павлович",
      contact: "terminal@kronstadt-log.ru",
      position: "Директор портового терминала",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "registerOrg" },
        { key: "orgWallet", type: "string", value: form.orgWallet },
        { key: "name", type: "string", value: form.name },
        { key: "orgType", type: "string", value: form.orgType },
        { key: "region", type: "string", value: form.region },
        { key: "description", type: "string", value: form.description },
        { key: "userWallet", type: "string", value: form.userWallet },
        { key: "userRole", type: "string", value: form.userRole },
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
          <span className="mfg-badge-cyan mono-data mb-1">action: registerOrg</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Регистрация новой организации в реестре")}
          </h3>
        </div>
        <button
          type="button"
          onClick={fillSample}
          className="mfg-btn-secondary py-1 px-3"
          style={{ minHeight: 34, fontSize: "0.75rem" }}
        >
          Заполнить образец
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">АДРЕС КОШЕЛЬКА ОРГАНИЗАЦИИ (ORGWALLET)</label>
            <input
              type="text"
              required
              className="mfg-input mono-data"
              value={form.orgWallet}
              onChange={(e) => setForm({ ...form, orgWallet: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="mfg-label mono-data">НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ (NAME)</label>
            <input
              type="text"
              required
              className="mfg-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">ТИП ОРГАНИЗАЦИИ (ORGTYPE)</label>
            <input
              type="text"
              className="mfg-input"
              value={form.orgType}
              onChange={(e) => setForm({ ...form, orgType: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">РЕГИОН ПРОИЗВОДСТВА / БАЗИРОВАНИЯ</label>
            <input
              type="text"
              className="mfg-input"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">РОЛЬ В ЦЕПИ ПОСТАВОК (USERROLE)</label>
            <select
              className="mfg-input mono-data"
              value={form.userRole}
              onChange={(e) => setForm({ ...form, userRole: e.target.value })}
            >
              <option value="MANUFACTURER">MANUFACTURER (Завод-изготовитель)</option>
              <option value="CARRIER">CARRIER (Перевозчик / Флот)</option>
              <option value="INSPECTOR">INSPECTOR (Орган ISO 9001)</option>
              <option value="CLIENT">CLIENT (Импортер-покупатель)</option>
            </select>
          </div>

          <div className="col-12">
            <label className="mfg-label mono-data">ОПИСАНИЕ И СЕРТИФИКАТЫ ISO 9001</label>
            <textarea
              rows={2}
              className="mfg-input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">АДРЕС СОТРУДНИКА (USERWALLET)</label>
            <input
              type="text"
              className="mfg-input mono-data"
              value={form.userWallet}
              onChange={(e) => setForm({ ...form, userWallet: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">ФИО ПРЕДСТАВИТЕЛЯ (FULLNAME)</label>
            <input
              type="text"
              className="mfg-input"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">ДОЛЖНОСТЬ (POSITION)</label>
            <input
              type="text"
              className="mfg-input"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание транзакции...") : typograph("Зарегистрировать организацию (Type 104)")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterOrg;
