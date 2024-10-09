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
          mark: 'line',
          encoding: {
            x: { field: 'month', title: 'Month' },
            y: { field: 'sum', type: 'quantitative' },
          },
          data: { values: aggregatedData },
        }}
      ></StandardVega>
    </FadeSpinner>
  );
}
