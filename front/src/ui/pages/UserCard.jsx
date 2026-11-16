import { useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { LoadingSkeleton, EmptyState, ErrorState } from "../component/States.jsx";
import IsoQualityBadge from "../component/art/IsoQualityBadge.jsx";

const UserCard = () => {
  const { organizations, setSender, addToast, setNetworkMode } = useContext(AtlantContext);

  const [roleFilter, setRoleFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [simulatedLoading, setSimulatedLoading] = useState(false);
  const [simulatedError, setSimulatedError] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const roles = [
    { id: "ALL", label: "Все участники" },
    { id: "MANUFACTURER", label: "Производители" },
    { id: "CARRIER", label: "Логистика / Флот" },
    { id: "INSPECTOR", label: "Лаборатории ISO" },
    { id: "CLIENT", label: "Импортеры" },
  ];

  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      if (roleFilter !== "ALL" && org.userRole !== roleFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          org.name.toLowerCase().includes(q) ||
          org.orgWallet.toLowerCase().includes(q) ||
          org.orgType.toLowerCase().includes(q) ||
          org.region.toLowerCase().includes(q) ||
          org.fullName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [organizations, roleFilter, searchQuery]);

  const handleSelectAsActive = (org) => {
    setSender(org.orgWallet);
    addToast({
      tone: "success",
      title: "Контрагент активирован",
      message: `Текущая сессия переключена на «${org.name}» (${org.userRole}).`,
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="mfg-container">
        {/* State Simulator Controls */}
        <div className="d-flex justify-content-end gap-2 mb-3">
          <span className="text-secondary mono-data align-self-center" style={{ fontSize: "0.75rem" }}>
            [ПРОВЕРКА СОСТОЯНИЙ ЭКРАНА У1]:
          </span>
          <button
            type="button"
            onClick={() => {
              setSimulatedLoading(true);
              setTimeout(() => setSimulatedLoading(false), 1200);
            }}
            className="mfg-btn-ghost py-1 px-2 mono-data"
            style={{ minHeight: 32, fontSize: "0.75rem" }}
          >
            Тест Загрузки
          </button>
          <button
            type="button"
            onClick={() => setSimulatedError(!simulatedError)}
            className={`mfg-btn-ghost py-1 px-2 mono-data ${simulatedError ? "text-danger" : ""}`}
            style={{ minHeight: 32, fontSize: "0.75rem" }}
          >
            {simulatedError ? "Сбросить ошибку" : "Тест Ошибки"}
          </button>
        </div>

        {/* Page Banner */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-4 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="mfg-badge-cyan">{typograph("Реестр контрагентов")}</span>
              <span className="mfg-badge-amber">Аккредитация ISO</span>
            </div>
            <h1 className="fs-3 fw-bold text-white mb-1">
              {typograph("Участники цепи поставок и верифицированные организации")}
            </h1>
            <p className="text-secondary mb-0" style={{ fontSize: "0.9375rem", maxWidth: "60ch" }}>
              {typograph(
                "Единый реестр аккредитованных заводов, морских линий, органов технического надзора и международных покупателей в блокчейне Waves."
              )}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/func" className="mfg-btn-primary">
              <span>+ Зарегистрировать организацию</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mfg-card p-3 mb-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div className="d-flex flex-wrap align-items-center gap-1.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRoleFilter(r.id)}
                  className={`mfg-btn-secondary py-1 px-3 ${
                    roleFilter === r.id ? "bg-cyan-500/20 text-cyan-400 font-bold" : ""
                  }`}
                  style={{ minHeight: 34, fontSize: "0.8125rem" }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex-grow-1" style={{ maxWidth: 300 }}>
              <input
                type="text"
                className="mfg-input mono-data"
                placeholder="Поиск контрагента, кошелька, региона..."
                style={{ minHeight: 36, fontSize: "0.8125rem" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 4 States of Screen (Rule У1) */}
        {simulatedError ? (
          <ErrorState
            title="Ошибка загрузки контрагентов"
            description="Не удалось получить список аккредитованных организаций из реестра смарт-контракта."
            onRetry={() => setSimulatedError(false)}
            secondaryAction={() => {
              setSimulatedError(false);
              setNetworkMode("demo");
            }}
          />
        ) : simulatedLoading ? (
          <LoadingSkeleton count={3} />
        ) : filteredOrgs.length === 0 ? (
          <EmptyState
            title="Контрагенты не найдены"
            description="По заданным параметрам поиска организаций не обнаружено."
            actionLabel="Сбросить фильтры"
            onAction={() => {
              setRoleFilter("ALL");
              setSearchQuery("");
            }}
          />
        ) : (
          <div className="row g-4">
            {filteredOrgs.map((org) => (
              <div key={org.orgWallet} className="col-12 col-md-6">
                <div className="mfg-card p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    {/* Top Row */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="mfg-badge-cyan mono-data mb-1.5 d-inline-block" style={{ fontSize: "0.75rem" }}>
                          {org.userRole}
                        </span>
                        <h2 className="fs-5 fw-bold text-white mb-0" style={{ lineHeight: 1.3 }}>
                          {typograph(org.name)}
                        </h2>
                      </div>
                      <IsoQualityBadge width={44} height={44} />
                    </div>

                    <div className="text-secondary mono-data mb-3" style={{ fontSize: "0.8125rem" }}>
                      {org.orgType} · <span className="text-white">{org.region}</span>
                    </div>

                    <p className="text-secondary mb-3 leading-relaxed" style={{ fontSize: "0.875rem" }}>
                      {typograph(org.description)}
                    </p>

                    {/* Passport Data Grid */}
                    <div
                      className="p-3 rounded-3 mb-3 mono-data"
                      style={{ background: "#090D16", border: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "0.75rem" }}
                    >
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Кошелек Waves:</span>
                        <span className="text-cyan-400 font-bold">{org.orgWallet}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Представитель:</span>
                        <span className="text-white">{org.fullName} ({org.position})</span>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                        <span className="text-secondary">Контакты:</span>
                        <span className="text-secondary">{org.contact}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span className="text-secondary">Аккредитация ISO:</span>
                        <span className="text-emerald-400 font-bold">Действительна (с {org.accreditationDate})</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-top border-secondary border-opacity-15 d-flex justify-content-between align-items-center">
                    <span className="mfg-badge-emerald">
                      <span>●</span>
                      <span>Активен в реестре</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSelectAsActive(org)}
                      className="mfg-btn-primary py-1 px-3"
                      style={{ minHeight: 34, fontSize: "0.8125rem" }}
                    >
                      Выбрать для работы →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserCard;
