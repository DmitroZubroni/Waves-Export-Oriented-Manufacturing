import { useContext, useState } from "react";
import Header from "../component/Header.jsx";
import Authorization from "../component/Authorization.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";

import RegisterOrg from "../component/func/RegisterOrg.jsx";
import UpdateAccount from "../component/func/UpdateAccount.jsx";
import SetActive from "../component/func/SetActive.jsx";

import AddProduct from "../component/func/AddProduct.jsx";
import ApproveProduct from "../component/func/ApproveProduct.jsx";

import CreateBid from "../component/func/CreateBid.jsx";
import RespondToBid from "../component/func/RespondToBid.jsx";
import ClientRespond from "../component/func/ClientRespond.jsx";

import AcceptBid from "../component/func/AcceptBid.jsx";
import UpdateStage from "../component/func/UpdateStage.jsx";
import MarkDelivered from "../component/func/MarkDelivered.jsx";

import FinalizeDelivery from "../component/func/FinalizeDelivery.jsx";

const Function = () => {
  const { isAuthorized, contractId, sender, txHistory } = useContext(AtlantContext);
  const [activeTab, setActiveTab] = useState("accounts");

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: "100vh", background: "#090D16" }}>
        <Header />
        <Authorization />
      </div>
    );
  }

  const tabs = [
    { id: "accounts", label: "1. Организации и доступ", icon: "🏢" },
    { id: "products", label: "2. Продукция и ISO 9001", icon: "📦" },
    { id: "bids", label: "3. Экспортные заявки", icon: "📑" },
    { id: "supplier", label: "4. Логистика и этапы", icon: "🚢" },
    { id: "finalize", label: "5. Приемка и эскроу", icon: "⚖️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#090D16" }}>
      <Header />

      <main className="mfg-container">
        {/* Banner */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="mfg-badge-cyan">{typograph("Центр операций смарт-контракта")}</span>
              <span className="mfg-badge-emerald">Waves Type 104</span>
            </div>
            <h1 className="fs-3 fw-bold text-white mb-1">
              {typograph("Управление бизнес-процессами экспортного производства")}
            </h1>
            <p className="text-secondary mb-0 mono-data" style={{ fontSize: "0.8125rem" }}>
              Contract: {contractId} · Active Signer: {sender}
            </p>
          </div>
        </div>

        {/* Industrial Navigation Tabs (WCAG 2.2 AA compliant, >= 44px min touch target) */}
        <div className="mfg-card p-2 mb-4">
          <div className="d-flex flex-wrap align-items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`mfg-nav-link flex-grow-1 flex-md-grow-0 py-2 px-3 d-flex align-items-center gap-2 ${
                  activeTab === tab.id ? "active" : ""
                }`}
                style={{ fontSize: "0.875rem" }}
              >
                <span>{tab.icon}</span>
                <span>{typograph(tab.label)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Panels */}
        <div className="row g-4">
          <div className="col-12 col-xl-8">
            {activeTab === "accounts" && (
              <div>
                <RegisterOrg />
                <UpdateAccount />
                <SetActive />
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <AddProduct />
                <ApproveProduct />
              </div>
            )}

            {activeTab === "bids" && (
              <div>
                <CreateBid />
                <RespondToBid />
                <ClientRespond />
              </div>
            )}

            {activeTab === "supplier" && (
              <div>
                <AcceptBid />
                <UpdateStage />
                <MarkDelivered />
              </div>
            )}

            {activeTab === "finalize" && (
              <div>
                <FinalizeDelivery />
              </div>
            )}
          </div>

          {/* Right Sidebar: Live Transaction Broadcast Monitor */}
          <div className="col-12 col-xl-4">
            <div className="mfg-card p-4 sticky-top" style={{ top: "5.5rem" }}>
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary border-opacity-15">
                <div className="fw-bold text-white mono-data" style={{ fontSize: "0.875rem" }}>
                  ТРАНЗАКЦИОННЫЙ ТЕЛЕТАЙП
                </div>
                <span className="mfg-diode mfg-diode-emerald" />
              </div>

              <p className="text-secondary mono-data mb-3" style={{ fontSize: "0.75rem" }}>
                Все вызовы смарт-контракта формируются как транзакции Type 104 (Contract Invocation) и подписываются ключевой парой отправителя.
              </p>

              {txHistory.length === 0 ? (
                <div className="p-3 rounded-3 text-center mono-data" style={{ background: "#090D16", fontSize: "0.75rem", color: "#64748B" }}>
                  Ожидание отправки транзакций...<br />
                  (Заполните любую форму слева и нажмите «Отправить»)
                </div>
              ) : (
                <div className="d-flex flex-column gap-2" style={{ maxHeight: 420, overflowY: "auto" }}>
                  {txHistory.map((tx, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-3 mono-data"
                      style={{ background: "#090D16", border: "1px solid rgba(56, 189, 248, 0.2)", fontSize: "0.75rem" }}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-cyan-400 font-bold">{tx.action}</span>
                        <span className="text-secondary" style={{ fontSize: "0.7rem" }}>{tx.timestamp}</span>
                      </div>
                      <div className="text-secondary text-truncate mb-1" style={{ fontSize: "0.7rem" }}>
                        TX: {tx.txId}
                      </div>
                      <div className="text-emerald-400" style={{ fontSize: "0.7rem" }}>
                        ✓ Блок подтвержден · Комиссия: {tx.fee} WAVES
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Function;
