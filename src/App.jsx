import 'purecss/build/pure.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Start from './Start';

function App() {
  const apiServer = 'http://localhost:8888';

  return (
    <div>
      <Routes>
        <Route path="/start/:token" element={<Start apiServer={apiServer}/>} />
      </Routes>
    </div>
  );
}

export default App;
