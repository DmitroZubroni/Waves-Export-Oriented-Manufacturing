import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input, Textarea } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

const ROLE_OPTIONS = [
  { value: "MANUFACTURER", label: "Manufacturer — завод-изготовитель" },
  { value: "CARRIER", label: "Carrier — перевозчик / флот" },
  { value: "INSPECTOR", label: "Inspector — орган ISO 9001" },
  { value: "CLIENT", label: "Client — импортёр-покупатель" },
];

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
    <div className="card card-lg mb-4">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: registerOrg</span>
          <h3 className="text-lg fw-700">{typograph("Регистрация новой организации в реестре")}</h3>
        </div>
        <button type="button" onClick={fillSample} className="btn btn-secondary btn-sm">
          {typograph("Заполнить образец")}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Адрес кошелька организации" hint="orgWallet" mono>
            {(fp) => (
              <Input {...fp} type="text" required className="mono-data" value={form.orgWallet}
                onChange={(e) => setForm({ ...form, orgWallet: e.target.value })} />
            )}
          </Field>

          <Field label="Наименование организации">
            {(fp) => (
              <Input {...fp} type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            )}
          </Field>

          <Field label="Тип организации">
            {(fp) => (
              <Input {...fp} type="text" value={form.orgType}
                onChange={(e) => setForm({ ...form, orgType: e.target.value })} />
            )}
          </Field>

          <Field label="Регион производства / базирования">
            {(fp) => (
              <Input {...fp} type="text" value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })} />
            )}
          </Field>

          <Field label="Роль в цепи поставок" hint="userRole">
            {(fp) => (
              <Select {...fp} value={form.userRole} options={ROLE_OPTIONS}
                onChange={(value) => setForm({ ...form, userRole: value })} />
            )}
          </Field>

          <Field label="Описание и сертификаты ISO 9001" full>
            {(fp) => (
              <Textarea {...fp} rows={2} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            )}
          </Field>

          <Field label="Адрес сотрудника" hint="userWallet" mono>
            {(fp) => (
              <Input {...fp} type="text" className="mono-data" value={form.userWallet}
                onChange={(e) => setForm({ ...form, userWallet: e.target.value })} />
            )}
          </Field>

          <Field label="ФИО представителя">
            {(fp) => (
              <Input {...fp} type="text" value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            )}
          </Field>

          <Field label="Должность">
            {(fp) => (
              <Input {...fp} type="text" value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })} />
            )}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание транзакции…") : typograph("Зарегистрировать организацию")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterOrg;
