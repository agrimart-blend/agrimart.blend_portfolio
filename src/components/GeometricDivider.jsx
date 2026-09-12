export default function GeometricDivider({ flip = false }) {
  return (
    <div className={`geo-divider${flip ? " geo-divider-flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          points="0,20 120,2 360,38 600,4 840,36 1080,6 1320,34 1440,20"
          fill="none"
          stroke="rgba(126,184,247,0.12)"
          strokeWidth="1"
        />
        <polyline
          points="0,20 180,36 420,4 660,38 900,2 1140,36 1380,8 1440,20"
          fill="none"
          stroke="rgba(177,158,239,0.08)"
          strokeWidth="1"
        />
        {[120, 360, 600, 840, 1080, 1320].map(x => (
          <rect key={x} x={x - 3} y={17} width={6} height={6}
            fill="rgba(126,184,247,0.25)" transform={`rotate(45 ${x} 20)`} />
        ))}
      </svg>
    </div>
  );
}
