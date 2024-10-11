import { useWatchState } from "../utils/state";
import CFGauge from "./CFGauge";
import FadeSpinner from "./FadeSpinner";


export default function Events() {
  const events = useWatchState((s) => s.output?.chargingEvents, 'charging-events');
  return (
    <FadeSpinner spinning={events === undefined}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5>Concurrency</h5>
          <CFGauge></CFGauge>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5>Charging events (total)</h5>
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'end' }}>Year</td>
                <td style={{ fontWeight: 'bold' }}>{Math.floor(events?.year || 0)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>Month</td>
                <td style={{ fontWeight: 'bold' }}>{Math.floor(events?.month || 0)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>Week</td>
                <td style={{ fontWeight: 'bold' }}>{Math.floor(events?.week || 0)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>Day</td>
                <td style={{ fontWeight: 'bold' }}>{Math.floor(events?.day || 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </FadeSpinner>
  );
}
