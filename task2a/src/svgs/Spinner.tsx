import "./Spinner.css";


export default function Spinner(props: { size?: number; color?: string }) {
  const size = props.size || 24;
  const color = props.color || 'var(--color-secondary-1)';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect className="spinner_GmWz" x="1" y="4" width="6" height="14" fill={color} />
      <rect className="spinner_GmWz spinner_NuDr" x="9" y="4" width="6" height="14" fill={color} />
      <rect className="spinner_GmWz spinner_OlQ0" x="17" y="4" width="6" height="14" fill={color} />
    </svg>
  );
}
