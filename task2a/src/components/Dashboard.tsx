import './Dashboard.css';

import Form from './Form';
import Graphs from './Graphs';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Form></Form>
      <Graphs></Graphs>
    </div>
  );
}
