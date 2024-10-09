import '../styles/Outlines.css';

import { ReactNode } from 'react';

export default function FormStep(props: { children: ReactNode; title: string; icon?: ReactNode }) {
  return (
    <div className="boxed">
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
        {props.icon}
        <h3>{props.title}</h3>
      </div>
      <div style={{ paddingLeft: '3rem' }}>{props.children}</div>
    </div>
  );
}
