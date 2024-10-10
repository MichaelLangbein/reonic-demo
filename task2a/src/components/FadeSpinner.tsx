import '../styles/Appearing.css';

import { ReactNode } from 'react';

import Spinner from '../svgs/Spinner';

export default function FadeSpinner(props: { children: ReactNode; spinning: boolean }) {
  return (
    <div style={{ position: 'relative', height: '95%' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        className={'fadable' + (props.spinning ? '' : ' fadeOutTwoWay')}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Spinner size={50} color="gray"></Spinner>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        className={'fadable' + (props.spinning ? ' fadeOut' : '')}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
