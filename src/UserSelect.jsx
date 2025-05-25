import { Fragment, useEffect, useState } from "react";
import globalData from "./GlobalData";

function UserSelect({ label, includeNone, fixtureid, userid, setUserid }) {
  const [users, setUsers] = useState([]);
  const { apiServer } = globalData;
  useEffect(() => {
    fetch(apiServer + "/api/participants/" + fixtureid + "/all", {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        if (includeNone) {
          response.unshift({ Userid: 0, ShortName: "None" });
        }
        setUsers(response);
      });
  }, [fixtureid]);
  if (users.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <label htmlFor="userid">{label + " "}</label>
      <select
        id="userid"
        value={userid}
        onChange={(event) => setUserid(Number(event.target.value))}
      >
        {users.map((user) => (
          <option key={user.Userid} value={user.Userid}>
            {user.ShortName}
          </option>
        ))}
      </select>
    </Fragment>
  );
}

export default UserSelect;
