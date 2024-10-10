import "../styles/Form.css";

import Car from "../svgs/Car";
import Dice from "../svgs/Dice";
import Refuel from "../svgs/Refuel";
import { notifyStateMgmt, useWatchState } from "../utils/state";
import ChargePointForm from "./ChargePointForm";
import FormStep from "./FormStep";
import IntInput from "./IntInput";
import TahSlider from "./Slider";


export default function Form() {
  const state = useWatchState((s) => s.input, 'input-form');

  return (
    <div className="form">
      <FormStep title="Charge points" icon={<Refuel color="white" size={30}></Refuel>}>
        <ChargePointForm></ChargePointForm>
      </FormStep>

      <FormStep title="Arrival multiplier" icon={<Dice color="white" size={30}></Dice>}>
        <TahSlider
          label="%"
          min={20}
          max={200}
          stepSize={10}
          defaultVal={state.arrivalProbabilityMultiplier}
          notificationDelayMs={500}
          callback={(newProb) =>
            notifyStateMgmt({ type: 'form-submit', payload: { arrivalProbabilityMultiplier: newProb } })
          }
        ></TahSlider>
      </FormStep>

      <FormStep title="Car consumption" icon={<Car color="white" size={30}></Car>}>
        <IntInput
          label=<div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <div>kWh</div>
            <div style={{ fontSize: 'small' }}>/100km</div>
          </div>
          val={state.carConsumption}
          onChange={(newVal) => notifyStateMgmt({ type: 'form-submit', payload: { carConsumption: newVal } })}
        ></IntInput>
      </FormStep>
    </div>
  );
}
