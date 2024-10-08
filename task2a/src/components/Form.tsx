import './Form.css';

import { InputState, notifyStateMgmt, useWatchState } from '../utils/state';
import FormStep from './FormStep';

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
  return (
    <div className="form">
      <FormStep title="Charge points">
        <StateForm id="nrChargePoints" label="Charge points"></StateForm>
      </FormStep>

      <FormStep title="Arrival multiplier">
        <StateForm id="arrivalProbabilityMultiplier" label="Arrival probability"></StateForm>
      </FormStep>

      <FormStep title="Car consumption">
        <StateForm id="carConsumption" label="Car consumption"></StateForm>
      </FormStep>

      <FormStep title="Charging power">
        <StateForm id="chargingPower" label="Charging power"></StateForm>
      </FormStep>
    </div>
  );
}
