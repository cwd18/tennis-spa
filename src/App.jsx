import "purecss/build/pure.css";
import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import globalData from "./GlobalData";
import Start from "./Start";
import ErrorView from "./ErrorView";
import AdminView from "./AdminView";
import UserView from "./UserView";
import OwnerView from "./OwnerView";
import UserList from "./UserList";

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [sessionDataFetched, setSessionDataFetched] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Get session data unless the path is a link to start a new session
    if (currentPath.startsWith("/start/")) {
      setSessionDataFetched(true); // not really fetched but fine to render routes
      return;
    }
    fetch(globalData.apiServer + "/api/session", {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("No session data");
        }
        return response.json();
      })
      .then((response) => {
        setSessionDataFetched(true);
        globalData.role = response.sessionRole;
        globalData.name = response.sessionUser;
      })
      .catch((error) => {
        console.error("Error fetching session data:", error.toString());
        setError(error.toString());
      });
  }, []);
  if (error) {
    return (
      <div>
        <ErrorView error={error} />
      </div>
    );
  }
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
