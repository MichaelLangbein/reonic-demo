import Gauge from "../svgs/Gauge";


export default function CFGauge() {
  const concFactor = Math.random() * 33;
  const simulatedConcFactor = 33;

  const fraction = concFactor / simulatedConcFactor;
  const angle = -90 + fraction * 180;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Gauge angle={angle} color="gray" color2="#c0d5e0" size={180}></Gauge>
      <div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 'xx-large', fontWeight: 'bolder' }}>{concFactor.toFixed(1)}</div>
          <div style={{ fontSize: 'large', fontWeight: 'bolder' }}>/ {simulatedConcFactor.toFixed(1)}</div>
        </div>
        <div style={{ padding: '1rem' }}>
          <div style={{ fontSize: 'smaller' }}>concurrency factor:</div>
          <div style={{ fontSize: 'smaller' }}>your settings / simulated</div>
        </div>
      </div>
    </div>
  );
}
