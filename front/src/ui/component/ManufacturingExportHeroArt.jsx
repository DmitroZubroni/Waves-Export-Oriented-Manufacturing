import React from 'react'

export default function ManufacturingExportHeroArt({ className = '', width = 360, height = 210 }) {
  return (
    <svg
      viewBox="0 0 360 210"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 ${className}`}
      role="img"
      aria-label="Waves Export-Oriented Manufacturing & Blockchain Supply Chain Blueprint"
    >
      <defs>
        {/* Glow Filters */}
        <filter id="mfgCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="mfgAmberGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="blueprintGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="containerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="steelArmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="wavesNodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>

      {/* Blueprint Technical Grid Pattern */}
      <g stroke="#38BDF8" strokeOpacity="0.08" strokeWidth="1">
        <line x1="20" y1="20" x2="340" y2="20" />
        <line x1="20" y1="60" x2="340" y2="60" />
        <line x1="20" y1="100" x2="340" y2="100" />
        <line x1="20" y1="140" x2="340" y2="140" />
        <line x1="20" y1="180" x2="340" y2="180" />
        <line x1="60" y1="10" x2="60" y2="200" />
        <line x1="120" y1="10" x2="120" y2="200" />
        <line x1="180" y1="10" x2="180" y2="200" />
        <line x1="240" y1="10" x2="240" y2="200" />
        <line x1="300" y1="10" x2="300" y2="200" />
      </g>

      {/* Main Assembly & Export Hub: Central Freight Container */}
      <g transform="translate(110, 45)">
        {/* ISO Shipping Container Blueprint */}
        <rect
          width="140"
          height="80"
          rx="8"
          fill="url(#containerGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          filter="url(#mfgCyanGlow)"
        />
        {/* Vertical Corrugated Ribs */}
        <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5">
          <line x1="16" y1="10" x2="16" y2="70" />
          <line x1="32" y1="10" x2="32" y2="70" />
          <line x1="48" y1="10" x2="48" y2="70" />
          <line x1="64" y1="10" x2="64" y2="70" />
          <line x1="80" y1="10" x2="80" y2="70" />
          <line x1="96" y1="10" x2="96" y2="70" />
          <line x1="112" y1="10" x2="112" y2="70" />
          <line x1="128" y1="10" x2="128" y2="70" />
        </g>
        {/* Corner Castings */}
        <rect x="2" y="2" width="10" height="8" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="128" y="2" width="10" height="8" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="2" y="70" width="10" height="8" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="128" y="70" width="10" height="8" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />

        {/* ISO 9001 Quality Certificate Stamp */}
        <g transform="translate(42, 24)">
          <rect width="56" height="32" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.2" />
          <text x="28" y="14" fill="#FDE68A" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ISO 9001</text>
          <text x="28" y="24" fill="#38BDF8" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="monospace">EXPORT PASS</text>
        </g>
      </g>

      {/* Automated Conveyor Line at the Bottom */}
      <g transform="translate(40, 138)">
        <rect width="280" height="14" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1" />
        {/* Rollers */}
        {Array.from({ length: 14 }).map((_, i) => (
          <circle key={i} cx={15 + i * 19} cy="7" r="4" fill="#334155" stroke="#64748B" strokeWidth="1" />
        ))}
      </g>

      {/* Precision Robotic Arm Left */}
      <g transform="translate(40, 50)">
        <rect width="36" height="14" rx="4" fill="url(#steelArmGrad)" stroke="#38BDF8" strokeWidth="1" />
        <circle cx="18" cy="7" r="4" fill="#38BDF8" />
        {/* Arm Segment 1 */}
        <path d="M18 14 L 38 48" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="38" cy="48" r="5" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
        {/* Arm Segment 2 & Gripper */}
        <path d="M38 48 L 65 65" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        <path d="M65 65 L 72 60 M 65 65 L 72 70" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Waves Blockchain Cryptographic Ledger Node on Right */}
      <g transform="translate(258, 48)">
        <rect
          width="82"
          height="82"
          rx="14"
          fill="url(#blueprintGrad)"
          stroke="#38BDF8"
          strokeWidth="1.2"
        />
        {/* Waves Diamond Logo */}
        <g transform="translate(41, 30)">
          <path d="M0 -14 L 14 0 L 0 14 L -14 0 Z" fill="url(#wavesNodeGrad)" stroke="#E0F2FE" strokeWidth="1" />
        </g>
        <text x="41" y="58" fill="#E2E8F0" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">WAVES LEDGER</text>
        <text x="41" y="68" fill="#38BDF8" fontSize="6" textAnchor="middle" fontFamily="monospace">BLOCK #3 892 104</text>
      </g>

      {/* Telemetry Status Line */}
      <g transform="translate(60, 172)">
        <rect width="240" height="24" rx="6" fill="#0F172A" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
        <circle cx="18" cy="12" r="4" fill="#10B981" filter="url(#mfgCyanGlow)" />
        <text x="32" y="16" fill="#F8FAFC" fontSize="7.5" fontWeight="bold" fontFamily="monospace">STATE: VERIFIED EXPORT PIPELINE</text>
        <text x="220" y="16" fill="#F59E0B" fontSize="7" fontWeight="bold" textAnchor="end" fontFamily="monospace">100% SMART CONTRACT</text>
      </g>
    </svg>
  )
}
