import CourtsView from "./CourtsView";
import globalData from "./GlobalData";

function FixtureHead({
  fixtures,
  fixtureIndex,
  handleFixtureSwitch,
  setViewTime,
}) {
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
        onClick={() => setViewTime((vt) => vt + 1)}
      >
        Refresh
      </button>
    </div>
  );
}

export default FixtureHead;
