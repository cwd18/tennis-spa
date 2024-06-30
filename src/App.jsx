import "purecss/build/pure.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import globalData from "./GlobalData";
import Start from "./Start";
import AdminView from "./AdminView";
import UserView from "./UserView";
import OwnerView from "./OwnerView";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [sessionData, setSessionData] = useState({
    sessionUser: "",
    sessionRole: "",
  });
  useEffect(() => {
    // Get session data if path is not a link to start a new session
    if (currentPath.startsWith("/start/")) {
      return;
    }
    fetch(globalData.apiServer + "/api/session", { credentials: "include" })
      .then((response) => response.json())
      .then((response) => {
        setSessionData(response);
        globalData.role = response.sessionRole;
        globalData.name = response.sessionUser;
      });
  }, []);
  if (sessionData.role === "") return null;
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
