import { useState, useEffect } from "react";
import WantsToPlay from './WantsToPlay';   
import UserBookingTable from './UserBookingTable';
import PlayerList from './PlayerList';
import BookedCourts from './BookedCourts';
import BookingRequests from './BookingRequests';

function UserFixture({apiServer, fixtureid, userid, viewTime}) {
    const [wantsToPlay, setWantsToPlay] = useState();
    const [participantData, setParticipantData] = useState({});
    const [playerLists, setPlayerLists] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [bookingData, setBookingData] = useState([]);
    const [bookingRequests, setBookingRequests] = useState([]);

    const getPlayerLists = () => {
        fetch(apiServer + '/api/playerLists/' + fixtureid, {credentials: 'include'})
        .then(response => response.json())
        .then(setPlayerLists);
    }

    const getBookingViewGrid = () => {
        fetch(apiServer + '/api/bookingViewGrid/' + fixtureid, {credentials: 'include'})
        .then(response => response.json())
        .then(setBookings);
    }

    useEffect(() => {
        fetch(apiServer + '/api/participantData/' + fixtureid +'/' + userid, {credentials: 'include'})
        .then(response => response.json())
        .then(response => {
            setParticipantData(response);
            setWantsToPlay(response.wantsToPlay);
        });

        fetch(apiServer + '/api/participantBookings/' + fixtureid + '/' + userid, {credentials: 'include'})
        .then(response => response.json())
        .then(setBookingData);

        fetch(apiServer + '/api/bookingRequests/' + fixtureid, {credentials: 'include'})
        .then(response => response.json())
        .then(setBookingRequests);

        getPlayerLists();
        getBookingViewGrid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fixtureid, viewTime]);

    const handleCourtChange = (event, index) => {
        const { value } = event.target;
        const resetIndex = index === 0 ? 1 : 0;
        const newBookingData = bookingData.map((item, i) => {
            if (i === index) {
                return { ...item, court: Number(value) };}
            return item;
        });
        const numCourtsSet = newBookingData.filter(item => item.court !== 0).length;
        if (numCourtsSet > 2) {
            newBookingData[resetIndex].court = 0;
        }
        setBookingData(newBookingData);
        const bookings = newBookingData.map(item => ({ time: item.time, court: item.court }));
        fetch(apiServer + '/api/participantBookings/' + fixtureid + '/' + userid, {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookings),
        })
        .then(getBookingViewGrid);
    };

    const handleWantsToPlayChange = (value) => {
        setWantsToPlay(value);
        fetch(apiServer + '/api/participantWantsToPlay/' + fixtureid +'/' + userid
             +'/' + (value === 'No' ? '0' : '1'), {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })
        .then(getPlayerLists);
    };

    const {inBookingWindow, bookingDateYmd, FirstName} = participantData;
    if (wantsToPlay === undefined) return null;
    return (
        <div>
            <WantsToPlay 
            name={FirstName} 
            wantsToPlay={wantsToPlay}
            handleWantsToPlayChange={handleWantsToPlayChange} />

            {(inBookingWindow === 0) && <UserBookingTable 
            name={FirstName} 
            bookingData={bookingData}
            handleCourtChange={handleCourtChange} />}

            <PlayerList players={playerLists.players} label="Playing" />
            <PlayerList players={playerLists.reserves} label="Wants to play" />
            <PlayerList players={playerLists.decliners} label="Can't play" />

            {(inBookingWindow >= 0) && <BookedCourts bookings={bookings} />}
            {(inBookingWindow < 0) && <BookingRequests bookingRequests={bookingRequests} bookingDate={bookingDateYmd} />}
        </div>
    );
}

export default UserFixture;