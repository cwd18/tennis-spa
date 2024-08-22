import "purecss/build/pure.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import globalData from "./GlobalData";
import Start from "./Start";
import AdminView from "./AdminView";
import UserView from "./UserView";
import OwnerView from "./OwnerView";
import UserList from "./UserList";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [sessionDataFetched, setSessionDataFetched] = useState(false);
  useEffect(() => {
    // Get session data if path is not a link to start a new session
    if (currentPath.startsWith("/start/")) {
      setSessionDataFetched(true); // not really fetched but fine to render routes
      return;
    }
    fetch(globalData.apiServer + "/api/session", {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        setSessionDataFetched(true);
        globalData.role = response.sessionRole;
        globalData.name = response.sessionUser;
      });
  }, []);
  if (sessionDataFetched === false) return null;
  return (
    <div>
      <Routes>
        <Route path="/start/:token" element={<Start />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/user/:seriesid/:userid" element={<UserView />} />
        <Route path="/owner/:seriesid" element={<OwnerView />} />
        <Route path="/userlist/:fixtureid" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
zsh;
