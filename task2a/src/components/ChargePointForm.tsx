import { useState } from 'react';

import Close from '../svgs/Close';
import { notifyStateMgmt, useWatchState } from '../utils/state';
import ChargePointsShow from './ChargePointsShow';
import Modal from './Modal';

function ChargePointEditor(props: {
  count: number;
  power: number;
  onChange: (count: number, power: number) => void;
  onRemove: () => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
      <div>
        <input
          type="number"
          name=""
          id=""
          defaultValue={props.count}
          onChange={(evt) => props.onChange(+evt.currentTarget.value, props.power)}
        />
      </div>
      <div>x</div>
      <div>
        <input
          type="number"
          name=""
          id=""
          defaultValue={props.power}
          onChange={(evt) => props.onChange(props.count, +evt.currentTarget.value)}
        />
      </div>
      <div>kW</div>
      <div onClick={props.onRemove}>
        <Close></Close>
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
  const [proposedNewChargePoints, setProposedNewChargePoints] = useState(currentChargePoints);
  console.log(proposedNewChargePoints);

  const chargePointEdited = (i: number, count: number, power: number) => {
    proposedNewChargePoints[i] = { count, power };
    setProposedNewChargePoints([...proposedNewChargePoints]);
  };

  const chargePointRemoved = (i: number) => {
    proposedNewChargePoints.splice(i, 1);
    setProposedNewChargePoints([...proposedNewChargePoints]);
  };

  const chargePointAdded = () => {
    setProposedNewChargePoints([...proposedNewChargePoints, { count: 0, power: 0 }]);
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
                  onChange={(c, p) => chargePointEdited(i, c, p)}
                  onRemove={() => chargePointRemoved(i)}
                ></ChargePointEditor>
              ))}
              <AddChargePoint onClick={chargePointAdded}></AddChargePoint>
            </div>

            <button onClick={updateChargePoints}>OK</button>
            <button onClick={cancelUpdate}>Cancel</button>
          </div>
        </Modal>
      )}
    </>
  );
}
