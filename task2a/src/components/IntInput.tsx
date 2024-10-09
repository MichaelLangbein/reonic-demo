import "../styles/Outlines.css";

import TriangleDown from "../svgs/TriangleDown";
import TriangleUp from "../svgs/TriangleUp";


export default function IntInput(props: { val: number; label: string; onChange?: (newVal: number) => void }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <div style={{ fontSize: 'xxx-large', fontWeight: 'bolder' }}>{props.val}</div>
      <div style={{ fontSize: 'xxx-large', fontWeight: 'bolder' }}>{props.label}</div>
      <div>
        <div onClick={() => (props.onChange ? props.onChange(props.val + 1) : '')} className=".hoverDark">
          <TriangleUp size={30}></TriangleUp>
        </div>
        <div onClick={() => (props.onChange ? props.onChange(props.val - 1) : '')} className=".hoverDark">
          <TriangleDown size={30}></TriangleDown>
        </div>
      </div>
    </div>
  );
}
