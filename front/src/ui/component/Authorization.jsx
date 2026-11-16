import { useState, useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import ManufacturingExportHeroArt from "./ManufacturingExportHeroArt.jsx";

const Authorization = () => {
  const { login } = useContext(AtlantContext);

  const [form, setForm] = useState({
    url: "6882",
    sender: "",
    password: "",
    contractId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      login(form);
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center g-5 py-4">
        {/* Left Col: Hero Art & Technical Overview */}
        <div className="col-lg-6">
          <div className="mfg-badge-cyan mb-3">
            <span>●</span>
            <span>{typograph("Waves Enterprise Protocol")}</span>
          </div>
          <h1 className="fw-bold text-white mb-3" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.35rem)" }}>
            {typograph("Система учета экспортно-ориентированного производства")}
          </h1>
          <p className="text-secondary mb-4 leading-relaxed" style={{ fontSize: "0.95rem" }}>
            {typograph(
              "Прослеживаемость партий сырья, автоматическая верификация спецификаций качества и юридически значимое оформление экспортных партий на базе смарт-контрактов Waves."
            )}
          </p>

          <div className="text-center text-lg-start mb-4">
            <ManufacturingExportHeroArt width={340} height={200} className="w-100 h-auto" />
          </div>
        </div>

        {/* Right Col: Auth Form */}
        <div className="col-lg-6">
          <div className="mfg-card p-4 p-md-5">
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary border-opacity-25">
              <div>
                <h2 className="fs-4 fw-bold text-white mb-0">{typograph("Авторизация узла")}</h2>
                <p className="text-secondary mb-0" style={{ fontSize: "0.8rem" }}>
                  {typograph("Параметры подключения к сети Waves")}
                </p>
              </div>
              <span className="mfg-badge-amber">WAVES NODE</span>
            </div>

            {success ? (
              <div className="p-3 rounded-3 mb-3 bg-emerald-500 bg-opacity-10 border border-emerald-500 border-opacity-30 text-emerald-400">
                {typograph("Авторизация успешно подтверждена. Переход в личный кабинет...")}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label className="text-secondary mono-data d-block mb-1.5" style={{ fontSize: "0.75rem" }}>
                    {typograph("ПОРТ / URL НОДЫ WAVES")}
                  </label>
                  <input
                    type="text"
                    required
                    className="mfg-input mono-data"
                    placeholder="например: 6882"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-secondary mono-data d-block mb-1.5" style={{ fontSize: "0.75rem" }}>
                    {typograph("АДРЕС ОТПРАВИТЕЛЯ (SENDER ADDRESS)")}
                  </label>
                  <input
                    type="text"
                    required
                    className="mfg-input mono-data"
                    placeholder="3P..."
                    value={form.sender}
                    onChange={(e) => setForm({ ...form, sender: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-secondary mono-data d-block mb-1.5" style={{ fontSize: "0.75rem" }}>
                    {typograph("ПАРОЛЬ КЛЮЧЕВОЙ ПАРЫ")}
                  </label>
                  <input
                    type="password"
                    required
                    className="mfg-input"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-secondary mono-data d-block mb-1.5" style={{ fontSize: "0.75rem" }}>
                    {typograph("ID СМАРТ-КОНТРАКТА (CONTRACT ID)")}
                  </label>
                  <input
                    type="text"
                    required
                    className="mfg-input mono-data"
                    placeholder="Base58 ID контракта..."
                    value={form.contractId}
                    onChange={(e) => setForm({ ...form, contractId: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mfg-btn-primary w-100 mt-3 py-3"
                >
                  <span>{isSubmitting ? typograph("Подключение...") : typograph("Войти в реестр")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
