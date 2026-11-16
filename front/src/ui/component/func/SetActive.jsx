import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";
import { Field, Input } from "../../kit/Field.jsx";
import { Select } from "../../kit/Select.jsx";

const STATUS_OPTIONS = [
  { value: "true", label: "Активен (Active)" },
  { value: "false", label: "Заблокирован (Revoked)" },
];

export const SetActive = () => {
  const { post, sender } = useContext(AtlantContext);

  const [orgWallet, setOrgWallet] = useState(sender || "3PMfgWavesExpMain2026RU");
  const [userWallet, setUserWallet] = useState(sender || "3PMfgWavesExpMain2026RU");
  const [isActive, setIsActive] = useState("true");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await post([
        { key: "action", type: "string", value: "setActive" },
        { key: "orgWallet", type: "string", value: orgWallet },
        { key: "userWallet", type: "string", value: userWallet },
        { key: "isActive", type: "boolean", value: isActive === "true" },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card-lg">
      <div className="mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="badge badge-primary mono-data mb-2" style={{ display: "inline-flex" }}>action: setActive</span>
        <h3 className="text-lg fw-700">{typograph("Управление активным статусом участника")}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Кошелёк организации" mono>
            {(fp) => (
              <Input {...fp} type="text" required className="mono-data" value={orgWallet}
                onChange={(e) => setOrgWallet(e.target.value)} />
            )}
          </Field>

          <Field label="Кошелёк сотрудника" mono>
            {(fp) => (
              <Input {...fp} type="text" required className="mono-data" value={userWallet}
                onChange={(e) => setUserWallet(e.target.value)} />
            )}
          </Field>

          <Field label="Статус доступа">
            {(fp) => <Select {...fp} value={isActive} options={STATUS_OPTIONS} onChange={setIsActive} />}
          </Field>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? typograph("Подписание…") : typograph("Изменить статус доступа")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetActive;
