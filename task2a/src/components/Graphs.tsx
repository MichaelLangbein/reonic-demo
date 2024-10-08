import './Graphs.css';

import Events from './Events';
import TimeSeries from './TimeSeries';

export default function Graphs() {
  return (
    <div className="graphs">
      <div className="graph"></div>
      <div className="graph"></div>
      <div className="graph">
        <TimeSeries></TimeSeries>
      </div>
      <div className="graph">
        <Events></Events>
      </div>
    </div>
  );
}
