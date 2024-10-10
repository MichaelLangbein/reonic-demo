import '../styles/Form.css';

import { useState } from 'react';

import Car from '../svgs/Car';
import Dice from '../svgs/Dice';
import Refuel from '../svgs/Refuel';
import { InputState, notifyStateMgmt, useWatchState } from '../utils/state';
import ChargePointsShow from './ChargePointsShow';
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
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="form">
      <FormStep title="Charge points" icon={<Refuel color="white" size={30}></Refuel>}>
        <ChargePointsShow></ChargePointsShow>
        <button onClick={() => setShowModal(true)}>Edit</button>
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

      {showModal && <Modal onCloseClick={() => setShowModal(false)}>some modal content</Modal>}
    </div>
  );
}
