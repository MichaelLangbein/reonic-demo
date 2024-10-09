import './Appearing.css';

import { useState } from 'react';
import { VegaLite } from 'react-vega';

import { useWatchState } from '../utils/state';

export default function EnergyPerStation() {
  const energyPerStation = useWatchState((s) => s.output?.energyPerStation, 'energy-per-station');
  const [aggregationLevel, setAggregationLevel] = useState<'year' | 'month' | 'week' | 'day'>('year');
  const animation = energyPerStation ? '' : ' fadeOut';

  const graphData: { stationNr: number; energy: number }[] = [];
  if (energyPerStation) {
    for (const [stationNr, stationData] of Object.entries(energyPerStation)) {
      graphData.push({ stationNr: +stationNr, energy: stationData[aggregationLevel] });
    }
  }

  return (
    <div>
      <select name="" id="" onChange={(evt) => setAggregationLevel(evt.target.value as any)}>
        {['day', 'week', 'month', 'year'].map((aggrLevel) => (
          <option value={aggrLevel} selected={aggrLevel === aggregationLevel}>
            {aggrLevel}
          </option>
        ))}
      </select>
      <div className={'fadable' + animation}>
        <VegaLite
          spec={{
            //   width: 'container',
            mark: 'bar',
            encoding: {
              x: { field: 'stationNr', title: 'Charging point' },
              y: { field: 'energy', type: 'quantitative' },
              y2: { value: 0 },
            },
            data: { values: graphData },
          }}
        ></VegaLite>
      </div>
    </div>
  );
}
