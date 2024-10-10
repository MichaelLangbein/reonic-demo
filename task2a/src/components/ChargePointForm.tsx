import { useState } from "react";

import Close from "../svgs/Close";
import { ChargePointDatum, notifyStateMgmt, useWatchState } from "../utils/state";
import ChargePointsShow from "./ChargePointsShow";
import Modal from "./Modal";


function arrayExcept<T>(arr: T[], indx: number) {
  const clone = [...arr];
  clone.splice(indx, 1);
  return clone;
}

const validate = (i: number, count: number, power: number, allPowers: number[]) => {
  const errors: string[] = [];
  if (count <= 0) errors.push('There must be at least one station');
  if (power <= 0) errors.push('Power must be at least 1 kW');
  const allOtherPowers = arrayExcept(allPowers, i);
  if (allOtherPowers.includes(power)) errors.push(`There is already a charge point with power ${power} kW`);
  return errors;
};

const validateAll = (arr: ProposedChargePointDatum[]): ProposedChargePointDatum[] => {
  const newArr: ProposedChargePointDatum[] = [];
  const allPowers = arr.map((d) => d.power);
  for (let i = 0; i < arr.length; i++) {
    const datum = arr[i];
    const errors = validate(i, datum.count, datum.power, allPowers);
    newArr.push({ ...datum, errors });
  }
  return newArr;
};

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

/**
 * Stateless!
 * Only serves to pass user input back to parent form.
 */
function AddChargePoint(props: { onClick: () => void }) {
  return <button onClick={props.onClick}>Add</button>;
}

interface ProposedChargePointDatum extends ChargePointDatum {
  errors: string[];
}

/**
 * Parent form.
 * Does all validation and commits changes to state-mgmt.
 */
export default function ChargePointForm() {
  const currentChargePoints2ProposedChargePoints = (current: ChargePointDatum[]): ProposedChargePointDatum[] => {
    const proposed = current.map((cp) => ({ ...cp, errors: [] }));
    return proposed;
  };
  const proposed2state = (proposed: ProposedChargePointDatum[]): ChargePointDatum[] => {
    return proposed.map((p) => ({ count: p.count, power: p.power }));
  };

  const [showModal, setShowModal] = useState(false);
  const currentChargePoints = useWatchState((s) => s.input.nrChargePoints, 'charge-point-edit-form');
  const [proposedNewChargePoints, setProposedNewChargePoints] = useState(
    currentChargePoints2ProposedChargePoints(currentChargePoints)
  );

  const errorCount = proposedNewChargePoints.map((cp) => cp.errors).reduce((prev, curr) => prev + curr.length, 0);

  const chargePointEdited = (i: number, count: number, power: number) => {
    setProposedNewChargePoints((old) => {
      old[i] = { count, power, errors: [] };
      const newArr = validateAll(old);
      return newArr;
    });
  };

  const chargePointRemoved = (i: number) => {
    setProposedNewChargePoints((old) => {
      const newArr = [...old];
      newArr.splice(i, 1);
      const newArrValidated = validateAll(newArr);
      return newArrValidated;
    });
  };

  const chargePointAdded = () => {
    setProposedNewChargePoints((old) => {
      const maxPower = Math.max(...old.map((o) => o.power));
      return [...old, { count: 1, power: maxPower + 1, errors: [] }];
    });
  };

  const updateChargePoints = () => {
    if (errorCount > 0) return;
    notifyStateMgmt({ type: 'form-submit', payload: { nrChargePoints: proposed2state(proposedNewChargePoints) } });
    setShowModal(false);
  };

  const cancelUpdate = () => {
    setProposedNewChargePoints(currentChargePoints2ProposedChargePoints(currentChargePoints));
    setShowModal(false);
  };
  return (
    <>
      <ChargePointsShow chargePoints={currentChargePoints}></ChargePointsShow>
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
