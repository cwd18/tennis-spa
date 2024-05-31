import { useEffect, useState } from "react";
import globalData from "./GlobalData";

function UserSelect({ fixtureid, userid, setUserid }) {
  const [users, setUsers] = useState([]); // Add useState hook to store fetched users
  useEffect(() => {
    fetch(globalData.apiServer + "/api/participants/" + fixtureid + "/all", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        response.unshift({ Userid: 0, ShortName: "None" });
        setUsers(response);
      });
  }, []);
  if (users.length === 0) {
    return null;
  }
  return (
    <div>
      <br />
      <label htmlFor="userid">
        <b>User input:</b>{" "}
      </label>
      <select
        value={userid}
        onChange={(event) => setUserid(Number(event.target.value))}
      >
        {users.map((user) => (
          <option key={user.Userid} value={user.Userid}>
            {user.ShortName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelect;
