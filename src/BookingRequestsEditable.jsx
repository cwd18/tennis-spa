import { useState, useEffect } from "react";
import CountdownTimer from "./CountdownTimer";
import globalData from "./GlobalData";

function BookingRequestsEditable({ fixtureid, bookingDate }) {
  const { apiServer } = globalData;
  const [bookingData, setBookingData] = useState([]);
  const [users, setUsers] = useState([]);
  const bookingDataUserids = bookingData.map((item) => item.userid);
  useEffect(() => {
    fetch(apiServer + "/api/participants/" + fixtureid + "/bookers", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        response.unshift({ userid: 0, ShortName: "None" });
        setUsers(response);
      });
    fetch(apiServer + "/api/bookingRequestsTable/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(setBookingData);
  }, []);
  const handleBookerChange = (event, index) => {
    const { value } = event.target;
    const newBookingData = bookingData.map((item, i) => {
      if (i == index) {
        return { ...item, userid: Number(value) };
      }
      if (value != 0 && value == item.userid) {
        return { ...item, userid: 0 };
      }
      return item;
    });
    setBookingData(newBookingData);
    const bookings = newBookingData.map((item) => ({
      time: item.time,
      court: item.court,
      userid: item.userid,
    }));
    fetch(apiServer + "/api/bookingRequests/" + fixtureid, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookings),
    });
  };

  return (
    <div>
      <p className="no-space-after">
        <b>Court booking </b>
      </p>
      <CountdownTimer
        label="Time to book: "
        targetDateStr={bookingDate + " 07:30"}
      />
      <table className="pure-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Court</th>
            <th>Booker</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((item, index) => (
            <tr key={index}>
              <td>{item.time}</td>
              <td>{item.court}</td>
              <td>
                <select
                  id={item.time + "-" + item.court}
                  value={item.userid}
                  onChange={(event) => handleBookerChange(event, index)}
                >
                  {users
                    .filter(
                      (user, index) =>
                        user.Userid == item.userid ||
                        !bookingDataUserids.includes(user.Userid)
                    )
                    .map((user, index) => (
                      <option key={index} value={user.Userid}>
                        {user.Userid == 0 ? "None" : user.ShortName}
                      </option>
                    ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingRequestsEditable;
