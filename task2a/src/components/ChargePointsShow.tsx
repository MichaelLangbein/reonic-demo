import { useWatchState } from '../utils/state';

function ChargePointPill(props: { cp: { count: number; power: number } }) {
  return (
    <div>
      {props.cp.count} x {props.cp.power} kW
    </div>
  );
}

export default function ChargePointsShow() {
  const chargePoints = useWatchState((s) => s.input.nrChargePoints, 'charge-points-show');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
      {chargePoints.map((cp, i) => (
        <ChargePointPill key={i} cp={cp}></ChargePointPill>
      ))}
    </div>
  );
}
