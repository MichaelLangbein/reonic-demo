import { useState } from 'react';

import Close from '../svgs/Close';
import { notifyStateMgmt, useWatchState } from '../utils/state';
import ChargePointsShow from './ChargePointsShow';
import Modal from './Modal';

/**
 * Stateless!
 * Only serves to pass user input back to parent form.
 */
function ChargePointEditor(props: {
  count: number;
  power: number;
  errors: string[];
  onChange: (count: number, power: number, errors: string[]) => void;
  onRemove: () => void;
}) {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
        <div>
          <input
            type="number"
            name=""
            id=""
            defaultValue={props.count}
            onChange={(evt) => props.onChange(+evt.currentTarget.value, props.power, props.errors)}
          />
        </div>
        <div>x</div>
        <div>
          <input
            type="number"
            name=""
            id=""
            defaultValue={props.power}
            onChange={(evt) => props.onChange(props.count, +evt.currentTarget.value, props.errors)}
          />
        </div>
        <div>kW</div>
        <div onClick={props.onRemove}>
          <Close></Close>
        </div>
      </div>
      <div
        style={{
          fontSize: 'small',
          color: 'red',
        }}
      >
        {props.errors.map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>
    </div>
  );
}

function AddChargePoint(props: { onClick: () => void }) {
  return <button onClick={props.onClick}>Add</button>;
}

export default function ChargePointForm() {
  const [showModal, setShowModal] = useState(false);
  const currentChargePoints = useWatchState((s) => s.input.nrChargePoints, 'charge-point-edit-form');
  const [proposedNewChargePoints, setProposedNewChargePoints] = useState<
    { count: number; power: number; errors: string[] }[]
  >(currentChargePoints.map((cp) => ({ ...cp, errors: [] })));

  const errorCount = proposedNewChargePoints.map((cp) => cp.errors).reduce((prev, curr) => prev + curr.length, 0);

  const validate = (i: number, count: number, power: number) => {
    const errors: string[] = [];
    if (count <= 0) errors.push('There must be at least one station');
    if (power <= 0) errors.push('Power must be at least 1 kW');
    const allPowers = proposedNewChargePoints.map((cp) => cp.power);
    allPowers.splice(i, 1);
    if (power in allPowers) errors.push(`There is already a charge point with power ${power} kW`);
    return errors;
  };

  const chargePointEdited = (i: number, count: number, power: number) => {
    const errors = validate(i, count, power);
    setProposedNewChargePoints((old) => {
      old[i] = { count, power, errors };
      return [...old];
    });
  };

  const chargePointRemoved = (i: number) => {
    setProposedNewChargePoints((old) => {
      const newArr = [...old];
      newArr.splice(i, 1);
      return newArr;
    });
  };

  const chargePointAdded = () => {
    setProposedNewChargePoints((old) => [...old, { count: 1, power: 10, errors: [] }]);
  };

  const updateChargePoints = () => {
    notifyStateMgmt({ type: 'form-submit', payload: { nrChargePoints: proposedNewChargePoints } });
    setShowModal(false);
  };

  const cancelUpdate = () => {
    setShowModal(false);
  };

  return (
    <>
      <ChargePointsShow></ChargePointsShow>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal>
          <div>
            <div>
              {proposedNewChargePoints.map((cp, i) => (
                <ChargePointEditor
                  key={i}
                  count={cp.count}
                  power={cp.power}
                  errors={cp.errors}
                  onChange={(c, p) => chargePointEdited(i, c, p)}
                  onRemove={() => chargePointRemoved(i)}
                ></ChargePointEditor>
              ))}
              <AddChargePoint onClick={chargePointAdded}></AddChargePoint>
            </div>

            <button onClick={updateChargePoints} disabled={errorCount > 0}>
              OK
            </button>
            <button onClick={cancelUpdate}>Cancel</button>
          </div>
        </Modal>
      )}
    </>
  );
}
