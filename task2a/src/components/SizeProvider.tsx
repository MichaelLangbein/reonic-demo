import { ReactNode, useEffect, useRef } from 'react';

export default function SizeProvider(props: {
  children: ReactNode;
  sizeCallback: (width: number, height: number) => void;
  onResize?: boolean;
}) {
  const { onResize, children, sizeCallback } = props;
  const ref = useRef<HTMLDivElement>(null);
  const callCallback = () => {
    if (ref.current) {
      sizeCallback(ref.current.clientWidth, ref.current.clientHeight);
    }
  };
  useEffect(callCallback, [ref.current]);
  return (
    <div ref={ref} onResize={() => (onResize ? callCallback() : '')}>
      {children}
    </div>
  );
}
