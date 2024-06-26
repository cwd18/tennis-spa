import { useState } from "react";
import globalData from "./GlobalData";

function BookedCourts({ title, bookings }) {
  const [cancelling, setCancelling] = useState("");
  const { role } = globalData;

  if (!bookings || bookings.length === 0) {
    return null;
  }
  const [header, ...rows] = bookings;
  const width = header.length;
  const handleDoubleClick = (index, cell) => {
    setCancelling(`court: ${cell} at ${header[index]}`);
  };
  if (rows.length === 0) {
    return null;
  }
  return (
    <div>
      <p className="no-space-after">
        <b>{title}</b>
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
                <td
                  onClick={(e) => {
                    if (role !== "User" && e.detail === 2 && index < width - 1)
                      handleDoubleClick(index, cell);
                  }}
                  key={index}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {cancelling !== "" && <p>Cancelling {cancelling}</p>}
    </div>
  );
}

export default BookedCourts;
