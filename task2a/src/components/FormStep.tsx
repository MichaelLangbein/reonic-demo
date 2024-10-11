import "../styles/Outlines.css";

import { ReactNode } from "react";


export default function FormStep(props: { children: ReactNode; title: string; icon?: ReactNode }) {
  return (
    <div className="boxed">
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
        {props.icon}
        <h4>{props.title}</h4>
      </div>
      <div className="insetLeft">{props.children}</div>
    </div>
  );
}
