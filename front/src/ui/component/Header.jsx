import { useContext, useRef, useState } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";
import { ToastContainer } from "./States.jsx";
import { ThemeToggle } from "../kit/ThemeToggle.jsx";
import { useDismiss } from "../kit/useDismiss.js";
import {
  ChevronDownIcon,
  CheckIcon,
  GlobeIcon,
  RefreshIcon,
  LogoutIcon,
  FactoryMarkIcon,
} from "../kit/icons.jsx";

const NAV_ITEMS = [
  { to: "/", label: "Кабинет", end: true },
  { to: "/state", label: "Реестр блокчейна" },
  { to: "/products", label: "Продукция" },
  { to: "/bids", label: "Экспортные заявки" },
  { to: "/userCard", label: "Контрагенты" },
  { to: "/func", label: "Операции смарт-контракта" },
];

const Header = () => {
  const {
    sender,
    logout,
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
  const counterpartyRef = useRef(null);
  const networkRef = useRef(null);

  useDismiss(counterpartyMenuOpen, () => setCounterpartyMenuOpen(false), counterpartyRef);
  useDismiss(networkMenuOpen, () => setNetworkMenuOpen(false), networkRef);

  const shortSender = sender ? `${sender.slice(0, 6)}…${sender.slice(-4)}` : "";

  const networkLabel =
    networkMode === "demo" ? "Демо ISO 9001" : networkMode === "testnet" ? "Waves Testnet" : "Свой узел";

  const handleSwitchCounterparty = (newOrg) => {
    setSender(newOrg.orgWallet);
    setCounterpartyMenuOpen(false);
    addToast({
      tone: "info",
      title: "Активный контрагент изменён",
      message: `Переключено на «${newOrg.name}» (${newOrg.userRole}).`,
    });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к содержимому
      </a>
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <FactoryMarkIcon size={22} />
            </span>
            <span>
              <span className="brand-title">
                <span>Waves Export Manufacturing</span>
                <span className="badge badge-accent">ISO 9001</span>
              </span>
              <span className="brand-sub mono-data">Цепь поставок на блокчейне</span>
            </span>
          </Link>

          <nav aria-label="Разделы производства" className="main-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {typograph(item.label)}
              </NavLink>
            ))}
          </nav>

          <div className="header-controls">
            <ThemeToggle />

            {/* Network mode switcher */}
            <div className="relative" ref={networkRef}>
              <button
                type="button"
                onClick={() => setNetworkMenuOpen((o) => !o)}
                className="btn btn-plate btn-sm"
                aria-haspopup="menu"
                aria-expanded={networkMenuOpen}
                aria-label="Выбор узла сети блокчейна"
              >
                <GlobeIcon size={16} />
                <span className="mono-data hide-mobile">{networkLabel}</span>
                <ChevronDownIcon size={14} />
              </button>

              {networkMenuOpen && (
                <div className="menu-panel" role="menu" aria-label="Режим подключения">
                  <div className="menu-eyebrow mono-data">РЕЖИМ ПОДКЛЮЧЕНИЯ</div>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={networkMode === "demo"}
                    onClick={() => {
                      setNetworkMode("demo");
                      setNetworkMenuOpen(false);
                    }}
                    className={`menu-item ${networkMode === "demo" ? "is-active" : ""}`}
                  >
                    <span>Реестр ISO 9001 (демо)</span>
                    {networkMode === "demo" && <CheckIcon size={16} />}
                  </button>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={networkMode === "testnet"}
                    onClick={() => {
                      setNetworkMode("testnet");
                      setNetworkMenuOpen(false);
                    }}
                    className={`menu-item ${networkMode === "testnet" ? "is-active" : ""}`}
                  >
                    <span>Waves Public Testnet</span>
                    {networkMode === "testnet" && <CheckIcon size={16} />}
                  </button>
                  <div className="menu-divider" role="separator" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      resetDemoData();
                      setNetworkMenuOpen(false);
                    }}
                    className="menu-item"
                  >
                    <RefreshIcon size={16} />
                    <span>Сбросить демо-данные</span>
                  </button>
                </div>
              )}
            </div>

            {/* Block height telemetry */}
            <div className="badge badge-plate hide-mobile mono-data">
              <span>Блок</span>
              <strong>#{blockHeight.toLocaleString("ru-RU")}</strong>
            </div>

            {/* Sender / counterparty switcher */}
            {sender && (
              <div className="relative" ref={counterpartyRef}>
                <button
                  type="button"
                  onClick={() => setCounterpartyMenuOpen((o) => !o)}
                  className="btn btn-plate btn-sm"
                  aria-haspopup="menu"
                  aria-expanded={counterpartyMenuOpen}
                  aria-label="Меню контрагента"
                >
                  <span className="diode diode-primary diode-live" />
                  <span className="mono-data">{shortSender}</span>
                  <ChevronDownIcon size={14} />
                </button>

                {counterpartyMenuOpen && (
                  <div className="menu-panel" role="menu" aria-label="Контрагент">
                    <div className="menu-eyebrow mono-data">СМЕНИТЬ РОЛЬ КОНТРАГЕНТА</div>
                    {organizations.map((org) => (
                      <button
                        key={org.orgWallet}
                        type="button"
                        role="menuitemradio"
                        aria-checked={sender === org.orgWallet}
                        onClick={() => handleSwitchCounterparty(org)}
                        className={`menu-item ${sender === org.orgWallet ? "is-active" : ""}`}
                        style={{ flexDirection: "column", alignItems: "flex-start", gap: "2px" }}
                      >
                        <span className="flex items-center justify-between w-full gap-2">
                          <span className="fw-700">{org.name}</span>
                          <span className="badge badge-primary">{org.userRole}</span>
                        </span>
                        <span className="mono-data text-xs" style={{ color: "var(--inverse-muted)" }}>
                          {org.orgWallet.slice(0, 10)}…{org.orgWallet.slice(-6)}
                        </span>
                      </button>
                    ))}
                    <div className="menu-divider" role="separator" />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        logout();
                        setCounterpartyMenuOpen(false);
                      }}
                      className="menu-item"
                      style={{ color: "#fca5a5" }}
                    >
                      <LogoutIcon size={16} />
                      <span>Выйти из кабинета</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

export default Header;
