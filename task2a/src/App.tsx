import './App.css';

import Dashboard from './components/Dashboard';
import Reonic from './svgs/Reonic';
import { notifyStateMgmt } from './utils/state';

function App() {
  notifyStateMgmt({ type: 'init' });
  return (
    <div className="fullscreen">
      <div className="header">
        <h1>Demo app</h1>
        <Reonic color="white"></Reonic>
      </div>
      <div className="body">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
