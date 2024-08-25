import globalData from "./GlobalData";

function AlternateStartTime({
  fixtureid,
  bookingTimes,
  fixtureTime,
  incrementViewTime,
}) {
  const { apiServer } = globalData;
  const updateStart = () => {
    fetch(apiServer + "/api/alternateFixtureTime/" + fixtureid, {
      method: "PUT",
      credentials: "include",
    }).then(incrementViewTime);
  };
  let alternateStartTime = "";
  if (bookingTimes.length === 3) {
    alternateStartTime =
      fixtureTime === bookingTimes[0] ? bookingTimes[1] : bookingTimes[0];
  }
  if (alternateStartTime === "") {
    return null;
  }
  return (
    <div>
      Alternate start time: {alternateStartTime} &emsp;
      <button className="link-button" onClick={updateStart}>
        Select
      </button>
      <br />
      <br />
    </div>
  );
}

export default AlternateStartTime;
