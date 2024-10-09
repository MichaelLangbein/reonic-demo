import './Appearing.css';

import { VegaLite } from 'react-vega';

import { useWatchState } from '../utils/state';

export default function EnergyOverYear() {
  const energyOverYear = useWatchState((s) => s.output?.totalEnergyCharged, 'energy-over-year');

  const animation = energyOverYear ? '' : ' fadeOut';

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
    <div className={'fadable' + animation}>
      <VegaLite
        spec={{
          //   width: 'container',
          mark: 'line',
          encoding: {
            x: { field: 'month', title: 'Month' },
            y: { field: 'sum', type: 'quantitative' },
          },
          data: { values: aggregatedData },
        }}
      ></VegaLite>
    </div>
  );
}
