import React from 'react';

/**
 * NetworkDisconnectArt — Vector Graphic for Error State (Rule У1).
 * Illustrates an industrial radar/telemetry dish with diagnostic alert.
 */
export default function NetworkDisconnectArt({ width = 160, height = 120, className = '' }) {
  return (
    <svg
      viewBox="0 0 160 120"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ошибка узла сети блокчейна"
    >
      <defs>
        <radialGradient id="alertGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Warning Glow Circle */}
      <circle cx="80" cy="55" r="42" fill="url(#alertGlow)" />

      {/* Industrial Dish Antenna Base */}
      <path d="M 60 100 L 100 100 L 90 75 L 70 75 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      <line x1="80" y1="75" x2="80" y2="50" stroke="#64748B" strokeWidth="2.5" />

      {/* Parabolic Reflector */}
      <path
        d="M 45 42 C 60 25, 100 25, 115 42"
        fill="none"
        stroke="#F43F5E"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Feed Horn */}
      <circle cx="80" cy="36" r="4" fill="#F43F5E" />
      <line x1="80" y1="50" x2="80" y2="36" stroke="#F43F5E" strokeWidth="1.5" />

      {/* Broken Radio Waves */}
      <path d="M 68 18 C 74 12, 86 12, 92 18" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 58 10 C 70 0, 90 0, 102 10" stroke="#F43F5E" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

      {/* Disconnect Cross */}
      <circle cx="118" cy="78" r="14" fill="#0F172A" stroke="#F43F5E" strokeWidth="1.5" />
      <line x1="111" y1="71" x2="125" y2="85" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
      <line x1="125" y1="71" x2="111" y2="85" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
