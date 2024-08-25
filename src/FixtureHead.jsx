import globalData from "./GlobalData";
import { Fragment, useEffect, useState } from "react";
import OwnerDialog from "./OwnerDialog";
import CourtsDialog from "./CourtsDialog";
import AlternateStartTime from "./AlternateStartTime";

function FixtureHead({
  fixtures,
  fixtureIndex,
  handleFixtureSwitch,
  viewTime,
  incrementViewTime,
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
    FixtureOwner,
    OwnerFirstName,
    OwnerLastName,
    FixtureCourts,
    TargetCourts,
    description,
    bookingTimes,
  } = fixtures[fixtureIndex];
  const { role } = globalData;
  return (
    <div>
      <h3>
        {description + " at "}
        <span style={{ color: "red" }}> {FixtureTime}</span>
      </h3>
      {role !== "User" && (
        <Fragment>
          <AlternateStartTime
            fixtureid={Fixtureid}
            bookingTimes={bookingTimes}
            fixtureTime={FixtureTime}
            incrementViewTime={incrementViewTime}
          />
          <OwnerDialog
            fixtureid={Fixtureid}
            ownerid={FixtureOwner}
            ownerName={OwnerFirstName + " " + OwnerLastName}
            incrementViewTime={incrementViewTime}
          />
          <CourtsDialog
            fixtureid={Fixtureid}
            type="courts"
            title="Courts"
            courts={FixtureCourts}
            incrementViewTime={incrementViewTime}
          />
          <CourtsDialog
            fixtureid={Fixtureid}
            type="target"
            title="Courts to book"
            courts={TargetCourts}
            incrementViewTime={incrementViewTime}
          />
        </Fragment>
      )}
      <button
        className="pure-button button-margin-right"
        onClick={() => handleFixtureSwitch((fixtureIndex + 1) % 2)}
      >
        Switch to {fixtures[(fixtureIndex + 1) % 2].shortDate}
      </button>
      <button
        className="pure-button"
        onClick={() => {
          incrementViewTime((vt) => vt + 1);
          setRefreshing(true);
        }}
      >
        {refreshing ? "Refreshing" : "Refresh"}
      </button>
    </div>
  );
}

export default FixtureHead;
