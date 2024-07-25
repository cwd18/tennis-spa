import globalData from "./GlobalData";
import { Fragment, useState, useRef } from "react";

function OwnerDialog({ ownerName }) {
  const { role } = globalData;
  const [editMode, setEditMode] = useState(false);
  const dialog = useRef();
  const handleOnClick = (event) => {
    if (dialog.current && !event.composedPath().includes(dialog.current)) {
      exitEdit();
    }
  };
  const enterEdit = () => {
    setEditMode(true);
    document.body.addEventListener("click", handleOnClick);
    return false;
  };
  const exitEdit = () => {
    setEditMode(false);
    document.body.removeEventListener("click", handleOnClick);
    return false;
  };
  const updateOwner = (scope) => {
    console.log("updateOwner", scope);
  };
  if (editMode) {
    return (
      <div className="pure-form" ref={dialog}>
        Owner: {ownerName} &emsp;
        <a href="#" onClick={exitEdit}>
          Cancel
        </a>
        &nbsp;|&nbsp;
        <a
          href="#"
          onClick={() => {
            updateOwner("fixture");
            return false;
          }}
        >
          Update
        </a>
        &nbsp;|&nbsp;
        <a
          href="#"
          onClick={() => {
            updateOwner("all");
            return false;
          }}
        >
          Update All
        </a>
        <br />
        <br />
      </div>
    );
  }
  return (
    <div>
      Owner: {ownerName} &emsp;
      {role === "Admin" && (
        <a href="#" onClick={enterEdit}>
          Edit
        </a>
      )}
      <br />
      <br />
    </div>
  );
}

export default OwnerDialog;
