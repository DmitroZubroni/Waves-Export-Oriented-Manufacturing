import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";

const Header = () => {
  const { sender, logout, contractId } = useContext(AtlantContext);

  const shortSender = sender
    ? `${sender.slice(0, 6)}...${sender.slice(-4)}`
    : "";

  return (
    <header className="mfg-header">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 max-w-7xl mx-auto">
        {/* Brand */}
        <Link to="/" className="d-flex align-items-center gap-2.5 text-decoration-none text-white">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 0 16px rgba(56, 189, 248, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span style={{ fontSize: 18 }}>🏭</span>
          </div>
          <div>
            <div className="fw-bold tracking-tight text-white leading-tight" style={{ fontSize: "1.05rem" }}>
              Waves Export Manufacturing
            </div>
            <div className="text-secondary mono-data" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              SUPPLY CHAIN & EXPORT PROTOCOL
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav aria-label="Разделы производства" className="d-flex align-items-center gap-1.5 flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mfg-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Кабинет")}
          </NavLink>
          <NavLink
            to="/state"
            className={({ isActive }) => `mfg-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Реестр блокчейна")}
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => `mfg-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Продукция")}
          </NavLink>
          <NavLink
            to="/bids"
            className={({ isActive }) => `mfg-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Экспортные заявки")}
          </NavLink>
          <NavLink
            to="/userCard"
            className={({ isActive }) => `mfg-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Контрагент")}
          </NavLink>
          <NavLink
            to="/func"
            className={({ isActive }) => `mfg-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Операции")}
          </NavLink>
        </nav>

        {/* Sender Status */}
        <div className="d-flex align-items-center gap-2">
          {sender ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-3"
                style={{
                  background: "#1E293B",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#38BDF8",
                    boxShadow: "0 0 8px #38BDF8",
                  }}
                />
                <span className="mono-data text-white fw-semibold" style={{ fontSize: "0.85rem" }}>
                  {shortSender}
                </span>
              </div>
              <button
                onClick={logout}
                className="mfg-btn-secondary py-1.5 px-3"
                style={{ minHeight: 38, fontSize: "0.8rem" }}
                title="Завершить сессию"
              >
                {typograph("Выйти")}
              </button>
            </div>
          ) : (
            <span className="mfg-badge-amber">Сессия не авторизована</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
