import { useState, useRef, Fragment } from "react";
import globalData from "./GlobalData";

function CourtsDialog({ fixtureid, type, title, courts, setViewTime }) {
  const [editMode, setEditMode] = useState(false);
  const [newCourts, setNewCourts] = useState(courts);
  const dialog = useRef();
  const { apiServer } = globalData;
  const courtsPattern = new RegExp(
    "^\\d{1,2}-\\d{1,2}(?:, \\d{1,2}-\\d{1,2})*$"
  );
  const setCourts = (type, scope, courts) => {
    fetch(
      apiServer +
        "/api/courts/" +
        fixtureid +
        "/" +
        type +
        "/" +
        scope +
        "/" +
        courts,
      {
        method: "PUT",
        credentials: "include",
      }
    ).then(() => setViewTime((vt) => vt + 1));
  };

  const handleOnClick = (event) => {
    if (dialog.current && !event.composedPath().includes(dialog.current)) {
      exitEdit();
    }
  };
  const enterEdit = () => {
    setNewCourts(courts);
    setEditMode(true);
    document.body.addEventListener("click", handleOnClick);
    return false;
  };
  const exitEdit = () => {
    setEditMode(false);
    setNewCourts(courts);
    document.body.removeEventListener("click", handleOnClick);
    return false;
  };
  const updateCourts = (scope) => {
    if (newCourts !== courts && courtsPattern.test(newCourts)) {
      setCourts(type, scope, newCourts);
    }
    exitEdit();
  };

  if (editMode) {
    return (
      <div className="pure-form" ref={dialog}>
        <label>
          {title}: &nbsp;
          <input
            name="courts"
            type="text"
            value={newCourts}
            onChange={(e) => setNewCourts(e.target.value)}
          />
        </label>
        &emsp;
        <button className="link-button" onClick={exitEdit}>
          Cancel
        </button>
        {newCourts !== courts && courtsPattern.test(newCourts) && (
          <Fragment>
            &nbsp;|&nbsp;
            <button
              className="link-button"
              onClick={() => {
                updateCourts("fixture");
                return false;
              }}
            >
              Update
            </button>
            &nbsp;|&nbsp;
            <button
              className="link-button"
              onClick={() => {
                updateCourts("all");
                return false;
              }}
            >
              Update&nbsp;All
            </button>
            <br />
            <br />
          </Fragment>
        )}
      </div>
    );
  }
  return (
    <div>
      {title}: {courts} &emsp;
      <button className="link-button" onClick={enterEdit}>
        Edit
      </button>
      <br />
      <br />
    </div>
  );
}

export default CourtsDialog;
