import React from 'react';

/**
 * ManufacturingExportHeroArt — Studio «Калибр» Technical Industrial Master Artwork.
 * Illustrates automated export manufacturing, container logistics, optical QA verification,
 * and Waves Enterprise cryptographic blockchain consensus.
 */
export default function ManufacturingExportHeroArt({
  className = '',
  width = '100%',
  height = 'auto',
}) {
  return (
    <svg
      viewBox="0 0 540 320"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mfg-hero-art ${className}`}
      role="img"
      aria-label="Waves Export Manufacturing: ISO 9001 Blockchain Supply Chain Blueprint"
      style={{ filter: 'drop-shadow(0 16px 36px rgba(0, 0, 0, 0.75))' }}
    >
      <defs>
        {/* Glow Filters */}
        <filter id="heroCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="heroAmberGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="laserBeamGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="containerGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="steelGantryGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        <linearGradient id="wavesNodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>

        <linearGradient id="isoSealGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient id="laserLineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>

        {/* Pattern: Blueprint Drafting Grid */}
        <pattern id="blueprintGridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeOpacity="0.08" />
        </pattern>
      </defs>

      {/* Blueprint Canvas Background */}
      <rect width="540" height="320" rx="16" fill="#090D16" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
      <rect width="540" height="320" rx="16" fill="url(#blueprintGridPattern)" />

      {/* Industrial High-Bay Steel Racks (Left Background) */}
      <g stroke="#334155" strokeWidth="1.5">
        <line x1="40" y1="50" x2="40" y2="260" />
        <line x1="90" y1="50" x2="90" y2="260" />
        <line x1="140" y1="50" x2="140" y2="260" />
        {/* Horizontal Tier Shelves */}
        <line x1="30" y1="80" x2="150" y2="80" />
        <line x1="30" y1="130" x2="150" y2="130" />
        <line x1="30" y1="180" x2="150" y2="180" />
        <line x1="30" y1="230" x2="150" y2="230" />
        {/* Cross Bracing */}
        <line x1="40" y1="80" x2="90" y2="130" stroke="#1E293B" strokeWidth="1" />
        <line x1="90" y1="80" x2="40" y2="130" stroke="#1E293B" strokeWidth="1" />
        <line x1="90" y1="130" x2="140" y2="180" stroke="#1E293B" strokeWidth="1" />
        <line x1="140" y1="130" x2="90" y2="180" stroke="#1E293B" strokeWidth="1" />
      </g>

      {/* Stored Pallet Batches on Racks */}
      <g fill="#1E293B" stroke="#475569" strokeWidth="1">
        <rect x="48" y="100" width="34" height="24" rx="3" />
        <rect x="98" y="100" width="34" height="24" rx="3" fill="#0F172A" />
        <rect x="48" y="150" width="34" height="24" rx="3" fill="#0284C7" fillOpacity="0.4" stroke="#38BDF8" strokeOpacity="0.6" />
        <rect x="98" y="150" width="34" height="24" rx="3" />
        <rect x="48" y="200" width="34" height="24" rx="3" />
        <rect x="98" y="200" width="34" height="24" rx="3" fill="#0284C7" fillOpacity="0.3" />
      </g>

      {/* Heavy Gantry Crane Rail & Overhead Bridge */}
      <g>
        <line x1="30" y1="44" x2="510" y2="44" stroke="#64748B" strokeWidth="4" />
        <line x1="30" y1="48" x2="510" y2="48" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1" />

        {/* Traveling Trolley with Hoist Cables */}
        <g transform="translate(260, 36)">
          <rect x="-24" y="0" width="48" height="16" rx="4" fill="url(#steelGantryGrad)" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="-14" cy="8" r="3" fill="#F59E0B" />
          <circle cx="14" cy="8" r="3" fill="#10B981" />
          {/* Steel Wire Ropes */}
          <line x1="-12" y1="16" x2="-12" y2="60" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="12" y1="16" x2="12" y2="60" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Spreader Frame for ISO Container */}
          <rect x="-30" y="60" width="60" height="8" rx="2" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
        </g>
      </g>

      {/* Main ISO 9001 Intermodal Export Shipping Container */}
      <g transform="translate(190, 110)">
        {/* Main Body with Cyan Drop Glow */}
        <rect
          width="190"
          height="105"
          rx="10"
          fill="url(#containerGrad1)"
          stroke="#38BDF8"
          strokeWidth="2"
          filter="url(#heroCyanGlow)"
        />
        {/* Corrugated Vertical Steel Ribs */}
        <g stroke="rgba(255, 255, 255, 0.16)" strokeWidth="2">
          <line x1="20" y1="14" x2="20" y2="92" />
          <line x1="38" y1="14" x2="38" y2="92" />
          <line x1="56" y1="14" x2="56" y2="92" />
          <line x1="74" y1="14" x2="74" y2="92" />
          <line x1="92" y1="14" x2="92" y2="92" />
          <line x1="110" y1="14" x2="110" y2="92" />
          <line x1="128" y1="14" x2="128" y2="92" />
          <line x1="146" y1="14" x2="146" y2="92" />
          <line x1="164" y1="14" x2="164" y2="92" />
        </g>

        {/* Heavy Corner Castings */}
        <rect x="4" y="4" width="12" height="10" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="174" y="4" width="12" height="10" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="4" y="91" width="12" height="10" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />
        <rect x="174" y="91" width="12" height="10" rx="2" fill="#0369A1" stroke="#38BDF8" strokeWidth="1" />

        {/* Laser Barcode & Cryptographic Hash Stamp Plate */}
        <g transform="translate(48, 28)">
          <rect width="94" height="48" rx="6" fill="#090D16" stroke="#38BDF8" strokeOpacity="0.5" strokeWidth="1.2" />
          {/* Barcode Lines */}
          <g fill="#38BDF8">
            <rect x="10" y="8" width="2" height="18" />
            <rect x="14" y="8" width="4" height="18" />
            <rect x="21" y="8" width="1.5" height="18" />
            <rect x="25" y="8" width="3" height="18" />
            <rect x="31" y="8" width="2" height="18" />
            <rect x="36" y="8" width="5" height="18" />
            <rect x="44" y="8" width="1.5" height="18" />
            <rect x="48" y="8" width="3" height="18" />
            <rect x="54" y="8" width="4" height="18" />
            <rect x="61" y="8" width="2" height="18" />
            <rect x="66" y="8" width="4" height="18" />
            <rect x="73" y="8" width="1.5" height="18" />
            <rect x="78" y="8" width="3" height="18" />
          </g>
          {/* Monospace Hash Identification */}
          <text x="47" y="38" fill="#94A3B8" fontSize="6.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.05em">
            WVEU-492011-8 [ISO 9001]
          </text>
        </g>

        {/* Optical Scanning Laser Line */}
        <line x1="42" y1="46" x2="148" y2="46" stroke="#38BDF8" strokeWidth="1.5" filter="url(#laserBeamGlow)" />
        <circle cx="95" cy="46" r="3.5" fill="#38BDF8" filter="url(#laserBeamGlow)" />
      </g>

      {/* ISO 9001 Official Gold Quality Assurance Medallion */}
      <g transform="translate(405, 75)" filter="url(#heroAmberGlow)">
        <polygon
          points="35,0 45,10 60,10 65,25 78,32 75,47 82,60 72,70 72,85 58,90 50,102 35,98 22,105 14,92 0,86 2,71 -7,58 0,44 -3,29 10,22 13,8 27,8"
          fill="url(#isoSealGrad)"
          stroke="#FDE68A"
          strokeWidth="1.5"
        />
        <circle cx="35" cy="50" r="28" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="35" y="42" fill="#FDE68A" fontSize="9" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="0.05em">
          ISO 9001
        </text>
        <text x="35" y="54" fill="#38BDF8" fontSize="6" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
          QUALITY CERTIFIED
        </text>
        <text x="35" y="64" fill="#94A3B8" fontSize="5" fontFamily="monospace" textAnchor="middle">
          EXPORT PASS
        </text>
      </g>

      {/* Waves Blockchain Distributed Ledger Node (Right Side) */}
      <g transform="translate(415, 195)">
        {/* Isometric Cube / Blockchain Block */}
        <polygon points="40,10 75,30 40,50 5,30" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
        <polygon points="5,30 40,50 40,88 5,68" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <polygon points="40,50 75,30 75,68 40,88" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />

        {/* Waves Emblem on Top Face */}
        <polygon points="40,18 56,29 40,40 24,29" fill="#38BDF8" opacity="0.8" />

        {/* Pulsating Block Height Tag */}
        <rect x="-10" y="94" width="100" height="20" rx="4" fill="#0F172A" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1" />
        <circle cx="0" cy="104" r="3" fill="#10B981" />
        <text x="45" y="108" fill="#E2E8F0" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
          BLOCK #4,892,401
        </text>
      </g>

      {/* Precision Ground Conveyor Track & Heavy Rollers */}
      <g transform="translate(40, 260)">
        {/* Steel Track Base */}
        <rect width="460" height="18" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />
        {/* Roller Bearing Set */}
        {Array.from({ length: 22 }).map((_, i) => (
          <g key={i} transform={`translate(${14 + i * 20}, 4)`}>
            <circle cx="5" cy="5" r="4.5" fill="#334155" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="5" cy="5" r="1.5" fill="#38BDF8" />
          </g>
        ))}
      </g>

      {/* Laser Guidance Telemetry Line */}
      <line x1="50" y1="288" x2="490" y2="288" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.4" />
      <text x="270" y="306" fill="#64748B" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">
        AUTOMATED EXPORT LOGISTICS // WAVES ENTERPRISE PROTOCOL // ISO 9001:2015
      </text>
    </svg>
  );
}
