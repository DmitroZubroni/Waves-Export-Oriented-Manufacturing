/**
 * mockData.js — ISO 9001 Technical Industrial Mock Dataset for Waves Export Manufacturing.
 * Used for reliable offline testing and demonstrations without launching heavy Docker containers.
 */

export const DEFAULT_ORGANIZATIONS = [
  {
    orgWallet: "3PMfgWavesExpMain2026RU",
    name: "АО «Северный Криомаш Экспорт»",
    userRole: "MANUFACTURER",
    orgType: "Криогенное и промышленное машиностроение",
    region: "RU-LED (Северо-Западный промышленный кластер)",
    description: "Производство криогенной арматуры, фланцевых затворов и сосудов высокого давления. Сертификат соответствия ISO 9001:2015 №RU-9001-88421.",
    contact: "export@cryomash-nord.ru / +7 (812) 555-01-92",
    position: "Директор по внешнеэкономической деятельности",
    fullName: "Громов Виктор Васильевич",
    active: true,
    isoCertified: true,
    accreditationDate: "2024-03-15",
  },
  {
    orgWallet: "3PLogisticsEuroTrans2026EU",
    name: "ООО «ЕвроТрансЛогистик»",
    userRole: "CARRIER",
    orgType: "Международный мультимодальный экспедитор",
    region: "RU-SPB / DE-HAM (Балтийский экспортный коридор)",
    description: "Морские фидерные и интермодальные контейнерные перевозки. Лицензия таможенного перевозчика AEO №TC-88912/2025.",
    contact: "transit@eurotrans-log.eu / +7 (812) 449-33-10",
    position: "Главный диспетчер Балтийского флота",
    fullName: "Бергман Артур Эдуардович",
    active: true,
    isoCertified: true,
    accreditationDate: "2023-11-20",
  },
  {
    orgWallet: "3PQualityTUVInspector2026QA",
    name: "Инспекционный Центр «ТехноКонтроль ISO»",
    userRole: "INSPECTOR",
    orgType: "Аккредитованная испытательная лаборатория",
    region: "RU-SPB / Международная аккредитация ILAC-MRA",
    description: "Аттестация лабораторий неразрушающего контроля, спектральный анализ сталей, аудит производственных процессов ISO 9001.",
    contact: "lab@technocontrol-iso.org / +7 (812) 710-84-40",
    position: "Ведущий эксперт-аудитор систем качества",
    fullName: "Соколова Марина Игоревна",
    active: true,
    isoCertified: true,
    accreditationDate: "2022-09-01",
  },
  {
    orgWallet: "3PClientNordicEngineeringDK",
    name: "Nordic Power Systems ApS",
    userRole: "CLIENT",
    orgType: "Энергетический инжиниринг и газовые терминалы",
    region: "DK-CPH (Копенгаген, Дания)",
    description: "Генеральный подрядчик модернизации морских терминалов сжиженного газа в акватории Северного моря. VAT DK-39281920.",
    contact: "procurement@nordicpower.dk / +45 32 88 19 00",
    position: "Head of Global Offshore Procurement",
    fullName: "Lars Mikkelsen",
    active: true,
    isoCertified: true,
    accreditationDate: "2024-01-10",
  },
];

