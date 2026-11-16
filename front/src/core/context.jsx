import { createContext, useState, useEffect, useCallback } from "react";
import {
  DEFAULT_ORGANIZATIONS,
  DEFAULT_PRODUCTS,
  DEFAULT_BIDS,
  buildContractStateEntries,
} from "./mockData.js";

const AtlantContext = createContext({});

const TESTNET_NODE_URL = "https://nodes-testnet.wavesnodes.com";
const DEFAULT_CONTRACT_ID = "9z4wX6e8a1Y2b3C4d5E6F7g8H9j0K1L2m3N4p5Q6r7S";
const DEFAULT_SENDER = "3PMfgWavesExpMain2026RU";

export const AppProvider = ({ children }) => {
  // Mode: "demo" (ISO 9001 Mock Ledger), "testnet" (Public Waves Nodes), "custom" (Local/Custom REST)
  const [networkMode, setNetworkMode] = useState("demo");
  const [url, setUrl] = useState("6882");
  const [sender, setSender] = useState(DEFAULT_SENDER);
  const [keypairPassword, setKeypairPassword] = useState("export-secret-2026");
  const [contractId, setContractId] = useState(DEFAULT_CONTRACT_ID);
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Core Ledger State
  const [organizations, setOrganizations] = useState(DEFAULT_ORGANIZATIONS);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [bids, setBids] = useState(DEFAULT_BIDS);
  const [blockchainState, setBlockchainState] = useState(() =>
    buildContractStateEntries(DEFAULT_ORGANIZATIONS, DEFAULT_PRODUCTS, DEFAULT_BIDS)
  );

  const [blockHeight, setBlockHeight] = useState(4892401);
  const [txHistory, setTxHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Toast Management
  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, timestamp: new Date(), ...toast }]);
    setTimeout(() => {
      removeToast(id);
    }, 6500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync blockchainState whenever orgs, prods, or bids update in demo mode
  useEffect(() => {
    if (networkMode === "demo") {
      setBlockchainState(buildContractStateEntries(organizations, products, bids));
    }
  }, [organizations, products, bids, networkMode]);

  // If switched to Testnet, try fetching live block height and state
  useEffect(() => {
    if (networkMode === "testnet") {
      fetch(`${TESTNET_NODE_URL}/blocks/height`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.height) {
            setBlockHeight(data.height);
          }
        })
        .catch(() => {
          // Fallback gracefully without throwing unhandled error
        });
    }
  }, [networkMode]);

  const login = ({
    url: newUrl,
    sender: newSender,
    password: newPassword,
    contractId: newContractId,
    mode: newMode,
  }) => {
    if (newUrl) setUrl(newUrl);
    if (newSender) setSender(newSender);
    if (newPassword) setKeypairPassword(newPassword);
    if (newContractId) setContractId(newContractId);
    if (newMode) setNetworkMode(newMode);
    setIsAuthorized(true);

    addToast({
      tone: "success",
      title: "Авторизация подтверждена",
      message: `Контрагент ${newSender ? newSender.slice(0, 10) + "..." : ""} успешно подключен к узлу.`,
    });
  };

  const logout = async () => {
    setIsAuthorized(false);
    setSender("");
    setKeypairPassword("");
    addToast({
      tone: "info",
      title: "Сессия завершена",
      message: "Вы вышли из учетной записи контрагента.",
    });
  };

  const resetDemoData = () => {
    setOrganizations(DEFAULT_ORGANIZATIONS);
    setProducts(DEFAULT_PRODUCTS);
    setBids(DEFAULT_BIDS);
    setBlockchainState(
      buildContractStateEntries(DEFAULT_ORGANIZATIONS, DEFAULT_PRODUCTS, DEFAULT_BIDS)
    );
    setBlockHeight((h) => h + 1);
    addToast({
      tone: "info",
      title: "Реестр восстановлен",
      message: "Эталонные данные ISO 9001 успешно перезагружены.",
    });
  };

  /**
   * Universal Post / SignAndBroadcast method (Type 104 Contract Invocation)
   */
  const post = async (params) => {
    // Generate realistic Base58 transaction hash
    const fakeTxId = "b58_" + Array.from({ length: 44 }, () =>
      "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[
        Math.floor(Math.random() * 58)
      ]
    ).join("");

    if (networkMode === "demo") {
      // Simulate fast network latency
      await new Promise((resolve) => setTimeout(resolve, 400));

      const actionParam = params.find((p) => p.key === "action")?.value;
      const getParam = (key) => params.find((p) => p.key === key)?.value;

      if (actionParam === "registerOrg") {
        const newOrg = {
          orgWallet: getParam("orgWallet") || `3PUser${Math.floor(Math.random() * 9999)}`,
          name: getParam("name") || "Новая организация",
          orgType: getParam("orgType") || "Производство",
          region: getParam("region") || "RU-EXPORT",
          description: getParam("description") || "Зарегистрированный участник цепи поставок",
          fullName: getParam("fullName") || "Представитель",
          contact: getParam("contact") || "office@company.com",
          position: getParam("position") || "Специалист",
          userRole: getParam("userRole") || "SUPPLIER",
          active: true,
          isoCertified: true,
          accreditationDate: new Date().toISOString().split("T")[0],
        };
        setOrganizations((prev) => [newOrg, ...prev]);
      } else if (actionParam === "addProduct") {
        const prodId =
          getParam("productId") ||
          `PRODS_CUSTOM_${Math.floor(Math.random() * 10000)}`;
        const newProd = {
          id: prodId,
          key: prodId,
          name: getParam("name") || "Экспортная партия продукции",
          category: getParam("category") || "Промышленное оборудование",
          standard: getParam("standard") || "ISO 9001:2015",
          material: getParam("material") || "Сталь легированная",
          serialBatch: getParam("serialBatch") || `BATCH-${Date.now().toString().slice(-6)}`,
          quantity: Number(getParam("quantity")) || 100,
          unit: getParam("unit") || "шт.",
          weightNetto: getParam("weight") || "1 500 кг",
          containerId: getParam("containerId") || "WVEU-EXPORT-01",
          qualityCertificate: getParam("certificate") || "QC-ISO-2026-PENDING",
          approved: false,
          approvedBy: null,
          creator: sender,
          status: "PENDING_QA_LAB",
          specHash: fakeTxId,
          description: getParam("description") || "Новая партия готовых изделий",
        };
        setProducts((prev) => [newProd, ...prev]);
      } else if (actionParam === "approveProduct") {
        const targetId = getParam("productId");
        setProducts((prev) =>
          prev.map((p) =>
            p.id === targetId || p.key === targetId
              ? {
                  ...p,
                  approved: true,
                  approvedBy: sender,
                  approvalDate: new Date().toISOString(),
                  status: "APPROVED_FOR_EXPORT",
                  qualityCertificate: `QC-ISO9001-VERIFIED-${Date.now().toString().slice(-4)}`,
                }
              : p
          )
        );
      } else if (actionParam === "createBid") {
        const bidId = `BIDS_EXP_2026_${Math.floor(Math.random() * 900 + 100)}`;
        const newBid = {
          id: bidId,
          key: bidId,
          title: getParam("title") || "Экспортный контракт на поставку",
          productId: getParam("productId") || "PRODS_VALVE_CRYO_DN200_01",
          clientWallet: sender,
          supplierWallet: getParam("supplierWallet") || "3PMfgWavesExpMain2026RU",
          carrierWallet: getParam("carrierWallet") || "3PLogisticsEuroTrans2026EU",
          incoterms: getParam("incoterms") || "FOB Baltic Port",
          quantity: Number(getParam("quantity")) || 50,
          pricePerUnit: getParam("price") || "1 000 WAVES",
          totalEscrow: getParam("totalEscrow") || "50 000 WAVES",
          currentStage: "PROPOSAL_CREATED",
          stageProgress: 20,
          stages: [
            { name: "Регистрация экспортного контракта", done: true, date: new Date().toISOString().split("T")[0] },
            { name: "Лабораторная проверка качества ISO 9001", done: false, active: true },
            { name: "Таможенное декларирование", done: false },
            { name: "Морская / авто логистика", done: false },
            { name: "Приемка покупателем и разблокировка эскроу", done: false },
          ],
          status: "ACTIVE",
        };
        setBids((prev) => [newBid, ...prev]);
      } else if (actionParam === "updateStage") {
        const bidId = getParam("bidId");
        const nextStage = getParam("stage");
        setBids((prev) =>
          prev.map((b) =>
            b.id === bidId || b.key === bidId
              ? {
                  ...b,
                  currentStage: nextStage,
                  stageProgress: Math.min(100, (b.stageProgress || 40) + 20),
                  status: nextStage === "DELIVERED" ? "COMPLETED" : "IN_TRANSIT",
                }
              : b
          )
        );
      } else if (actionParam === "finalizeDelivery" || actionParam === "markDelivered") {
        const bidId = getParam("bidId");
        setBids((prev) =>
          prev.map((b) =>
            b.id === bidId || b.key === bidId
              ? {
                  ...b,
                  currentStage: "FINALIZED_DELIVERY",
                  stageProgress: 100,
                  status: "COMPLETED",
                }
              : b
          )
        );
      }

      setBlockHeight((h) => h + 1);
      setTxHistory((prev) => [
        {
          txId: fakeTxId,
          type: 104,
          fee: 10,
          timestamp: new Date().toLocaleTimeString(),
          action: actionParam || "SmartContractCall",
          params,
        },
        ...prev,
      ]);

      addToast({
        tone: "success",
        title: "Транзакция подтверждена в блоке Waves",
        message: `Действие «${actionParam || "call"}» успешно включено в смарт-контракт. TX: ${fakeTxId.slice(0, 14)}...`,
        txId: fakeTxId,
      });

      return { success: true, txId: fakeTxId };
    }

    // Live Testnet or Custom Port Execution
    try {
      const endpoint =
        networkMode === "testnet"
          ? `${TESTNET_NODE_URL}/transactions/signAndBroadcast`
          : `http://localhost:${url}/transactions/signAndBroadcast`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId,
          fee: 10,
          sender,
          password: keypairPassword,
          type: 104,
          params,
          version: 2,
          contractVersion: 1,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const result = await res.json();
      addToast({
        tone: "success",
        title: "Транзакция отправлена в сеть",
        message: `ID транзакции: ${result.id ? result.id.slice(0, 16) : fakeTxId}...`,
        txId: result.id || fakeTxId,
      });
      return { success: true, result };
    } catch (err) {
      console.warn("Node execution failed, falling back to simulated transaction:", err);
      addToast({
        tone: "warning",
        title: "Внимание: Узел недоступен",
        message: `Прямое подключение к REST API (${networkMode}) не ответило. Переключитесь на «Демо-Реестр ISO 9001» для проверки.`,
      });
      return { success: false, error: err.message };
    }
  };

  const values = {
    networkMode,
    setNetworkMode,
    url,
    setUrl,
    sender,
    setSender,
    keypairPassword,
    setKeypairPassword,
    isAuthorized,
    setIsAuthorized,
    contractId,
    setContractId,
    organizations,
    setOrganizations,
    products,
    setProducts,
    bids,
    setBids,
    blockchainState,
    setBlockchainState,
    blockHeight,
    txHistory,
    toasts,
    addToast,
    removeToast,
    login,
    logout,
    post,
    resetDemoData,
  };

  return <AtlantContext.Provider value={values}>{children}</AtlantContext.Provider>;
};

export { AtlantContext };
