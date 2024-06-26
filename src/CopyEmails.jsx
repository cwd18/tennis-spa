import globalData from "./GlobalData";
import { useState } from "react";

function CopyEmails({ fixtureid }) {
  const { apiServer } = globalData;
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false); // Added state for copied message

  const copyEmailsToClipboard = () => {
    setCopying(true);
    fetch(apiServer + "/api/getEmailList/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.text())
      .then((response) => {
        navigator.clipboard.writeText(response);
        setCopying(false);
        setCopied(true); // Set copied state to true after successful copy
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      });
  };

  return (
    <div>
      <br />
      <button className="pure-button" onClick={copyEmailsToClipboard}>
        {copying ? "Copying..." : "Copy emails to clipboard"}
      </button>
      {copied && <p>Emails copied to clipboard</p>}{" "}
      {/* Display copied message if copied state is true */}
    </div>
  );
}

export default CopyEmails;
