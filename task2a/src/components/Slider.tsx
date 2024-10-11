import "../styles/Slider.css";

import { useState } from "react";

import { useTypeAhead } from "../utils/async";


export function Slider(props: {
  defaultVal: number;
  min: number;
  max: number;
  stepSize: number;
  label: string;
  callback: (value: number) => void;
}) {
  const [val, setVal] = useState(props.defaultVal);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          fontSize: 'xx-large',
          fontWeight: 'bolder',
        }}
      >
        {val} {props.label}
      </div>
      <input
        style={{ width: '6rem' }}
        type="range"
        name=""
        id=""
        defaultValue={props.defaultVal}
        min={props.min}
        max={props.max}
        step={props.stepSize}
        onChange={(v) => {
          const newVal = +v.target.value;
          setVal(newVal);
          props.callback(newVal);
        }}
      />
    </div>
  );
}

export default function TahSlider(props: {
  defaultVal: number;
  min: number;
  max: number;
  stepSize: number;
  label: string;
  notificationDelayMs: number;
  callback: (value: number) => void;
}) {
  const tah = useTypeAhead<number>(props.notificationDelayMs, (q) => {
    const last = q.pop();
    if (last) props.callback(last);
    return [];
  });
  return (
    <Slider
      callback={(v) => tah.enqueue(v)}
      defaultVal={props.defaultVal}
      min={props.min}
      max={props.max}
      stepSize={props.stepSize}
      label={props.label}
    ></Slider>
  );
}
