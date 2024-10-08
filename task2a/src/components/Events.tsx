import { useWatchState } from '../utils/state';

export default function Events() {
  const events = useWatchState((s) => s.output?.nrEvents, 'events');
  return <div>Events: {events}</div>;
}
