import React from 'react';

/**
 * EmptyConveyorArt — Industrial Vector Graphic for Empty State (Rule У1).
 * Represents an empty automated industrial roller conveyor waiting for the next production batch.
 */
export default function EmptyConveyorArt({ width = 160, height = 120, className = '' }) {
  return (
    <svg
      viewBox="0 0 160 120"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Линия ожидает поступления партии"
    >
      <defs>
        <linearGradient id="emptyConveyorGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Guide Rails */}
      <rect x="20" y="30" width="120" height="12" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <rect x="20" y="75" width="120" height="12" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1" />

      {/* Roller Bearings */}
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i} transform={`translate(${30 + i * 18}, 42)`}>
          <rect x="0" y="0" width="10" height="33" rx="2" fill="#0F172A" stroke="#475569" strokeWidth="1" />
          <line x1="5" y1="2" x2="5" y2="31" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1" />
        </g>
      ))}

      {/* Laser Guidance Marks */}
      <circle cx="80" cy="58" r="16" stroke="#38BDF8" strokeDasharray="3 3" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="60" y1="58" x2="100" y2="58" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="80" y1="38" x2="80" y2="78" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="80" cy="58" r="3" fill="#38BDF8" />

      {/* Sensor diode */}
      <circle cx="26" cy="36" r="2.5" fill="#F59E0B" />
      <circle cx="134" cy="81" r="2.5" fill="#38BDF8" />
    </svg>
  );
}
