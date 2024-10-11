export default function Gauge(props: { size?: number; color?: string; color2?: string; angle?: number }) {
  const size = props.size || 24;
  const color = props.color || 'var(--color-secondary-1)';
  const color2 = props.color2 || '#c8c8c8';
  const angle = props.angle || 0;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M 50 70 L 80 70 C 84 59 84 59 81 45 L 50 70 Z" fill={color2}></path>
      <path d="M 20 70 L 80 70 C 100 10 0 10 20 70 Z" strokeWidth="2" stroke={color} fill="none"></path>
      <path
        transform={`rotate(${angle}, 50, 75)`}
        d="M 50 20 L 45 70 C 40 83 60 83 55 70 Z"
        strokeWidth="1"
        stroke={color}
        fill={color}
      ></path>
    </svg>
  );
}
