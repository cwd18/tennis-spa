import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import globalData from "./GlobalData";
import UserDialog from "./UserDialog";

function UserListTable({ fixtureid }) {
  const [viewTime, setViewTime] = useState(0);
  const [userList, setUserList] = useState([]);
  const [fixtureData, setFixtureData] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editIndex, SetEditIndex] = useState(0);
  const { apiServer, role } = globalData;
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
    setDialogVisible(true);
  };
  const addUser = () => {
    SetEditIndex(null);
    setDialogVisible(true);
  };
  const cancelDialog = () => {
    setDialogVisible(false);
  };
  let heading = "Tennis users";
  let backLink = "/admin";
  if (fixtureid !== 0) {
    heading = "Users for " + fixtureData.description;
    backLink = "/owner/" + fixtureData.Seriesid;
  }
  return (
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
      <button className="pure-button" onClick={addUser}>
        Add user
      </button>
      <br />
      <br />
      <Link to={backLink} className="pure-button">
        Back
      </Link>
      <UserDialog
        dialogVisible={dialogVisible}
        userData={userList[editIndex]}
        fixtureid={fixtureid}
        cancelDialog={cancelDialog}
        setViewTime={setViewTime}
      />
    </div>
  );
}

export default UserListTable;
