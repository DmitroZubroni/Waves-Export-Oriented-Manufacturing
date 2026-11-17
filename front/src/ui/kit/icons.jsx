/**
 * icons.jsx — единый набор контурных иконок студии «Калибр» для проекта.
 * Один стиль (stroke, round caps, 1.75px), currentColor — подчиняется теме;
 * заменяет эмодзи-иконки и разномастные глифы (Правило О7: иконки одного набора).
 * Все иконки декоративны по умолчанию (aria-hidden) — смысл всегда дублирует текст (Ц6/Д5).
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

const Icon = ({ children, size = 18, ...props }) => (
  <svg {...base} width={size} height={size} {...props}>
    {children}
  </svg>
);

export const ChevronDownIcon = (p) => (
  <Icon {...p}><path d="M6 9l6 6 6-6" /></Icon>
);

export const CheckIcon = (p) => (
  <Icon {...p}><path d="M5 13l4 4L19 7" /></Icon>
);

export const CloseIcon = (p) => (
  <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>
);

export const AlertIcon = (p) => (
  <Icon {...p}>
    <path d="M12 9v4" />
    <path d="M12 16.5h.01" />
    <path d="M10.6 3.86 2.8 17a1.8 1.8 0 0 0 1.55 2.7h15.3A1.8 1.8 0 0 0 21.2 17L13.4 3.86a1.8 1.8 0 0 0-3.1 0Z" />
  </Icon>
);

export const InfoIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 7.5h.01" />
  </Icon>
);

export const RefreshIcon = (p) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 0 1 15.3-6.4L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15.3 6.4L3 16" />
    <path d="M3 21v-5h5" />
  </Icon>
);

export const GlobeIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13 13 0 0 1 0 18" />
    <path d="M12 3a13 13 0 0 0 0 18" />
  </Icon>
);

export const CopyIcon = (p) => (
  <Icon {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Icon>
);

export const ArrowRightIcon = (p) => (
  <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
);

export const SearchIcon = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Icon>
);

export const TableIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18" />
    <path d="M9 10v10" />
  </Icon>
);

export const GridIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </Icon>
);

export const LogoutIcon = (p) => (
  <Icon {...p}>
    <path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </Icon>
);

export const PlusIcon = (p) => (
  <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>
);

export const SunIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
  </Icon>
);

export const MoonIcon = (p) => (
  <Icon {...p}><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" /></Icon>
);

export const FactoryMarkIcon = (p) => (
  <Icon {...p}>
    <path d="M3 20V10l5 3V10l5 3V10l5 3v7" />
    <path d="M3 20h18" />
    <path d="M7 20v-3M12 20v-3M17 20v-3" />
  </Icon>
);

export const ContainerIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="7" width="18" height="11" rx="1.5" />
    <path d="M7 7v11M11 7v11M15 7v11M19 7v11" />
  </Icon>
);

export const ShipIcon = (p) => (
  <Icon {...p}>
    <path d="M4 15h16l-2 5H6l-2-5Z" />
    <path d="M6 15V7h8l3 5" />
    <path d="M9 7V4h3v3" />
  </Icon>
);

export const CertificateIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M7 9h10M7 12.5h6" />
    <circle cx="12" cy="20" r="2" />
    <path d="M10.5 18.3 9 21.5M13.5 18.3 15 21.5" />
  </Icon>
);

// Inspection caliper and approval cut, shared by the quality status.
export const InspectionIcon = (p) => (
  <Icon {...p}>
    <path d="M4 5h16M7 3v10h4V5m6-2v10h-4V5M9 19l3 3 7-8" />
  </Icon>
);
