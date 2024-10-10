import { useState } from 'react';

import Close from '../svgs/Close';
import { notifyStateMgmt, useWatchState } from '../utils/state';
import ChargePointsShow from './ChargePointsShow';
import Modal from './Modal';

function ChargePointEditor(props: {
  count: number;
  power: number;
  allPowers: number[];
  onChange: (count: number, power: number, errors: string[]) => void;
  onRemove: () => void;
  onError: (error: string) => void;
}) {
  const [currentCount, setCurrentCount] = useState<number>(props.count);
  const [currentPower, setCurrentPower] = useState<number>(props.power);
  const [countError, setCountError] = useState<string>();
  const [powerError, setPowerError] = useState<string>();
  const [duplicateError, setDuplicateError] = useState<string>();

  const validate = (count: number, power: number) => {
    setCurrentCount(count);
    setCurrentPower(power);
    if (count <= 0) {
      setCountError('There must be at least one station');
      props.onError(countError!);
      return;
    } else {
      setCountError(undefined);
    }
    if (power <= 0) {
      setPowerError('Power must be at least 1 kW');
      props.onError(powerError!);
      return;
    } else {
      setPowerError(undefined);
    }
    if (power in props.allPowers) {
      setDuplicateError(`A station with power ${power} kW already exists.`);
      props.onError(duplicateError!);
      return;
    } else {
      setDuplicateError(undefined);
    }

    props.onChange(currentCount, currentPower);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
        <div>
          <input
            type="number"
            name=""
            id=""
            defaultValue={props.count}
            onChange={(evt) => validate(+evt.currentTarget.value, currentPower)}
          />
        </div>
        <div>x</div>
        <div>
          <input
            type="number"
            name=""
            id=""
            defaultValue={props.power}
            onChange={(evt) => validate(currentCount, +evt.currentTarget.value)}
          />
        </div>
        <div>kW</div>
        <div onClick={props.onRemove}>
          <Close></Close>
        </div>
      </div>
      <p>{countError}</p>
      <p>{powerError}</p>
      <p>{duplicateError}</p>
    </div>
  );
}

function AddChargePoint(props: { onClick: () => void }) {
  return <button onClick={props.onClick}>Add</button>;
}

export default function ChargePointForm() {
  const [showModal, setShowModal] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const currentChargePoints = useWatchState((s) => s.input.nrChargePoints, 'charge-point-edit-form');
  const [proposedNewChargePoints, setProposedNewChargePoints] = useState(currentChargePoints);

  const chargePointEdited = (i: number, count: number, power: number) => {
    setProposedNewChargePoints((old) => {
      old[i] = { count, power };
      return old;
    });
  };

  const chargePointRemoved = (i: number) => {
    setProposedNewChargePoints((old) => old.splice(i, 1));
  };

  const chargePointAdded = () => {
    setProposedNewChargePoints((old) => [...old, { count: 0, power: 0 }]);
  };

  const updateChargePoints = () => {
    notifyStateMgmt({ type: 'form-submit', payload: { nrChargePoints: proposedNewChargePoints } });
    setShowModal(false);
  };

  const cancelUpdate = () => {
    setProposedNewChargePoints(currentChargePoints);
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
                  allPowers={proposedNewChargePoints.map((p) => p.power).splice(i, 1)}
                  onChange={(c, p) => chargePointEdited(i, c, p)}
                  onRemove={() => chargePointRemoved(i)}
                  onError={(err: string) => setErrorCount((count) => count + 1)}
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
