import "../styles/Graphs.css";

import AverageDay from "./AverageDay";
import EnergyOverYear from "./EnergyOverYear";
import EnergyPerStation from "./EnergyPerStation";
import Events from "./Events";


export default function Graphs() {
  return (
    <div className="graphs">
      <div className="graph">
        <EnergyPerStation></EnergyPerStation>
      </div>
      <div className="graph">
        <EnergyOverYear></EnergyOverYear>
      </div>
      <div className="graph">
        <AverageDay></AverageDay>
      </div>
      <div className="graph">
        <Events></Events>
      </div>
    </div>
  );
}
