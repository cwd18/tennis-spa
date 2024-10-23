import { useState } from "react";
import globalData from "./GlobalData";

function EmailMessage({ fixtureid }) {
  const [messageInsert, setMessageInsert] = useState("");
  const { apiServer } = globalData;
  const sendEmail = () => {
    fetch(apiServer + "/api/emailMessage/" + fixtureid, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageInsert }),
    });
    setMessageInsert("");
  };
  return (
    <div>
      <label>
        Email message: &nbsp;
        <button className="link-button" onClick={sendEmail}>
          Send
        </button>
        <br />
        <textarea
          name="message"
          type="text"
          value={messageInsert}
          onChange={(e) => setMessageInsert(e.target.value)}
          rows="4"
          cols="50"
        />
      </label>
    </div>
  );
}
export default EmailMessage;
