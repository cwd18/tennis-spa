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
import Bar from "./Bar";

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
    // Check that PHPSESSID cookie is set
    // Don't try to fetch session data if no session cookie is present
    // As session_start() will just create a new session with empty session data
    const sessionCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("PHPSESSID="));
    if (!sessionCookie) {
      setError("No session cookie found");
      return;
    }
    // Fetch session data from the server
    // This will return 401 if the session id is not found in the SessionData table
    // and the user should start a new session
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
        <Bar />
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
