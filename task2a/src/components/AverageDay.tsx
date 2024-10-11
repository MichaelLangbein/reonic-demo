import { useWatchState } from '../utils/state';
import FadeSpinner from './FadeSpinner';
import StandardVega from './StandardVega';

export default function AverageDay() {
  const averageDay = useWatchState((s) => s.output?.averageDay, 'time-series');

  let data: { time: number; mean: number; min: number; max: number; date: Date }[] = Array(24)
    .fill(0)
    .map((v, i) => ({ time: i + 1, mean: 0, min: 0, max: 0, date: new Date(2024, 1, 1, i + 1, 0, 0) }));
  if (averageDay) {
    data = averageDay.map((d) => ({
      time: d.time + 1,
      mean: d.mean,
      min: d.min,
      max: d.max,
      date: new Date(2024, 1, 1, d.time + 1, 0, 0),
    }));
  }

  return (
    <FadeSpinner spinning={averageDay === undefined}>
      <StandardVega
        spec={{
          encoding: {
            x: {
              field: 'date',
              title: 'Time of day',
              axis: {
                labelFontSize: 12,
                titleFontSize: 16,
              },
              timeUnit: 'hours',
              // type: 'temporal',
            },
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
                  title: 'Power demand [kW]',
                  axis: { labelFontSize: 12, titleFontSize: 16 },
                },
              },
            },
            {
              mark: { type: 'point', tooltip: true },
              params: [
                {
                  name: 'picked',
                  select: { type: 'point', on: 'pointerover', clear: 'pointerout' },
                },
              ],
              encoding: {
                y: {
                  field: 'mean',
                  type: 'quantitative',
                },
                color: { condition: { param: 'picked', empty: false, value: 'darkblue' }, value: 'lightblue' },
              },
            },
          ],
          data: { values: data },
        }}
      ></StandardVega>
    </FadeSpinner>
  );
}
