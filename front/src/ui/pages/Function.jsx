import { useContext, useState } from "react";
import Header from "../component/Header.jsx";
import Authorization from "../component/Authorization.jsx";
import { AtlantContext } from "../../core/context.jsx";
import { typograph } from "../../core/typograph";
import { CheckIcon } from "../kit/icons.jsx";

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

const TABS = [
  { id: "accounts", label: "1. Организации и доступ" },
  { id: "products", label: "2. Продукция и ISO 9001" },
  { id: "bids", label: "3. Экспортные заявки" },
  { id: "supplier", label: "4. Логистика и этапы" },
  { id: "finalize", label: "5. Приёмка и эскроу" },
];

const Function = () => {
  const { isAuthorized, contractId, sender, txHistory } = useContext(AtlantContext);
  const [activeTab, setActiveTab] = useState("accounts");

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Header />
        <Authorization />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main id="main-content" className="container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="badge badge-primary">{typograph("Центр операций смарт-контракта")}</span>
              <span className="badge badge-success">Waves Type 104</span>
            </div>
            <h1 className="fw-700 mb-1" style={{ fontSize: "1.5rem" }}>
              {typograph("Управление бизнес-процессами экспортного производства")}
            </h1>
            <p className="mono-data text-sm text-muted">
              Contract: {contractId} · Active signer: {sender}
            </p>
          </div>
        </div>

        <div className="card mb-4" style={{ padding: "0.5rem" }}>
          <div className="tabs" role="tablist" aria-label="Разделы операций"
            onKeyDown={(event) => {
              const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
              if (!keys.includes(event.key)) return;
              event.preventDefault();
              const index = TABS.findIndex((tab) => tab.id === activeTab);
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 :
                (index + (event.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
              setActiveTab(TABS[next].id);
              event.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
            }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`operation-${tab.id}`}
                aria-controls="operation-panel"
                tabIndex={activeTab === tab.id ? 0 : -1}
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="tab"
              >
                {typograph(tab.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)", alignItems: "start" }}>
          <div role="tabpanel" id="operation-panel" aria-labelledby={`operation-${activeTab}`} tabIndex={0}>
            {activeTab === "accounts" && (
              <div className="stack-4">
                <RegisterOrg />
                <UpdateAccount />
                <SetActive />
              </div>
            )}
            {activeTab === "products" && (
              <div className="stack-4">
                <AddProduct />
                <ApproveProduct />
              </div>
            )}
            {activeTab === "bids" && (
              <div className="stack-4">
                <CreateBid />
                <RespondToBid />
                <ClientRespond />
              </div>
            )}
            {activeTab === "supplier" && (
              <div className="stack-4">
                <AcceptBid />
                <UpdateStage />
                <MarkDelivered />
              </div>
            )}
            {activeTab === "finalize" && (
              <div className="stack-4">
                <FinalizeDelivery />
              </div>
            )}
          </div>

          <div className="card" style={{ position: "sticky", top: "5.5rem" }}>
            <div className="flex justify-between items-center mb-3 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="mono-data text-sm fw-700">Транзакционный телетайп</div>
              <span className="diode diode-success diode-live" />
            </div>

            <p className="mono-data text-xs text-muted mb-3">
              Все вызовы смарт-контракта формируются как транзакции Type 104 (Contract Invocation) и подписываются ключевой парой отправителя.
            </p>

            {txHistory.length === 0 ? (
              <div className="panel mono-data text-xs text-center text-muted" style={{ padding: "0.75rem" }}>
                Ожидание отправки транзакций…
                <br />
                (заполните любую форму слева и нажмите «Отправить»)
              </div>
            ) : (
              <div className="stack-3" style={{ maxHeight: 420, overflowY: "auto" }}>
                {txHistory.map((tx, idx) => (
                  <div key={idx} className="panel mono-data text-xs" style={{ padding: "0.625rem" }}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="fw-700" style={{ color: "var(--primary)" }}>{tx.action}</span>
                      <span className="text-muted">{tx.timestamp}</span>
                    </div>
                    <div className="text-muted truncate mb-1">TX: {tx.txId}</div>
                    <div className="flex items-center gap-1" style={{ color: "var(--success)" }}>
                      <CheckIcon size={12} /> Блок подтверждён · комиссия {tx.fee} WAVES
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Function;
