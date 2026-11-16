import { useContext, useState } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";
import { ToastContainer } from "./States.jsx";

const Header = () => {
  const {
    sender,
    logout,
    contractId,
    networkMode,
    setNetworkMode,
    blockHeight,
    toasts,
    removeToast,
    resetDemoData,
    organizations,
    setSender,
    addToast,
  } = useContext(AtlantContext);

  const [counterpartyMenuOpen, setCounterpartyMenuOpen] = useState(false);
  const [networkMenuOpen, setNetworkMenuOpen] = useState(false);

  const shortSender = sender
    ? `${sender.slice(0, 6)}...${sender.slice(-4)}`
    : "";

  const handleSwitchCounterparty = (newOrg) => {
    setSender(newOrg.orgWallet);
    setCounterpartyMenuOpen(false);
    addToast({
      tone: "info",
      title: "Активный контрагент изменен",
      message: `Переключено на «${newOrg.name}» (${newOrg.userRole}).`,
    });
  };

  return (
    <>
      <header className="mfg-header">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 max-w-7xl mx-auto">
          {/* Brand */}
          <Link
            to="/"
            className="d-flex align-items-center gap-2.5 text-decoration-none text-white"
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 0 18px rgba(56, 189, 248, 0.45)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              <span style={{ fontSize: 20 }}>🏭</span>
            </div>
            <div>
              <div
                className="fw-bold tracking-tight text-white leading-tight d-flex align-items-center gap-2"
                style={{ fontSize: "1.05rem" }}
              >
                <span>Waves Export Manufacturing</span>
                <span className="mfg-badge-amber" style={{ fontSize: "0.65rem", padding: "0.15rem 0.5rem" }}>
                  ISO 9001
                </span>
              </div>
              <div
                className="text-secondary mono-data"
                style={{ fontSize: "0.7rem", letterSpacing: "0.06em" }}
              >
                BLOCKCHAIN SUPPLY CHAIN & EXPORT PROTOCOL
              </div>
            </div>
          </Link>

          {/* Navigation Links (WCAG 2.2 AA compliant, >= 44px touch target) */}
          <nav
            aria-label="Разделы производства"
            className="d-flex align-items-center gap-1.5 flex-wrap"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `mfg-nav-link ${isActive ? "active" : ""}`
              }
            >
              {typograph("Кабинет")}
            </NavLink>
            <NavLink
              to="/state"
              className={({ isActive }) =>
                `mfg-nav-link ${isActive ? "active" : ""}`
              }
            >
              {typograph("Реестр блокчейна")}
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `mfg-nav-link ${isActive ? "active" : ""}`
              }
            >
              {typograph("Продукция")}
            </NavLink>
            <NavLink
              to="/bids"
              className={({ isActive }) =>
                `mfg-nav-link ${isActive ? "active" : ""}`
              }
            >
              {typograph("Экспортные заявки")}
            </NavLink>
            <NavLink
              to="/userCard"
              className={({ isActive }) =>
                `mfg-nav-link ${isActive ? "active" : ""}`
              }
            >
              {typograph("Контрагенты")}
            </NavLink>
            <NavLink
              to="/func"
              className={({ isActive }) =>
                `mfg-nav-link ${isActive ? "active" : ""}`
              }
            >
              {typograph("Операции смарт-контракта")}
            </NavLink>
          </nav>

          {/* Right Controls: Network Selector & Counterparty Passport */}
          <div className="d-flex align-items-center gap-2.5 flex-wrap">
            {/* Network Mode Switcher */}
            <div className="position-relative">
              <button
                type="button"
                onClick={() => setNetworkMenuOpen(!networkMenuOpen)}
                className="mfg-btn-secondary py-1 px-2.5 d-flex align-items-center gap-2"
                style={{ minHeight: 38, fontSize: "0.8125rem" }}
                aria-expanded={networkMenuOpen}
                aria-label="Выбор узла сети блокчейна"
              >
                <span
                  className={`mfg-diode ${
                    networkMode === "demo"
                      ? "mfg-diode-emerald"
                      : networkMode === "testnet"
                      ? "mfg-diode-cyan"
                      : "mfg-diode-amber"
                  }`}
                />
                <span className="mono-data">
                  {networkMode === "demo"
                    ? "Демо ISO 9001"
                    : networkMode === "testnet"
                    ? "Waves Testnet"
                    : "Custom Node"}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>▼</span>
              </button>

              {networkMenuOpen && (
                <div
                  className="mfg-card p-2 position-absolute end-0 mt-2 shadow-lg z-3"
                  style={{ width: 230, background: "#0F172A", border: "1px solid rgba(56, 189, 248, 0.3)" }}
                >
                  <div className="px-2 py-1 text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                    РЕЖИМ ПОДКЛЮЧЕНИЯ:
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNetworkMode("demo");
                      setNetworkMenuOpen(false);
                    }}
                    className={`w-100 text-start p-2 rounded border-0 bg-transparent text-white d-flex align-items-center justify-content-between ${
                      networkMode === "demo" ? "bg-cyan-500/10 text-cyan-400 font-bold" : ""
                    }`}
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <span>🏭 Реестр ISO 9001 (Mock)</span>
                    {networkMode === "demo" && <span>✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNetworkMode("testnet");
                      setNetworkMenuOpen(false);
                    }}
                    className={`w-100 text-start p-2 rounded border-0 bg-transparent text-white d-flex align-items-center justify-content-between ${
                      networkMode === "testnet" ? "bg-cyan-500/10 text-cyan-400 font-bold" : ""
                    }`}
                    style={{ fontSize: "0.8125rem" }}
                  >
                    <span>🌐 Waves Public Testnet</span>
                    {networkMode === "testnet" && <span>✓</span>}
                  </button>
                  <div className="border-top border-secondary border-opacity-20 my-1" />
                  <button
                    type="button"
                    onClick={() => {
                      resetDemoData();
                      setNetworkMenuOpen(false);
                    }}
                    className="w-100 text-start p-2 rounded border-0 bg-transparent text-secondary hover-text-white"
                    style={{ fontSize: "0.75rem" }}
                  >
                    ↻ Сбросить демо-данные
                  </button>
                </div>
              )}
            </div>

            {/* Block Height Telemetry */}
            <div
              className="d-none d-lg-flex align-items-center gap-1.5 px-2.5 py-1 rounded-2 mono-data"
              style={{
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "0.75rem",
                color: "#94A3B8",
              }}
            >
              <span>БЛОК:</span>
              <span className="text-white fw-bold">#{blockHeight.toLocaleString("ru-RU")}</span>
            </div>

            {/* Sender / Counterparty Switcher */}
            {sender ? (
              <div className="position-relative">
                <button
                  type="button"
                  onClick={() => setCounterpartyMenuOpen(!counterpartyMenuOpen)}
                  className="mfg-btn-secondary py-1 px-3 d-flex align-items-center gap-2"
                  style={{
                    minHeight: 38,
                    background: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                  }}
                  aria-expanded={counterpartyMenuOpen}
                  aria-label="Меню контрагента"
                >
                  <span className="mfg-diode mfg-diode-cyan" />
                  <span className="mono-data fw-bold text-white" style={{ fontSize: "0.8125rem" }}>
                    {shortSender}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#94A3B8" }}>▼</span>
                </button>

                {counterpartyMenuOpen && (
                  <div
                    className="mfg-card p-3 position-absolute end-0 mt-2 shadow-lg z-3"
                    style={{
                      width: 320,
                      background: "#0F172A",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                    }}
                  >
                    <div className="text-secondary mono-data mb-2" style={{ fontSize: "0.7rem" }}>
                      СМЕНИТЬ РОЛЬ КОНТРАГЕНТА:
                    </div>
                    <div className="d-flex flex-column gap-1 mb-3">
                      {organizations.map((org) => (
                        <button
                          key={org.orgWallet}
                          type="button"
                          onClick={() => handleSwitchCounterparty(org)}
                          className={`text-start p-2 rounded border-0 bg-transparent text-white d-flex flex-column gap-0.5 ${
                            sender === org.orgWallet ? "bg-cyan-500/10 border-cyan-500/30" : ""
                          }`}
                          style={{ fontSize: "0.8125rem" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">{org.name}</span>
                            <span className="mfg-badge-cyan" style={{ fontSize: "0.65rem" }}>
                              {org.userRole}
                            </span>
                          </div>
                          <span className="text-secondary mono-data" style={{ fontSize: "0.7rem" }}>
                            {org.orgWallet.slice(0, 10)}...{org.orgWallet.slice(-6)}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="border-top border-secondary border-opacity-20 pt-2 d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setCounterpartyMenuOpen(false);
                        }}
                        className="mfg-btn-ghost text-danger p-0"
                        style={{ minHeight: 32, fontSize: "0.8125rem" }}
                      >
                        ✕ Выйти из кабинета
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

export default Header;
