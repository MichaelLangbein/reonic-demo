import './Form.css';

import FormStep from './FormStep';

export default function Form() {
  return (
    <div className="form">
      <FormStep title="Charge points">
        <form action="">
          <div>
            <label htmlFor="nrChargePoints">Charge points</label>
            <input type="number" name="nrChargePoints" id="nrChargePoints" />
          </div>
        </form>
      </FormStep>

      <FormStep title="Arrival multiplier">
        <form action="">
          <div>
            <label htmlFor="arrivalMultiplier">Arrival multiplier</label>
            <input type="number" name="arrivalMultiplier" id="arrivalMultiplier" />
          </div>
        </form>
      </FormStep>

      <FormStep title="Car consumption">
        <form action="">
          <div>
            <label htmlFor="carConsumption">Car consumption</label>
            <input type="number" name="carConsumption" id="carConsumption" />
          </div>
        </form>
      </FormStep>

      <FormStep title="Charging power">
        <form action="">
          <div>
            <label htmlFor="chargingPower">Charging power</label>
            <input type="number" name="chargingPower" id="chargingPower" />
          </div>
        </form>
      </FormStep>
    </div>
  );
}
