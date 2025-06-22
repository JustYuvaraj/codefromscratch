// ArrayIcon.jsx
export default function ArrayIcon() {
  return (
    <svg
      className="w-6 h-6" // or w-5 h-5 depending on size you want
      viewBox="0 0 160 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="40" height="40" stroke="currentColor" strokeWidth="6" fill="none" rx="6" />
      <rect x="40" y="0" width="40" height="40" stroke="currentColor" strokeWidth="6" fill="none" rx="6" />
      <rect x="80" y="0" width="40" height="40" stroke="currentColor" strokeWidth="6" fill="none" rx="6" />
      <rect x="120" y="0" width="40" height="40" stroke="currentColor" strokeWidth="6" fill="none" rx="6" />
    </svg>
  );
}
