import { ReactNode } from 'react';

export default function Modal(props: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#2222',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          background: 'white',
          outline: '1px solid gray',
          borderRadius: '0.5rem',
          padding: '0.5rem',
          pointerEvents: 'all',
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
