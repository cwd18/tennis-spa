import globalData from "./GlobalData";

function SetPlaying({ fixtureid, setViewTime }) {
  const setPlaying = (mode) => {
    fetch(globalData.apiServer + "/api/playing/" + fixtureid + "/" + mode, {
      method: "PUT",
      credentials: "include",
    }).then(() => setViewTime((vt) => vt + 1));
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
