import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import globalData from "./GlobalData";
import UserDialog from "./UserDialog";
import UsersSelectDialog from "./UsersSelectDialog";

function UserListTable({ fixtureid }) {
  const [viewTime, setViewTime] = useState(0);
  const [userList, setUserList] = useState([]);
  const [fixtureData, setFixtureData] = useState({});
  const [userDialogVisible, setUserDialogVisible] = useState(false);
  const [usersSelectDialogVisible, setUsersSelectDialogVisible] =
    useState(false);
  const [editIndex, SetEditIndex] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const { apiServer, role } = globalData;
  const incrementViewTime = () => {
    setViewTime(viewTime + 1);
  };
  useEffect(() => {
    fetch(apiServer + "/api/userlist/" + fixtureid, {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => {
        const { fixtureData, userList } = response;
        setUserList(userList);
        setFixtureData(fixtureData);
      });
    if (fixtureid === 0) return;
    fetch(apiServer + "/api/participants/" + fixtureid + "/candidates", {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((response) => setCandidates(response));
  }, [viewTime]);
  const handleDoubleClick = (index) => {
    SetEditIndex(index);
    setUserDialogVisible(true);
  };
  const addUser = () => {
    if (fixtureid !== 0) {
      setUsersSelectDialogVisible(true);
      return;
    }
    SetEditIndex(null);
    setUserDialogVisible(true);
  };
  const cancelUserDialog = () => {
    setUserDialogVisible(false);
  };
  const addCandidates = (selectedUsers) => {
    fetch(apiServer + "/api/candidates/" + fixtureid, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedUsers),
    }).then(() => {
      setUsersSelectDialogVisible(false);
      incrementViewTime((vt) => vt + 1);
    });
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
        dialogVisible={userDialogVisible}
        userData={userList[editIndex]}
        fixtureid={fixtureid}
        cancelDialog={cancelUserDialog}
        incrementViewTime={incrementViewTime}
      />
      <UsersSelectDialog
        dialogVisible={usersSelectDialogVisible}
        message="Select users to add to the fixture"
        users={candidates}
        onSelect={(selectedUsers) => addCandidates(selectedUsers)}
        onCancel={() => setUsersSelectDialogVisible(false)}
      />
    </div>
  );
}

export default UserListTable;
