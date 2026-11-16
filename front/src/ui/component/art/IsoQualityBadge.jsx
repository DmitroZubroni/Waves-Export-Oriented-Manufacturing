import React from 'react';

/**
 * IsoQualityBadge — Studio «Калибр» ISO 9001:2015 Vector Quality Seal.
 */
export default function IsoQualityBadge({ width = 72, height = 72, className = '' }) {
  return (
    <svg
      viewBox="0 0 72 72"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Сертификат ISO 9001:2015"
    >
      <defs>
        <linearGradient id="badgeAmberGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Outer Gear / Seal Rim */}
      <circle cx="36" cy="36" r="33" fill="#0F172A" stroke="url(#badgeAmberGrad)" strokeWidth="2" />
      <circle cx="36" cy="36" r="28" fill="none" stroke="#FDE68A" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* ISO Quality Star Accent */}
      <circle cx="36" cy="14" r="1.5" fill="#F59E0B" />
      <circle cx="36" cy="58" r="1.5" fill="#F59E0B" />
      <circle cx="14" cy="36" r="1.5" fill="#F59E0B" />
      <circle cx="58" cy="36" r="1.5" fill="#F59E0B" />

      {/* Central Typography */}
      <text
        x="36"
        y="32"
        fill="#FDE68A"
        fontSize="9"
        fontWeight="bold"
        fontFamily="monospace"
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        ISO 9001
      </text>
      <text
        x="36"
        y="42"
        fill="#38BDF8"
        fontSize="5"
        fontWeight="bold"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        QUALITY QA
      </text>
      <text
        x="36"
        y="50"
        fill="#94A3B8"
        fontSize="4"
        fontFamily="monospace"
        textAnchor="middle"
      >
        EXPORT PASS
      </text>
    </svg>
  );
}
