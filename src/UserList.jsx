import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import globalData from "./GlobalData";
import Bar from "./Bar";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [fixtureData, setFixtureData] = useState({});
  const { apiServer } = globalData;
  let params = useParams();
  let fixtureid = Number(params["fixtureid"]);
  useEffect(() => {
    fetch(apiServer + "/api/userlist/" + fixtureid, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        const { fixtureData, userList } = response;
        setUserList(userList);
        setFixtureData(fixtureData);
      });
  }, []);
  let heading = "Tennis users";
  let backLink = "/admin";
  if (fixtureid !== 0) {
    heading = "Users for " + fixtureData.description;
    backLink = "/owner/" + fixtureData.Seriesid;
  }
  return (
    <div>
      <Bar />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          <div>
            <h2>{heading}</h2>
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
                {userList.map((u) => (
                  <tr key={u.Userid}>
                    <td>{u.FirstName + " " + u.LastName}</td>
                    <td>{u.ShortName}</td>
                    <td>{u.Booker ? "Yes" : "No"}</td>
                    <td>{u.EmailAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <Link to={backLink} className="pure-button">
              Back
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default UserList;
