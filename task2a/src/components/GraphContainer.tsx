import '../styles/Graphs.css';

import { ReactNode } from 'react';

export default function GraphContainer(props: { children: ReactNode; title: string }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-white-1)',
        borderRadius: '0.5rem',
        border: '1px solid gray',
        padding: '0.5rem',
      }}
    >
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}
