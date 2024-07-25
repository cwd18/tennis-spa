import globalData from "./GlobalData";
import { Fragment, useEffect, useState } from "react";
import OwnerDialog from "./OwnerDialog";
import CourtsDialog from "./CourtsDialog";

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
  const {
    Fixtureid,
    FixtureTime,
    OwnerFirstName,
    OwnerLastName,
    FixtureCourts,
    TargetCourts,
    description,
  } = fixtures[fixtureIndex];
  const { role } = globalData;
  return (
    <div>
      <h2>
        {description + " at "}
        <span style={{ color: "red" }}> {FixtureTime}</span>
      </h2>
      {role !== "User" && (
        <Fragment>
          <OwnerDialog ownerName={OwnerFirstName + " " + OwnerLastName} />
          <CourtsDialog
            fixtureid={Fixtureid}
            type="courts"
            title="Courts"
            courts={FixtureCourts}
            setViewTime={setViewTime}
          />
          <CourtsDialog
            fixtureid={Fixtureid}
            type="target"
            title="Courts to book"
            courts={TargetCourts}
            setViewTime={setViewTime}
          />
        </Fragment>
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
