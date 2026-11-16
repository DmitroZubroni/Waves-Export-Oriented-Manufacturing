import { useState, useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import ManufacturingExportHeroArt from "./ManufacturingExportHeroArt.jsx";
import IsoQualityBadge from "./art/IsoQualityBadge.jsx";

const Authorization = () => {
  const { login, organizations } = useContext(AtlantContext);

  const [form, setForm] = useState({
    url: "6882",
    sender: "3PMfgWavesExpMain2026RU",
    password: "export-secret-2026",
    contractId: "9z4wX6e8a1Y2b3C4d5E6F7g8H9j0K1L2m3N4p5Q6r7S",
    mode: "demo",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      login(form);
      setIsSubmitting(false);
    }, 300);
  };

  const handleQuickRole = (org) => {
    login({
      url: form.url,
      sender: org.orgWallet,
      password: "export-secret-2026",
      contractId: form.contractId,
      mode: "demo",
    });
  };

  return (
    <div className="mfg-container">
      <div className="row align-items-center g-5 py-4">
        {/* Left Column: Hero Art & Technical Overview */}
        <div className="col-12 col-lg-6">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="mfg-badge-cyan">
              <span className="mfg-diode mfg-diode-cyan" />
              <span>{typograph("Waves Enterprise Protocol")}</span>
            </span>
            <span className="mfg-badge-amber">
              <span>★</span>
              <span>{typograph("ISO 9001:2015 Стандарт")}</span>
            </span>
          </div>

          <h1
            className="fw-bold text-white mb-3 tracking-tight"
            style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.5rem)", lineHeight: 1.15 }}
          >
            {typograph("Система учета экспортно-ориентированного производства")}
          </h1>

          <p
            className="text-secondary mb-4 leading-relaxed"
            style={{ fontSize: "1rem", maxWidth: "54ch" }}
          >
            {typograph(
              "Непрерывная криптографическая прослеживаемость партий сырья, автоматическая верификация спецификаций качества и юридически значимое оформление экспортных партий на базе распределенного реестра Waves."
            )}
          </p>

          <div className="mb-4">
            <ManufacturingExportHeroArt width="100%" height="auto" />
          </div>

          {/* Key Industrial Standard Badges */}
          <div className="row g-3">
            <div className="col-6">
              <div className="mfg-card p-3 h-100">
                <div className="fw-bold text-white mb-1" style={{ fontSize: "0.875rem" }}>
                  ISO 9001:2015
                </div>
                <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                  Сертификация партий продукции и неразрушающий контроль
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="mfg-card p-3 h-100">
                <div className="fw-bold text-white mb-1" style={{ fontSize: "0.875rem" }}>
                  Waves Smart Contract
                </div>
                <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                  Тип транзакции 104, мультисиг-акцепт и торговый эскроу
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Form & One-Click Role Selection */}
        <div className="col-12 col-lg-6">
          <div className="mfg-card p-4 p-md-5">
            <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-20">
              <div>
                <h2 className="fs-4 fw-bold text-white mb-1">
                  {typograph("Авторизация узла производства")}
                </h2>
                <p className="text-secondary mb-0" style={{ fontSize: "0.8125rem" }}>
                  {typograph("Выберите роль контрагента или укажите ключи")}
                </p>
              </div>
              <IsoQualityBadge width={56} height={56} />
            </div>

            {/* Quick Demo Role Cards (Studio «Калибр» Instant Start) */}
            <div className="mb-4">
              <div className="mfg-label mb-2">
                {typograph("БЫСТРЫЙ ВХОД ДЛЯ ДЕМОНСТРАЦИИ (ВЫБЕРИТЕ РОЛЬ):")}
              </div>
              <div className="d-flex flex-column gap-2">
                {organizations.map((org) => (
                  <button
                    key={org.orgWallet}
                    type="button"
                    onClick={() => handleQuickRole(org)}
                    className="mfg-card p-2.5 text-start border-0 bg-secondary bg-opacity-10 hover-bg-opacity-20 d-flex align-items-center justify-content-between transition-all"
                  >
                    <div>
                      <div className="fw-bold text-white" style={{ fontSize: "0.875rem" }}>
                        {org.name}
                      </div>
                      <div className="text-secondary mono-data" style={{ fontSize: "0.75rem" }}>
                        {org.userRole} · {org.region}
                      </div>
                    </div>
                    <span className="mfg-btn-primary py-1 px-3" style={{ minHeight: 32, fontSize: "0.75rem" }}>
                      Войти →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="position-relative my-4 text-center">
              <hr className="border-secondary border-opacity-20" />
              <span
                className="position-absolute top-50 start-50 translate-middle px-3 mono-data text-secondary"
                style={{ background: "#0F172A", fontSize: "0.75rem" }}
              >
                ИЛИ РУЧНОЙ ВВОД КЛЮЧЕЙ
              </span>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label htmlFor="auth-sender" className="mfg-label mono-data">
                  {typograph("АДРЕС ОТПРАВИТЕЛЯ (SENDER BASE58)")}
                </label>
                <input
                  id="auth-sender"
                  type="text"
                  required
                  className="mfg-input mono-data"
                  placeholder="3P..."
                  value={form.sender}
                  onChange={(e) => setForm({ ...form, sender: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="auth-contract" className="mfg-label mono-data">
                  {typograph("ID СМАРТ-КОНТРАКТА WAVES (CONTRACT ID)")}
                </label>
                <input
                  id="auth-contract"
                  type="text"
                  required
                  className="mfg-input mono-data"
                  placeholder="Base58 ID контракта..."
                  value={form.contractId}
                  onChange={(e) => setForm({ ...form, contractId: e.target.value })}
                />
              </div>

              <div className="row g-3">
                <div className="col-6">
                  <label htmlFor="auth-port" className="mfg-label mono-data">
                    {typograph("ПОРТ УЗЛА")}
                  </label>
                  <input
                    id="auth-port"
                    type="text"
                    className="mfg-input mono-data"
                    placeholder="6882"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="auth-pass" className="mfg-label mono-data">
                    {typograph("ПАРОЛЬ КЛЮЧА")}
                  </label>
                  <input
                    id="auth-pass"
                    type="password"
                    className="mfg-input"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mfg-btn-primary w-100 mt-2 py-3"
              >
                <span>
                  {isSubmitting
                    ? typograph("Подключение к реестру...")
                    : typograph("Войти в реестр Waves")}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
