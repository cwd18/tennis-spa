import globalData from "./GlobalData";
import { useState } from "react";

function CopyEmails({ fixtureid }) {
  const { apiServer } = globalData;
  const [copying, setCopying] = useState(false);

  const copyEmailsToClipboard = () => {
    setCopying(true);
    fetch(apiServer + "/api/getEmailList/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.text())
      .then((response) => {
        navigator.clipboard.writeText(response);
        setCopying(false);
      });
  };

  return (
    <div>
      <br />
      <button className="pure-button" onClick={copyEmailsToClipboard}>
        {copying ? "Copying..." : "Copy emails to clipboard"}
      </button>
    </div>
  );
}

export default CopyEmails;
