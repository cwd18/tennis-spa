import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import globalData from "./GlobalData";
import Bar from "./Bar";

function UserList() {
  const [users, setUsers] = useState([]);
  const { apiServer } = globalData;
  let params = useParams();
  let fixtureid = params["fixtureid"];
  useEffect(() => {
    fetch(apiServer + "/api/userlist/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(setUsers);
  }, []);
  return (
    <div>
      <Bar />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          <div>
            <h2>Tennis users</h2>
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Short name</th>
                  <th>Booker</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.Userid}>
                    <td>{u.FirstName + " " + u.LastName}</td>
                    <td>{u.ShortName}</td>
                    <td>{u.Booker ? "Yes" : "No"}</td>
                    <td>{u.EmailAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default UserList;
