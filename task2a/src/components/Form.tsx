import '../styles/Form.css';

import { useState } from 'react';

import Car from '../svgs/Car';
import Charger from '../svgs/Charger';
import Dice from '../svgs/Dice';
import Refuel from '../svgs/Refuel';
import { InputState, notifyStateMgmt, useWatchState } from '../utils/state';
import FormStep from './FormStep';
import IntInput from './IntInput';
import Modal from './Modal';

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
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="form">
      <FormStep title="Charge points" icon={<Refuel color="white" size={30}></Refuel>}>
        <StateForm id="nrChargePoints" label="Charge points"></StateForm>
      </FormStep>

      <FormStep title="Arrival multiplier" icon={<Dice color="white" size={30}></Dice>}>
        <StateForm id="arrivalProbabilityMultiplier" label="Arrival probability"></StateForm>
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

      <FormStep title="Charging power" icon={<Charger color="white" size={30}></Charger>}>
        <IntInput
          label="kW"
          val={state.chargingPower}
          onChange={(newVal) => notifyStateMgmt({ type: 'form-submit', payload: { chargingPower: newVal } })}
        ></IntInput>
      </FormStep>

      {showModal && <Modal onCloseClick={() => setShowModal(false)}>some modal content</Modal>}
    </div>
  );
}
