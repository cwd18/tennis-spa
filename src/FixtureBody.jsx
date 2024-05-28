import { useState, useEffect } from "react";
import PlayerList from './PlayerList';
import BookedCourts from './BookedCourts';
import BookingRequests from './BookingRequests';
import globalData from './GlobalData';

function FixtureBody({ fixtureid, viewTime, inBookingWindow, bookingDateYmd }) {
  const [playerLists, setPlayerLists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const { apiServer } = globalData;

  useEffect(() => {
    fetch(apiServer + '/api/playerLists/' + fixtureid, {credentials: 'include'})
    .then(response => response.json())
    .then(setPlayerLists);

    if (inBookingWindow >= 0) {
      fetch(apiServer + '/api/bookingViewGrid/' + fixtureid, {credentials: 'include'})
      .then(response => response.json())
      .then(setBookings);
    }

    if (inBookingWindow < 0) {
      fetch(apiServer + '/api/bookingRequests/' + fixtureid, {credentials: 'include'})
      .then(response => response.json())
      .then(setBookingRequests);
    }

  }, [fixtureid, viewTime, inBookingWindow, bookingDateYmd]);
  return (
    <div>
        <PlayerList players={playerLists.players} label="Playing" />
        <PlayerList players={playerLists.reserves} label="Wants to play" />
        <PlayerList players={playerLists.decliners} label="Can't play" />

        {(inBookingWindow >= 0) && <BookedCourts bookings={bookings} />}
        {(inBookingWindow < 0) && <BookingRequests bookingRequests={bookingRequests} bookingDate={bookingDateYmd} />}
    </div>
);
}

export default FixtureBody;