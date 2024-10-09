import "./Form.css";

import { InputState, notifyStateMgmt, useWatchState } from "../utils/state";
import FormStep from "./FormStep";
import IntInput from "./IntInput";


function StateForm(props: { id: keyof InputState; label: string }) {
  const state = useWatchState((s) => s.input[props.id], 'form_' + props.id);

  return (
    <form>
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type="number"
          name={props.id}
          id={props.id}
          defaultValue={state}
          onChange={(evt) => notifyStateMgmt({ type: 'form-submit', payload: { [props.id]: +evt.target.value } })}
        />
      </div>
    </form>
  );
}

export default function Form() {
  const state = useWatchState((s) => s.input, 'input-form');

  return (
    <div className="form">
      <FormStep title="Charge points">
        <StateForm id="nrChargePoints" label="Charge points"></StateForm>
      </FormStep>

      <FormStep title="Arrival multiplier">
        <StateForm id="arrivalProbabilityMultiplier" label="Arrival probability"></StateForm>
      </FormStep>

      <FormStep title="Car consumption">
        <IntInput
          label="kW"
          val={state.carConsumption}
          onChange={(newVal) => notifyStateMgmt({ type: 'form-submit', payload: { carConsumption: newVal } })}
        ></IntInput>
      </FormStep>

      <FormStep title="Charging power">
        <IntInput
          label="kW"
          val={state.chargingPower}
          onChange={(newVal) => notifyStateMgmt({ type: 'form-submit', payload: { chargingPower: newVal } })}
        ></IntInput>
      </FormStep>
    </div>
  );
}
