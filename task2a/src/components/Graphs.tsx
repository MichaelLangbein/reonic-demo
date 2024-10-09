import '../styles/Graphs.css';

import AverageDay from './AverageDay';
import EnergyOverYear from './EnergyOverYear';
import EnergyPerStation from './EnergyPerStation';
import Events from './Events';
import GraphContainer from './GraphContainer';

export default function Graphs() {
  return (
    <div className="graphs">
      <GraphContainer title="Energy per station">
        <EnergyPerStation></EnergyPerStation>
      </GraphContainer>
      <GraphContainer title="Energy over year">
        <EnergyOverYear></EnergyOverYear>
      </GraphContainer>
      <GraphContainer title="Average day">
        <AverageDay></AverageDay>
      </GraphContainer>
      <GraphContainer title="Carging events (total)">
        <Events></Events>
      </GraphContainer>
    </div>
  );
}
