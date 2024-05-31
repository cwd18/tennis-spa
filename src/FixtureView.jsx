import { useState, useEffect } from "react";
import FixtureHead from "./FixtureHead";
import UserSelect from "./UserSelect";
import UserInput from "./UserInput";
import FixtureBody from "./FixtureBody";
import globalData from "./GlobalData";

function FixtureView({ seriesid, userid, setUserid }) {
  const [fixtures, setFixtures] = useState([]);
  const [fixtureIndex, setFixtureIndex] = useState();
  const [viewTime, setViewTime] = useState(0);
  const { apiServer, role } = globalData;

  useEffect(() => {
    fetch(apiServer + "/api/fixtures/" + seriesid, { credentials: "include" })
      .then((response) => response.json())
      .then((response) => {
        setFixtures(response);
        const daysToNextFixture =
          (new Date(response[0].FixtureDate) - new Date()) /
          (1000 * 60 * 60 * 24);
        // show the next fixture if it's more than 1 day away, otherwise show the latest fixture
        const index = daysToNextFixture > 1 ? 0 : 1;
        setFixtureIndex(index);
      });
  }, [seriesid]);
  const handleFixtureSwitch = (index) => {
    setFixtureIndex(index);
  };
  if (!fixtures || fixtures.length === 0) return null;
  const { Fixtureid, inBookingWindow, bookingDateYmd } = fixtures[fixtureIndex];
  return (
    <div>
      <FixtureHead
        fixtures={fixtures}
        fixtureIndex={fixtureIndex}
        handleFixtureSwitch={handleFixtureSwitch}
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
      <FixtureBody
        fixtureid={Fixtureid}
        viewTime={viewTime}
        inBookingWindow={inBookingWindow}
        bookingDateYmd={bookingDateYmd}
      />
    </div>
  );
}

export default FixtureView;
