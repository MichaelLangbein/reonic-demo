export default function Gauge(props: { size?: number; color?: string }) {
  const size = props.size || 24;
  const color = props.color || 'var(--color-secondary-1)';

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M3.83093 10.2178C3.29764 11.3677 3 12.6491 3 14C3 15.4685 3.3517 16.8548 3.97547 18.0794C4.27839 18.6741 4.91613 19 5.5835 19H18.4165C19.0839 19 19.7216 18.6741 20.0245 18.0794C20.6483 16.8548 21 15.4685 21 14C21 9.02944 16.9706 5 12 5C10.6769 5 9.42046 5.28551 8.28897 5.79829M11.2929 13.293C11.6834 12.9025 12.3166 12.9025 12.7071 13.293C13.0976 13.6835 13.0976 14.3167 12.7071 14.7072C12.3166 15.0978 11.6834 15.0978 11.2929 14.7072C10.9024 14.3167 10.9024 13.6835 11.2929 13.293ZM11.2929 13.293L4.92893 6.92905"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{' '}
      </g>
    </svg>
  );
}
