import 'purecss/build/pure.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Start from './Start';
import AdminView from './AdminView';
import UserView from './UserView';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/newstart/:token" element={<Start />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/user/:seriesid/:userid" element={<UserView />} />
      </Routes>
    </div>
  );
}

export default App;
