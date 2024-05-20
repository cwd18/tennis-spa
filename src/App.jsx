import 'purecss/build/pure.css';
import './App.css';
import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Start from './Start';
import AdminView from './AdminView';
import UserView from './UserView';

function App() {
  useEffect(() => {
    if (!window.location.hostname.includes('localhost')) {
      // If not localhost, assume we are running on Google Cloud
      globalData.apiServer = 'https://direct-terminal-412715.nw.r.appspot.com/';
    }
  }, []);
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
