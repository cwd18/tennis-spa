import CourtsView from "./CourtsView";
import globalData from "./GlobalData";
import { useEffect, useState } from "react";

function FixtureHead({
  fixtures,
  fixtureIndex,
  handleFixtureSwitch,
  viewTime,
  setViewTime,
}) {
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  }, [viewTime]);
  if (!fixtures || fixtures.length === 0) return null;
  const f = fixtures[fixtureIndex];
  const { Fixtureid, FixtureTime, FixtureCourts, TargetCourts, description } =
    f;
  const { role } = globalData;
  return (
    <div>
      <h2>
        {description + " at "}
        <span style={{ color: "red" }}> {FixtureTime}</span>
      </h2>
      {role !== "User" && (
        <CourtsView
          fixtureid={Fixtureid}
          FixtureCourts={FixtureCourts}
          TargetCourts={TargetCourts}
          setViewTime={setViewTime}
        />
      )}
      <button
        className="pure-button button-margin-right"
        onClick={() => handleFixtureSwitch((fixtureIndex + 1) % 2)}
      >
        Switch to {fixtures[(fixtureIndex + 1) % 2].description}
      </button>
      <button
        className="pure-button"
        onClick={() => {
          setViewTime((vt) => vt + 1);
          setRefreshing(true);
        }}
      >
        {refreshing ? "Refreshing" : "Refresh"}
      </button>
    </div>
  );
}

export default FixtureHead;
