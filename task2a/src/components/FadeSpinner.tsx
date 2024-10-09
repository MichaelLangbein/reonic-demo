import "./Appearing.css";

import { ReactNode } from "react";

import Spinner from "../svgs/Spinner";


export default function FadeSpinner(props: { children: ReactNode; spinning: boolean }) {
  return (
    <div>
      <div className={'fadable' + props.spinning ? '' : ' fadeOutTwoWay'}>
        <Spinner size={50} color="white"></Spinner>
      </div>
      <div className={'fadable' + props.spinning ? ' fadeOut' : ''}>{props.children}</div>
    </div>
  );
}
