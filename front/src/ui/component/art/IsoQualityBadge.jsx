/** An engraved inspection plate, sized to the existing quality-mark slot. */
export default function IsoQualityBadge({ width = 72, height = 72, className = '' }) {
  return (
    <svg viewBox="0 0 72 72" width={width} height={height} fill="none" className={className} role="img" aria-label="Сертификат ISO 9001:2015">
      <path d="M8 5h56l3 3v56l-3 3H8l-3-3V8Z" fill="#13263a" stroke="#d7ac53" strokeWidth="1.5" />
      <path d="M12 10h48M12 62h48M10 12v48M62 12v48" stroke="#627b90" strokeWidth=".7" />
      {[12,60].flatMap(x => [12,60].map(y => <path key={`${x}-${y}`} d={`M${x-1} ${y-1}l2 2m0-2-2 2`} stroke="#d7ac53" strokeWidth="1" />))}
      <path d="M25 19h22v8H25zM29 17v12m14-12v12M31 23l3 3 7-7" stroke="#d7ac53" strokeWidth="1.3" />
      <text x="36" y="40" fill="#f4d58d" fontSize="10" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">ISO 9001</text>
      <path d="M17 46h38" stroke="#627b90" />
      <text x="36" y="55" fill="#c9deec" fontSize="6" fontFamily="sans-serif" textAnchor="middle">2015 / QA</text>
    </svg>
  );
}
