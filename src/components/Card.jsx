export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-card shadow-card overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
