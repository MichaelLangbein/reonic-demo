import './Appearing.css';

import { useWatchState } from '../utils/state';

export default function Events() {
  const events = useWatchState((s) => s.output?.chargingEvents, 'charging-events');
  const className = events ? '' : ' fadeOut';
  return <div className={'fadable' + className}>Events: {Math.floor(events?.year || 0)}</div>;
}