export const DEFAULT_PRODUCTS = [
  {
    id: "PRODS_VALVE_CRYO_DN200_01",
    key: "PRODS_VALVE_CRYO_DN200_01",
    name: "Криогенный запорный клапан высокого давления DN200 PN40",
    category: "Трубопроводная арматура для СПГ",
    standard: "ISO 9001:2015 / ГОСТ 33259-2015",
    material: "Аустенитная нержавеющая сталь 08Х18Н10Т (AISI 316L)",
    serialBatch: "BATCH-2026-CRYO-094",
    quantity: 120,
    unit: "шт.",
    weightNetto: "4 320 кг",
    containerId: "WVEU-492011-8 (20ft OpenTop)",
    qualityCertificate: "QC-ISO9001-RU-2026-4412",
    approved: true,
    approvedBy: "3PQualityTUVInspector2026QA",
    approvalDate: "2026-11-12T14:30:00Z",
    creator: "3PMfgWavesExpMain2026RU",
    status: "APPROVED_FOR_EXPORT",
    specHash: "b58_4uQBFq9vKzL7pW9mR2x1y8s5q7z4a9b2c3d4e5f6g7h8",
    description: "Клапаны криогенные полнопроходные для работы при температуре до -196 °C и давлении до 4,0 МПа. Проведены гидроиспытания 100% изделий.",
  },
  {
    id: "PRODS_CNC_TURBO_CONTROLLER_02",
    key: "PRODS_CNC_TURBO_CONTROLLER_02",
    name: "Модуль ЧПУ прецизионного управления 5-осевыми центрами",
    category: "Промышленная автоматика и приводы",
    standard: "ISO 9001:2015 / CE Directive 2006/42/EC",
    material: "Анодированный алюминий 6061-T6 + оптический тракт",
    serialBatch: "BATCH-2026-CNC-118",
    quantity: 45,
    unit: "компл.",
    weightNetto: "380 кг",
    containerId: "WVEU-119402-3 (IP68 Sealed)",
    qualityCertificate: "QC-ISO9001-RU-2026-5190",
    approved: true,
    approvedBy: "3PQualityTUVInspector2026QA",
    approvalDate: "2026-11-14T09:15:00Z",
    creator: "3PMfgWavesExpMain2026RU",
    status: "APPROVED_FOR_EXPORT",
    specHash: "b58_3mNKP18wQvY4xL2aB7c8d9e0f1g2h3j4k5m6n7p8q9r",
    description: "Электронные блоки управления станками с субмикронной точностью позиционирования. Тестирование на вибростенде пройдено без замечаний.",
  },
  {
    id: "PRODS_OPTICAL_PRESSURE_SENSOR_03",
    key: "PRODS_OPTICAL_PRESSURE_SENSOR_03",
    name: "Волоконно-оптический датчик давления 0-250 бар",
    category: "Прецизионная метрология",
    standard: "ISO/IEC 17025 / ISO 9001:2015",
    material: "Сапфировая мембрана + титановый корпус Grade 5",
    serialBatch: "BATCH-2026-SENS-302",
    quantity: 500,
    unit: "шт.",
    weightNetto: "65 кг",
    containerId: "WVEU-883012-1 (Antistatic)",
    qualityCertificate: "Ожидает протокола испытаний лаборатории",
    approved: false,
    approvedBy: null,
    approvalDate: null,
    creator: "3PMfgWavesExpMain2026RU",
    status: "PENDING_QA_LAB",
    specHash: "b58_9xLQW71mZc8bN2vK4p6y0t3r5e7w9q1u3i5o7p9a1s3",
    description: "Датчики давления для взрывоопасных производств. Отсутствие электрических цепей в зоне измерения. Проводятся термоциклические испытания.",
  },
];

