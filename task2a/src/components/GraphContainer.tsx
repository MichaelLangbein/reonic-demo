import '../styles/Graphs.css';

import { ReactNode } from 'react';

export default function GraphContainer(props: { children: ReactNode; title: string }) {
  return (
    <div className="graphContainer">
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}
