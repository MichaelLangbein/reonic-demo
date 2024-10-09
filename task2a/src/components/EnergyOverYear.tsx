import '../styles/Appearing.css';

import { useWatchState } from '../utils/state';
import FadeSpinner from './FadeSpinner';
import StandardVega from './StandardVega';

export default function EnergyOverYear() {
  const energyOverYear = useWatchState((s) => s.output?.totalEnergyCharged, 'energy-over-year');

  const aggregatedData = Array(12)
    .fill(0)
    .map((_, i) => ({ month: i + 1, sum: 0 }));

  if (energyOverYear) {
    for (const datum of energyOverYear) {
      const month = Math.floor(datum.day / 31) + 1;
      aggregatedData[month - 1].sum += datum.kWh;
    }
  }

  return (
    <FadeSpinner spinning={energyOverYear === undefined}>
      <StandardVega
        spec={{
          encoding: {
            x: { field: 'month', title: 'Month', axis: { labelFontSize: 12, titleFontSize: 16 } },
            y: {
              field: 'sum',
              title: 'Energy total',
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
