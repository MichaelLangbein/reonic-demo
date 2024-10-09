export default function Refuel(props: { size?: number; color?: string }) {
  const size = props.size || 24;
  const color = props.color || 'var(--color-secondary-1)';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M16 22V15M3 22V18M3 14V8C3 5.17157 3 3.75736 3.87868 2.87868C4.75736 2 6.17157 2 9 2H10C12.8284 2 14.2426 2 15.1213 2.87868C16 3.75736 16 5.17157 16 8V11"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{' '}
        <path
          d="M9.5 10L8 12.5H11L9.5 15"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path d="M17 22H2" stroke={color} strokeWidth="1.5" strokeLinecap="round"></path>{' '}
        <path
          d="M19.5 4L20.7331 4.98647C20.8709 5.09673 20.9398 5.15186 21.0025 5.20805C21.5937 5.73807 21.9508 6.48086 21.9953 7.27364C22 7.35769 22 7.44594 22 7.62244V18.5C22 19.3284 21.3284 20 20.5 20C19.6716 20 19 19.3284 19 18.5V18.4286C19 17.6396 18.3604 17 17.5714 17H16"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{' '}
        <path
          d="M22 8H20.5C19.6716 8 19 8.67157 19 9.5V11.9189C19 12.5645 19.4131 13.1377 20.0257 13.3419L22 14"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{' '}
      </g>
    </svg>
  );
}
