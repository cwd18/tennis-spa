import { useParams } from "react-router-dom";
import Bar from "./Bar";
import UserListTable from "./UserListTable";
import ErrorView from "./ErrorView";
import globalData from "./GlobalData";

function UserList() {
  let params = useParams();
  let fixtureid = Number(params["fixtureid"]);
  const { role } = globalData;
  return (
    <div>
      <Bar />
      <div className="pure-g">
        <div className="pure-u-1-24"></div>
        <div className="pure-u-23-24">
          {(fixtureid === 0 && role === "Admin") ||
          (fixtureid !== 0 && role !== "User") ? (
            <UserListTable fixtureid={fixtureid} />
          ) : (
            <ErrorView error="You are not authorised to view this page" />
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default UserList;
