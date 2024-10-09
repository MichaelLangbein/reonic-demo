import './Appearing.css';

import { VegaLite } from 'react-vega';

import { useWatchState } from '../utils/state';

export default function AverageDay() {
  const averageDay = useWatchState((s) => s.output?.averageDay, 'time-series');
  const animation = averageDay ? '' : ' fadeOut';

  let data: { time: number; mean: number; min: number; max: number }[] = Array(24)
    .fill(0)
    .map((v, i) => ({ time: i + 1, mean: 0, min: 0, max: 0 }));
  if (averageDay) {
    data = averageDay.map((d) => ({ time: d.time, mean: d.mean, min: d.min, max: d.max }));
  }

  return (
    <div className={'fadable' + animation}>
      <VegaLite
        spec={{
          // width: 'container',
          encoding: {
            x: { field: 'time', title: 'Time of day' },
          },
          layer: [
            {
              mark: {
                opacity: 0.3,
                type: 'area',
                ariaRoleDescription: 'errorband',
                style: 'errorband-band',
              },
              encoding: {
                y: { field: 'min', type: 'quantitative' },
                y2: { field: 'max', type: 'quantitative' },
              },
            },
            {
              mark: 'line',
              encoding: {
                y: {
                  field: 'mean',
                  type: 'quantitative',
                  title: 'Average power demand',
                },
              },
            },
          ],
          data: { values: data },
        }}
      ></VegaLite>
    </div>
  );
}
