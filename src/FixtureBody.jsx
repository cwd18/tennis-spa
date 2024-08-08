import { useState, useEffect, Fragment } from "react";
import PlayerList from "./PlayerList";
import BookedCourts from "./BookedCourts";
import AbsentBookers from "./AbsentBookers";
import BookingRequests from "./BookingRequests";
import globalData from "./GlobalData";
import BookingRequestsEditable from "./BookingRequestsEditable";

function FixtureBody({
  fixtureid,
  viewTime,
  setViewTime,
  inBookingWindow,
  bookingDateYmd,
}) {
  const [playerLists, setPlayerLists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingsToCancel, setBookingsToCancel] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [absentBookers, setAbsentBookers] = useState([]);
  const { apiServer, role } = globalData;
  const bookingToggler = (time, court) => {
    fetch(
      apiServer + "/api/toggleBooking/" + fixtureid + "/" + time + "/" + court,
      {
        credentials: "include",
        method: "PUT",
      }
    ).then(() => setViewTime((vt) => vt + 1));
  };

  useEffect(() => {
    fetch(apiServer + "/api/playerLists/" + fixtureid, {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then(setPlayerLists);

    if (inBookingWindow >= 0) {
      fetch(apiServer + "/api/bookingViewGrid/Booked/" + fixtureid, {
        credentials: "include",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then(setBookings);
      fetch(apiServer + "/api/bookingViewGrid/Cancel/" + fixtureid, {
        credentials: "include",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then(setBookingsToCancel);
      fetch(apiServer + "/api/absentBookers/" + fixtureid, {
        credentials: "include",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then(setAbsentBookers);
    }

    if (inBookingWindow < 0) {
      fetch(apiServer + "/api/bookings/Request/" + fixtureid, {
        credentials: "include",
        cache: "no-cache",
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
        <Fragment>
          <BookedCourts
            title="Booked courts..."
            bookings={bookings}
            bookingToggler={bookingToggler}
          />
          <BookedCourts
            title="Booked courts to cancel..."
            bookings={bookingsToCancel}
            bookingToggler={bookingToggler}
          />
          <AbsentBookers absentBookers={absentBookers} />
        </Fragment>
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
