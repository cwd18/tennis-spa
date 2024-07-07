import globalData from "./GlobalData";
import { useState } from "react";

function CopyEmails({ fixtureid }) {
  const { apiServer } = globalData;
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(0);

  const copyEmailsToClipboard = () => {
    setCopying(true);
    fetch(apiServer + "/api/getEmailList/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.text())
      .then((response) => {
        navigator.clipboard.writeText(response).then(
          () => {
            setCopying(false);
            setCopied(1); // Set copied state to 1 after successful copy
            setTimeout(() => setCopied(0), 2000); // Reset copied state after 2 seconds
          },
          () => {
            setCopying(false);
            setCopied(2); // Set copied state to 2 after unsuccessful copy
            setTimeout(() => setCopied(0), 2000); // Reset copied state after 2 seconds
          }
        );
      });
  };

  return (
    <div>
      <br />
      <button className="pure-button" onClick={copyEmailsToClipboard}>
        {copying ? "Copying..." : "Copy emails to clipboard"}
      </button>
      {copied == 1 && <p>Emails copied to clipboard</p>}
      {copied == 2 && <p>Unable to copy emails to clipboard</p>}
    </div>
  );
}

export default CopyEmails;