export const DEFAULT_BIDS = [
  {
    id: "BIDS_EXP_2026_001",
    key: "BIDS_EXP_2026_001",
    title: "Экспортная поставка партии криогенных клапанов в порт Роттердам",
    productId: "PRODS_VALVE_CRYO_DN200_01",
    clientWallet: "3PClientNordicEngineeringDK",
    supplierWallet: "3PMfgWavesExpMain2026RU",
    carrierWallet: "3PLogisticsEuroTrans2026EU",
    incoterms: "CIF Rotterdam (Incoterms 2020)",
    quantity: 120,
    pricePerUnit: "1 208 WAVES",
    totalEscrow: "145 000 WAVES",
    currentStage: "SEA_FREIGHT",
    stageProgress: 75,
    stages: [
      { name: "Регистрация экспортного контракта", done: true, date: "2026-11-05" },
      { name: "Лабораторная проверка качества ISO 9001", done: true, date: "2026-11-08" },
      { name: "Таможенное декларирование и экспортная пошлина", done: true, date: "2026-11-11" },
      { name: "Погрузка на морское судно 'Baltic Leader'", done: true, date: "2026-11-14" },
      { name: "Морской переход в порт Роттердам", done: false, active: true },
      { name: "Приемка импортером и разблокировка эскроу", done: false },
    ],
    customsDeclarationNumber: "10216170/111126/0091823",
    billOfLading: "BOL-BLTC-2026-88190",
    vesselName: "M/V Baltic Leader (IMO 9482103)",
    status: "IN_TRANSIT",
  },
  {
    id: "BIDS_EXP_2026_002",
    key: "BIDS_EXP_2026_002",
    title: "Поставка промышленных контроллеров ЧПУ для Гамбургского кластера",
    productId: "PRODS_CNC_TURBO_CONTROLLER_02",
    clientWallet: "3PClientNordicEngineeringDK",
    supplierWallet: "3PMfgWavesExpMain2026RU",
    carrierWallet: "3PLogisticsEuroTrans2026EU",
    incoterms: "DAP Hamburg",
    quantity: 45,
    pricePerUnit: "2 188 WAVES",
    totalEscrow: "98 500 WAVES",
    currentStage: "CUSTOMS_CLEARANCE",
    stageProgress: 50,
    stages: [
      { name: "Регистрация экспортного контракта", done: true, date: "2026-11-10" },
      { name: "Лабораторная проверка качества ISO 9001", done: true, date: "2026-11-13" },
      { name: "Таможенная очистка на пограничном терминале", done: false, active: true },
      { name: "Автотранспортный транзит до склада покупателя", done: false },
      { name: "Финальная приемка и закрытие контракта", done: false },
    ],
    customsDeclarationNumber: "10216170/141126/0010924",
    status: "CUSTOMS_HOLD",
  },
  {
    id: "BIDS_EXP_2026_003",
    key: "BIDS_EXP_2026_003",
    title: "Партия оптических датчиков давления для испытательного стенда",
    productId: "PRODS_OPTICAL_PRESSURE_SENSOR_03",
    clientWallet: "3PClientNordicEngineeringDK",
    supplierWallet: "3PMfgWavesExpMain2026RU",
    carrierWallet: "3PLogisticsEuroTrans2026EU",
    incoterms: "FOB St. Petersburg",
    quantity: 500,
    pricePerUnit: "84 WAVES",
    totalEscrow: "42 000 WAVES",
    currentStage: "QA_VERIFICATION",
    stageProgress: 25,
    stages: [
      { name: "Подача экспортной заявки покупателем", done: true, date: "2026-11-15" },
      { name: "Лабораторная проверка качества ISO 9001", done: false, active: true },
      { name: "Экспортное таможенное оформление", done: false },
      { name: "Передача товара на борт в морском порту", done: false },
    ],
    status: "PENDING_QA",
  },
];

/**
 * Builds standard Waves Enterprise key-value contract state entries from the mock model.
 */
export function buildContractStateEntries(orgs, prods, bids) {
  const entries = [
    {
      key: "CONTRACT_META_PROTOCOL",
      type: "string",
      value: JSON.stringify({
        protocol: "Waves-Export-Oriented-Manufacturing",
        version: "2.4.0-Enterprise",
        standard: "ISO-9001-2015-COMPLIANT",
        hashAlgorithm: "Blake2b256 + WavesSignature",
        lastAudit: "2026-11-16T18:00:00Z",
      }),
    },
    {
      key: "ADMIN_ROOT_VALIDATOR",
      type: "string",
      value: "3PMfgWavesExpMain2026RU",
    },
  ];

  // Organizations
  orgs.forEach((org) => {
    entries.push({
      key: `ORG_${org.orgWallet}_INFO`,
      type: "string",
      value: JSON.stringify(org),
    });
    entries.push({
      key: `USER_${org.orgWallet}_ROLE`,
      type: "string",
      value: org.userRole,
    });
  });

  // Products
  prods.forEach((prod) => {
    entries.push({
      key: prod.key || prod.id,
      type: "string",
      value: JSON.stringify(prod),
    });
  });

  // Bids
  bids.forEach((bid) => {
    entries.push({
      key: bid.key || bid.id,
      type: "string",
      value: JSON.stringify(bid),
    });
    entries.push({
      key: `STAGE_${bid.id}`,
      type: "string",
      value: JSON.stringify({
        stage: bid.currentStage,
        progress: bid.stageProgress,
        status: bid.status,
      }),
    });
  });

  return entries;
}
