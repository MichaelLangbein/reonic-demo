export default function Charger(props: { size?: number; color?: string }) {
  const size = props.size || 24;
  const color = props.color || 'var(--color-secondary-1)';

  return (
    <svg width={size} height={size} viewBox="0 -0.5 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.34298 9.22205C7.03511 11.179 7.26924 13.7832 8.90518 15.4755C10.5411 17.1678 13.1359 17.4899 15.136 16.2491C15.184 16.2191 15.2316 16.1884 15.279 16.1571C16.9386 15.0477 17.7793 13.0574 17.4176 11.0942C17.0558 9.13099 15.561 7.57107 13.615 7.12605L13.475 7.10005C11.4926 6.70503 9.46747 7.54241 8.34298 9.22205Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 15.889C19.5 17.6072 18.1072 19 16.389 19H8.611C6.89284 19 5.5 17.6072 5.5 15.889V8.111C5.5 6.39284 6.89284 5 8.611 5H16.389C18.1072 5 19.5 6.39284 19.5 8.111V15.889Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
        <path
          d="M9.75 12.5C9.75 12.9142 10.0858 13.25 10.5 13.25C10.9142 13.25 11.25 12.9142 11.25 12.5H9.75ZM11.25 11.5C11.25 11.0858 10.9142 10.75 10.5 10.75C10.0858 10.75 9.75 11.0858 9.75 11.5H11.25ZM13.75 12.5C13.75 12.9142 14.0858 13.25 14.5 13.25C14.9142 13.25 15.25 12.9142 15.25 12.5H13.75ZM15.25 11.5C15.25 11.0858 14.9142 10.75 14.5 10.75C14.0858 10.75 13.75 11.0858 13.75 11.5H15.25ZM11.25 12.5V11.5H9.75V12.5H11.25ZM15.25 12.5V11.5H13.75V12.5H15.25Z"
          fill={color}
        ></path>{' '}
      </g>
    </svg>
  );
}
