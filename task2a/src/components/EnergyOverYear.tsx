import '../styles/Appearing.css';

import { useWatchState } from '../utils/state';
import FadeSpinner from './FadeSpinner';
import StandardVega from './StandardVega';

function dateFromDay(year: number, day: number) {
  // https://stackoverflow.com/questions/4048688/how-can-i-convert-day-of-year-to-date-in-javascript
  const date = new Date(year, 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
}

export default function EnergyOverYear() {
  const energyOverYear = useWatchState((s) => s.output?.totalEnergyCharged, 'energy-over-year');

  const aggregatedData = Array(12)
    .fill(0)
    .map((_, i) => ({ month: i + 1, sum: 0, date: new Date(2024, i, 1) }));

  if (energyOverYear) {
    for (const datum of energyOverYear) {
      const date = dateFromDay(2024, datum.day);
      const month = date.getMonth() + 1;
      aggregatedData[month - 1].sum += datum.kWh;
    }
  }

  return (
    <FadeSpinner spinning={energyOverYear === undefined}>
      <StandardVega
        spec={{
          encoding: {
            x: {
              field: 'date',
              title: 'Month',
              axis: { labelFontSize: 12, titleFontSize: 16 },
              type: 'temporal',
              timeUnit: 'month',
            },
            y: {
              field: 'sum',
              title: 'Energy total [kWh]',
              type: 'quantitative',
              axis: { labelFontSize: 12, titleFontSize: 16 },
            },
          },
          layer: [
            {
              mark: { type: 'line' },
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
                color: { condition: { param: 'picked', empty: false, value: 'darkblue' }, value: 'lightblue' },
              },
            },
          ],
          data: { values: aggregatedData },
        }}
      ></StandardVega>
    </FadeSpinner>
  );
}
