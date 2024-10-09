export default function Dice(props: { size?: number; color?: string }) {
  const size = props.size || 24;
  const color = props.color || 'var(--color-secondary-1)';

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 0H0V10H10V0ZM3 4C3.55228 4 4 3.55228 4 3C4 2.44772 3.55228 2 3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4ZM8 7C8 7.55228 7.55228 8 7 8C6.44772 8 6 7.55228 6 7C6 6.44772 6.44772 6 7 6C7.55228 6 8 6.44772 8 7Z"
          fill={color}
        ></path>{' '}
        <path d="M6 16V12H12V6H16V16H6Z" fill={color}></path>{' '}
      </g>
    </svg>
  );
}
