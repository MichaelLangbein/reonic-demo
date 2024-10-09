import { ReactNode } from 'react';

import Close from '../svgs/Close';

export default function Modal(props: { children: ReactNode; onCloseClick: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#2222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
      onClick={() => props.onCloseClick()}
    >
      <div
        style={{
          background: 'white',
          outline: '1px solid gray',
          borderRadius: '0.5rem',
          padding: '0.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <div onClick={() => props.onCloseClick()}>
            <Close></Close>
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
}
