import './Appearing.css';

import { VegaLite } from 'react-vega';

import { useWatchState } from '../utils/state';

export default function TimeSeries() {
  const averageDay = useWatchState((s) => s.output?.averageDay, 'time-series');

  let data: { t: number; v: number }[] = [];
  if (averageDay) {
    data = averageDay.map((d) => ({ t: d.time, v: d.mean }));
  }

  const animation = data.length > 0 ? '' : ' fadeOut';

  return (
    <div className={'fadeable' + animation}>
      <VegaLite
        spec={{
          mark: 'line',
          encoding: {
            x: { field: 't' },
            y: { field: 'v' },
          },
          data,
        }}
        width={400}
        height={400}
      ></VegaLite>
    </div>
  );
}
