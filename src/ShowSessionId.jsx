import { useEffect, useState } from "react";

function ShowSessionId() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const getSessionId = () => {
      const cookies = document.cookie.split("; ");
      const sessionCookie = cookies.find((c) => c.startsWith("PHPSESSID="));
      if (sessionCookie) {
        const sessionValue = sessionCookie.split("=")[1];
        setSessionId(sessionValue);
      } else {
        setSessionId(null);
      }
    };

    getSessionId();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        getSessionId();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <p style={{ marginLeft: "25px" }}>
      {sessionId ? sessionId : "No session cookie"}
    </p>
  );
}

export default ShowSessionId;
// This component retrieves the session ID from the PHPSESSID cookie and displays it.
// It updates the session ID every 30 seconds, but you can adjust the interval as needed.
// Note: If the session ID is set as HttpOnly, it won't be accessible via JavaScript.
// This is a security feature to prevent client-side scripts from accessing the session ID.
