import globalData from "./GlobalData";
import { Fragment, useState, useRef } from "react";
import UserSelect from "./UserSelect";

function OwnerDialog({ fixtureid, ownerid, ownerName, incrementViewTime }) {
  const { apiServer, role } = globalData;
  const [editMode, setEditMode] = useState(false);
  const [newOwner, setNewOwner] = useState(ownerid);
  const dialog = useRef();
  const handleOnClick = (event) => {
    if (dialog.current && !event.composedPath().includes(dialog.current)) {
      exitEdit();
    }
  };
  const enterEdit = () => {
    setEditMode(true);
    setNewOwner(ownerid);
    document.body.addEventListener("click", handleOnClick);
    return false;
  };
  const exitEdit = () => {
    setEditMode(false);
    document.body.removeEventListener("click", handleOnClick);
    return false;
  };
  const updateOwner = (scope) => {
    fetch(
      apiServer + "/api/owner/" + fixtureid + "/" + scope + "/" + newOwner,
      {
        method: "PUT",
        credentials: "include",
      }
    ).then(() => {
      exitEdit();
      incrementViewTime((vt) => vt + 1);
    });
  };
  if (editMode) {
    return (
      <div className="pure-form" ref={dialog}>
        <UserSelect
          label="Owner:"
          includeNone={false}
          fixtureid={fixtureid}
          userid={newOwner}
          setUserid={setNewOwner}
        />
        &emsp;
        <button className="link-button" onClick={exitEdit}>
          Cancel
        </button>
        {newOwner !== ownerid && (
          <Fragment>
            &nbsp;|&nbsp;
            <button className="link-button" onClick={() => updateOwner("all")}>
              Update
            </button>
            &nbsp;|&nbsp;
            <button
              className="link-button"
              onClick={() => {
                updateOwner("all");
                return false;
              }}
            >
              Update All
            </button>
          </Fragment>
        )}
        <br />
        <br />
      </div>
    );
  }
  return (
    <div>
      Owner: {ownerName} &emsp;
      {role === "Admin" && (
        <button className="link-button" onClick={enterEdit}>
          Edit
        </button>
      )}
      <br />
      <br />
    </div>
  );
}

export default OwnerDialog;
