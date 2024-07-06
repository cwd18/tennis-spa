import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import globalData from "./GlobalData";
import Bar from "./Bar";
import UserDialog from "./UserDialog";

function UserList() {
  const [viewTime, setViewTime] = useState(0);
  const [userList, setUserList] = useState([]);
  const [fixtureData, setFixtureData] = useState({});
  const [dialog, setDialog] = useState(false);
  const [editIndex, SetEditIndex] = useState(0);
  const { apiServer, role } = globalData;
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
  }, [viewTime]);
  const handleDoubleClick = (index) => {
    SetEditIndex(index);
    setDialog(true);
  };
  const cancelDialog = () => {
    setDialog(false);
  };
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
                {userList.map((u, index) => (
                  <tr key={u.Userid}>
                    <td
                      onClick={(e) => {
                        if (role !== "User" && e.detail === 2)
                          handleDoubleClick(index);
                      }}
                    >
                      {u.FirstName + " " + u.LastName}
                    </td>
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
            <UserDialog
              dialog={dialog}
              userData={userList[editIndex]}
              cancelDialog={cancelDialog}
              setViewTime={setViewTime}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default UserList;
