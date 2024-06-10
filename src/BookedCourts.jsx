function BookedCourts({ bookings, absentBookers }) {
  if (!bookings || bookings.length === 0) {
    return null;
  }
  const [header, ...rows] = bookings;
  return (
    <div>
      <p className="no-space-after">
        <b>Booked courts...</b>
      </p>
      <table className="pure-table">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {absentBookers.length !== 0 && (
        <div>
          <p className="no-space-after">
            <b>Absent bookers...</b>
          </p>
          <ol className="lno-space">
            {absentBookers.map((booker, index) => (
              <li key={index}>{booker.ShortName}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default BookedCourts;
