import { useState, useEffect, Fragment } from "react";
import FixtureHead from "./FixtureHead";
import UserSelect from "./UserSelect";
import UserInput from "./UserInput";
import FixtureBody from "./FixtureBody";
import globalData from "./GlobalData";
import ErrorView from "./ErrorView";
import SetPlaying from "./SetPlaying";
import CopyEmails from "./CopyEmails";
import { Link } from "react-router-dom";

function FixtureView({ seriesid, userid, setUserid }) {
  const [fixtures, setFixtures] = useState([]);
  const [fixtureIndex, setFixtureIndex] = useState(-1);
  const [viewTime, setViewTime] = useState(0);
  const { apiServer, role } = globalData;
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiServer + "/api/fixtures/" + seriesid, { credentials: "include" })
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Not authorized");
        }
        return response.json();
      })
      .then((response) => {
        setFixtures(response);
        if (fixtureIndex === -1) {
          const daysToNextFixture =
            (new Date(response[0].FixtureDate) - new Date()) /
            (1000 * 60 * 60 * 24);
          // show the next fixture if it's more than 1 day away, otherwise show the latest fixture
          const index = daysToNextFixture > 1 ? 0 : 1;
          setFixtureIndex(index);
        }
      })
      .catch((error) => {
        console.error(error.toString());
        setError(error.toString());
      });
  }, [seriesid, viewTime]);
  const handleFixtureSwitch = (index) => {
    setFixtureIndex(index);
  };
  if (error) {
    return (
      <div>
        <ErrorView error={error} />
      </div>
    );
  }
  if (!fixtures || fixtures.length === 0) return null;
  const { Fixtureid, inBookingWindow, bookingDateYmd } = fixtures[fixtureIndex];
  return (
    <div>
      <FixtureHead
        fixtures={fixtures}
        fixtureIndex={fixtureIndex}
        handleFixtureSwitch={handleFixtureSwitch}
        viewTime={viewTime}
        setViewTime={setViewTime}
      />
      {role !== "User" && (
        <UserSelect
          fixtureid={Fixtureid}
          userid={userid}
          setUserid={setUserid}
        />
      )}
      {userid !== 0 && (
        <UserInput
          fixtureid={Fixtureid}
          inBookingWindow={inBookingWindow}
          userid={userid}
          viewTime={viewTime}
          setViewTime={setViewTime}
        />
      )}
      {role !== "User" && inBookingWindow === 0 && (
        <SetPlaying fixtureid={Fixtureid} setViewTime={setViewTime} />
      )}
      <FixtureBody
        fixtureid={Fixtureid}
        viewTime={viewTime}
        setViewTime={setViewTime}
        inBookingWindow={inBookingWindow}
        bookingDateYmd={bookingDateYmd}
      />
      {role !== "User" && (
        <Fragment>
          <CopyEmails fixtureid={Fixtureid} />
          <br />
          <Link to={"/userlist/" + Fixtureid} className="pure-button">
            User List
          </Link>
        </Fragment>
      )}
    </div>
  );
}

export default FixtureView;
