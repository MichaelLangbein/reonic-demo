import './FormStep.css';

import { ReactNode } from 'react';

export default function FormStep(props: { children: ReactNode; title: string }) {
  return (
    <div className="formStep">
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}
