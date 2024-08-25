import globalData from "./GlobalData";

function SetPlaying({ fixtureid, incrementViewTime }) {
  const setPlaying = (mode) => {
    fetch(globalData.apiServer + "/api/playing/" + fixtureid + "/" + mode, {
      method: "PUT",
      credentials: "include",
    }).then(incrementViewTime);
  };
  return (
    <div>
      <br />
      <button
        className="pure-button button-margin-right"
        onClick={() => setPlaying("auto")}
      >
        Auto set playing
      </button>
      <button className="pure-button" onClick={() => setPlaying("reset")}>
        Reset playing
      </button>
    </div>
  );
}

export default SetPlaying;
