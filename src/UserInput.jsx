import { useState, useEffect } from "react";
import WantsToPlay from "./WantsToPlay";
import UserBookingTable from "./UserBookingTable";
import globalData from "./GlobalData";

function UserInput({
  fixtureid,
  inBookingWindow,
  userid,
  viewTime,
  setViewTime,
}) {
  const [wantsToPlay, setWantsToPlay] = useState();
  const [participantData, setParticipantData] = useState({});
  const [bookingData, setBookingData] = useState([]);
  const { apiServer, role } = globalData;

  useEffect(() => {
    fetch(apiServer + "/api/participantData/" + fixtureid + "/" + userid, {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        setParticipantData(response);
        setWantsToPlay(response.wantsToPlay);
      });

    fetch(apiServer + "/api/participantBookings/" + fixtureid + "/" + userid, {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then(setBookingData);
  }, [fixtureid, inBookingWindow, viewTime, userid]);

  const handleCourtChange = (event, index) => {
    const { value } = event.target;
    const resetIndex = index === 0 ? 1 : 0;
    const newBookingData = bookingData.map((item, i) => {
      if (i === index) {
        return { ...item, court: Number(value) };
      }
      return item;
    });
    const numCourtsSet = newBookingData.filter(
      (item) => item.court !== 0
    ).length;
    if (numCourtsSet > 2) {
      newBookingData[resetIndex].court = 0;
    }
    setBookingData(newBookingData);
    const bookings = newBookingData.map((item) => ({
      time: item.time,
      court: item.court,
    }));
    fetch(apiServer + "/api/participantBookings/" + fixtureid + "/" + userid, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookings),
    }).then(() => setViewTime((vt) => vt + 1));
  };

  const handleWantsToPlayChange = (value) => {
    setWantsToPlay(value);
    fetch(
      apiServer +
        "/api/participantWantsToPlay/" +
        fixtureid +
        "/" +
        userid +
        "/" +
        (value === "No" ? "0" : "1"),
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    ).then(() => setViewTime((vt) => vt + 1));
  };

  const { FirstName, seriesLink } = participantData;
  if (inBookingWindow === undefined) return null;
  return (
    <div>
      <hr />
      <WantsToPlay
        name={FirstName}
        wantsToPlay={wantsToPlay}
        handleWantsToPlayChange={handleWantsToPlayChange}
      />

      {inBookingWindow >= 0 && (
        <UserBookingTable
          name={FirstName}
          bookingData={bookingData}
          handleCourtChange={handleCourtChange}
        />
      )}
      {role !== "User" && (
        <p>
          <a href={seriesLink}>{FirstName + " personal series link"}</a>
        </p>
      )}
      <hr />
    </div>
  );
}

export default UserInput;
