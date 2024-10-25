import globalData from "./GlobalData";

function WantsToPlay({
  name,
  wantsToPlay,
  isPlaying,
  handleWantsToPlayChange,
  handleSetPlaying,
}) {
  const { role } = globalData;
  if (wantsToPlay === "Unknown") {
    return (
      <div>
        <p className="no-space-after">
          <b>{name} has not yet responded</b>
        </p>
        <button
          className="pure-button button-margin-right"
          onClick={() => handleWantsToPlayChange("Yes")}
        >
          Wants to play
        </button>
        <button
          className="pure-button"
          onClick={() => handleWantsToPlayChange("No")}
        >
          Cannot play
        </button>
      </div>
    );
  }
  return (
    <div>
      <p className="no-space-after">
        <b>
          {name}{" "}
          {wantsToPlay === "Yes"
            ? isPlaying
              ? "is playing"
              : "wants to play"
            : "can't play"}
        </b>
      </p>
      {role !== "User" && wantsToPlay === "Yes" && (
        <button
          className="pure-button button-margin-right"
          onClick={() => handleSetPlaying(isPlaying ? "0" : "1")}
        >
          {isPlaying ? "Set not playing" : "Set playing"}
        </button>
      )}
      <button
        className="pure-button"
        onClick={() =>
          handleWantsToPlayChange(wantsToPlay === "Yes" ? "No" : "Yes")
        }
      >
        {wantsToPlay === "Yes" ? "Cannot now play" : "Would now like to play"}
      </button>
    </div>
  );
}

export default WantsToPlay;
