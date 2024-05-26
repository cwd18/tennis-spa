import 'purecss/build/pure.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Start from './Start';
import AdminView from './AdminView';
import UserView from './UserView';
import OwnerView from './OwnerView';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/start/:token" element={<Start />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/user/:seriesid/:userid" element={<UserView />} />
        <Route path="/owner/:seriesid" element={<OwnerView />} />
      </Routes>
    </div>
  );
}

export default App;
