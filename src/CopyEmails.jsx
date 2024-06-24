import globalData from "./GlobalData";

function CopyEmails({ fixtureid }) {
  const { apiServer } = globalData;

  const copyEmailsToClipboard = () => {
    fetch(apiServer + "/api/getEmailList/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.text())
      .then((response) => navigator.clipboard.writeText(response));
  };
  return (
    <div>
      <br />
      <button class="pure-button" onClick={copyEmailsToClipboard}>
        Copy emails to clipboard
      </button>
    </div>
  );
}

export default CopyEmails;
