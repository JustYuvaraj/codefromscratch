// LinkedListIcon.jsx
export default function LinkedListIcon({ className = "w-6 h-6", stroke = "black", fill = "white" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 50"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke={stroke}
    >
      {/* Node A */}
      <rect x="0" y="10" width="30" height="30" />
      <rect x="30" y="10" width="10" height="30" />

      {/* Arrow A -> B */}
      <line x1="40" y1="25" x2="50" y2="25" strokeWidth="2" />
      <polygon points="50,22 55,25 50,28" fill={stroke} />

      {/* Node B */}
      <rect x="55" y="10" width="30" height="30" />
      <rect x="85" y="10" width="10" height="30" />

      {/* Arrow B -> C */}
      <line x1="95" y1="25" x2="105" y2="25" strokeWidth="2" />
      <polygon points="105,22 110,25 105,28" fill={stroke} />

      {/* Node C */}
      <rect x="110" y="10" width="30" height="30" />
      <rect x="140" y="10" width="10" height="30" />

      {/* Arrow C -> D */}
      <line x1="150" y1="25" x2="160" y2="25" strokeWidth="2" />
      <polygon points="160,22 165,25 160,28" fill={stroke} />

      {/* Node D */}
      <rect x="165" y="10" width="30" height="30" />
      <rect x="195" y="10" width="10" height="30" />
    </svg>
  );
}
