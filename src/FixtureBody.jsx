import { useState, useEffect } from "react";
import PlayerList from "./PlayerList";
import BookedCourts from "./BookedCourts";
import BookingRequests from "./BookingRequests";
import globalData from "./GlobalData";
import BookingRequestsEditable from "./BookingRequestsEditable";

function FixtureBody({ fixtureid, viewTime, inBookingWindow, bookingDateYmd }) {
  const [playerLists, setPlayerLists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [absentBookers, setAbsentBookers] = useState([]);
  const { apiServer, role } = globalData;

  useEffect(() => {
    fetch(apiServer + "/api/playerLists/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(setPlayerLists);

    if (inBookingWindow >= 0) {
      fetch(apiServer + "/api/bookingViewGrid/" + fixtureid, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(setBookings);
      fetch(apiServer + "/api/absentBookers/" + fixtureid, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(setAbsentBookers);
    }

    if (inBookingWindow < 0) {
      fetch(apiServer + "/api/bookings/Request/" + fixtureid, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then(setBookingRequests);
    }
  }, [fixtureid, viewTime, inBookingWindow, bookingDateYmd]);
  return (
    <div>
      <PlayerList players={playerLists.players} label="Playing" />
      <PlayerList players={playerLists.reserves} label="Wants to play" />
      <PlayerList players={playerLists.decliners} label="Can't play" />
      {(role === "Admin" || role == "Owner") && (
        <PlayerList players={playerLists.abstainers} label="Undeclared" />
      )}

      {inBookingWindow >= 0 && (
        <BookedCourts bookings={bookings} absentBookers={absentBookers} />
      )}
      {inBookingWindow < 0 && role === "User" && (
        <BookingRequests
          bookingRequests={bookingRequests}
          bookingDate={bookingDateYmd}
        />
      )}
      {inBookingWindow < 0 && role !== "User" && (
        <BookingRequestsEditable
          fixtureid={fixtureid}
          bookingDate={bookingDateYmd}
        />
      )}
    </div>
  );
}

export default FixtureBody;
