import './App.css';

import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="fullscreen">
      <div className="header">
        <h1>Demo app</h1>
      </div>
      <div className="body">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}

export default App;
