import '../styles/Appearing.css';

import { useState } from 'react';

import { useWatchState } from '../utils/state';
import FadeSpinner from './FadeSpinner';
import StandardVega from './StandardVega';

export default function EnergyPerStation() {
  const energyPerStation = useWatchState((s) => s.output?.energyPerStation, 'energy-per-station');
  const [aggregationLevel, setAggregationLevel] = useState<'year' | 'month' | 'week' | 'day'>('year');

  const graphData: { stationNr: number; energy: number }[] = [];
  if (energyPerStation) {
    for (const [stationNr, stationData] of Object.entries(energyPerStation)) {
      graphData.push({ stationNr: +stationNr, energy: stationData[aggregationLevel] });
    }
  }

  return (
    <FadeSpinner spinning={energyPerStation === undefined}>
      <div>
        {/* <select
          name=""
          id=""
          defaultValue={aggregationLevel}
          onChange={(evt) => setAggregationLevel(evt.target.value as any)}
        >
          {['day', 'week', 'month', 'year'].map((aggrLevel) => (
            <option key={aggrLevel} value={aggrLevel}>
              {aggrLevel}
            </option>
          ))}
        </select> */}
        <StandardVega
          spec={{
            mark: 'bar',
            encoding: {
              x: { field: 'stationNr', title: 'Charging point' },
              y: { field: 'energy', type: 'quantitative' },
              y2: { value: 0 },
            },
            data: { values: graphData },
          }}
        ></StandardVega>
      </div>
    </FadeSpinner>
  );
}
