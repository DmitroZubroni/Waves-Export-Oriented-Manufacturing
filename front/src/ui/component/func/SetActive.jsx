import { useContext, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

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
    <div className="mfg-card p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
        <div>
          <span className="mfg-badge-cyan mono-data mb-1">action: setActive</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph("Управление активным статусом участника (SetActive)")}
          </h3>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12 col-md-5">
            <label className="mfg-label mono-data">КОШЕЛЕК ОРГАНИЗАЦИИ</label>
            <input
              type="text"
              required
              className="mfg-input mono-data"
              value={orgWallet}
              onChange={(e) => setOrgWallet(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="mfg-label mono-data">КОШЕЛЕК СОТРУДНИКА</label>
            <input
              type="text"
              required
              className="mfg-input mono-data"
              value={userWallet}
              onChange={(e) => setUserWallet(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="mfg-label mono-data">СТАТУС ДОСТУПА</label>
            <select
              className="mfg-input mono-data"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
            >
              <option value="true">АКТИВЕН (Active)</option>
              <option value="false">ЗАБЛОКИРОВАН (Revoked)</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="mfg-btn-primary"
          >
            <span>{submitting ? typograph("Подписание...") : typograph("Изменить статус доступа")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetActive;
