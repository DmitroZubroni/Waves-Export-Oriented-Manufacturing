import { useState, useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import ManufacturingExportHeroArt from "./ManufacturingExportHeroArt.jsx";
import IsoQualityBadge from "./art/IsoQualityBadge.jsx";
import { Field, Input } from "../kit/Field.jsx";
import { ArrowRightIcon, CertificateIcon } from "../kit/icons.jsx";

const Authorization = () => {
  const { login, organizations } = useContext(AtlantContext);

  const [form, setForm] = useState({
    url: "6882",
    sender: "3PMfgWavesExpMain2026RU",
    password: "export-secret-2026",
    contractId: "9z4wX6e8a1Y2b3C4d5E6F7g8H9j0K1L2m3N4p5Q6r7S",
    mode: "demo",
  });

  const [advancedOpen, setAdvancedOpen] = useState(false);
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
    <div className="container">
      <div className="grid-cards" style={{ gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)", alignItems: "start" }}>
        {/* Left column: overview and hero art */}
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="badge badge-primary">
              <span className="diode diode-primary diode-live" />
              Waves Enterprise Protocol
            </span>
            <span className="badge badge-accent">ISO 9001:2015 Стандарт</span>
          </div>

          <h1 className="fw-700" style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.5rem)", lineHeight: 1.15 }}>
            {typograph("Система учёта экспортно-ориентированного производства")}
          </h1>

          <p className="text-muted mt-3 mb-4 max-prose" style={{ fontSize: "1rem" }}>
            {typograph(
              "Непрерывная криптографическая прослеживаемость партий сырья, автоматическая верификация спецификаций качества и юридически значимое оформление экспортных партий на базе распределённого реестра Waves."
            )}
          </p>

          <div className="mb-4">
            <ManufacturingExportHeroArt width="100%" height="auto" />
          </div>

          <div className="grid-cards" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="card">
              <div className="fw-700 mb-1">ISO 9001:2015</div>
              <div className="text-muted text-sm">Сертификация партий продукции и неразрушающий контроль</div>
            </div>
            <div className="card">
              <div className="fw-700 mb-1">Waves Smart Contract</div>
              <div className="text-muted text-sm">Тип транзакции 104, мультисиг-акцепт и торговый эскроу</div>
            </div>
          </div>
        </div>

        {/* Right column: role selection is the primary path; manual keys are secondary */}
        <div className="card card-lg">
          <div className="flex items-center justify-between gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <h2 className="text-xl fw-700 mb-1">{typograph("Вход в реестр производства")}</h2>
              <p className="text-muted text-sm">{typograph("Выберите роль контрагента для демонстрации")}</p>
            </div>
            <IsoQualityBadge width={52} height={52} />
          </div>

          <div className="stack-3" aria-label="Роли контрагентов для демонстрационного входа">
            {organizations.map((org) => (
              <button
                key={org.orgWallet}
                type="button"
                onClick={() => handleQuickRole(org)}
                className="card flex items-center justify-between gap-3 text-left w-full"
                style={{ cursor: "pointer", minHeight: 44, border: "1px solid var(--border)" }}
              >
                <span>
                  <span className="fw-700" style={{ display: "block" }}>{org.name}</span>
                  <span className="mono-data text-xs text-muted">
                    {org.userRole} · {org.region}
                  </span>
                </span>
                <span className="btn btn-primary btn-sm" style={{ pointerEvents: "none" }}>
                  Войти
                  <ArrowRightIcon size={16} />
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setAdvancedOpen((o) => !o)}
            className="btn btn-ghost mt-4"
            aria-expanded={advancedOpen}
            aria-controls="manual-auth-form"
          >
            <CertificateIcon size={16} />
            {advancedOpen ? typograph("Скрыть ручной ввод ключей") : typograph("Ввести ключи вручную")}
          </button>

          {advancedOpen && (
            <form id="manual-auth-form" onSubmit={handleSubmit} className="stack-4 mt-4">
              <Field label="Адрес отправителя (Sender, Base58)" mono>
                {(fieldProps) => (
                  <Input
                    {...fieldProps}
                    type="text"
                    required
                    className="mono-data"
                    placeholder="3P..."
                    value={form.sender}
                    onChange={(e) => setForm({ ...form, sender: e.target.value })}
                  />
                )}
              </Field>

              <Field label="ID смарт-контракта Waves (Contract ID)" mono>
                {(fieldProps) => (
                  <Input
                    {...fieldProps}
                    type="text"
                    required
                    className="mono-data"
                    placeholder="Base58 ID контракта…"
                    value={form.contractId}
                    onChange={(e) => setForm({ ...form, contractId: e.target.value })}
                  />
                )}
              </Field>

              <div className="form-grid">
                <Field label="Порт узла" mono>
                  {(fieldProps) => (
                    <Input
                      {...fieldProps}
                      type="text"
                      className="mono-data"
                      placeholder="6882"
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                    />
                  )}
                </Field>
                <Field label="Пароль ключа" hint="Хранится только в памяти браузера на время сессии демо-стенда.">
                  {(fieldProps) => (
                    <Input
                      {...fieldProps}
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                  )}
                </Field>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-secondary w-full">
                {isSubmitting ? typograph("Подключение к реестру…") : typograph("Войти с указанными ключами")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authorization;
