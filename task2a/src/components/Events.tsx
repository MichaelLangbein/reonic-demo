import { useWatchState } from "../utils/state";
import FadeSpinner from "./FadeSpinner";


export default function Events() {
  const events = useWatchState((s) => s.output?.chargingEvents, 'charging-events');
  return (
    <FadeSpinner spinning={events === undefined}>
      {' '}
      <div>Events: {Math.floor(events?.year || 0)}</div>
    </FadeSpinner>
  );
}
