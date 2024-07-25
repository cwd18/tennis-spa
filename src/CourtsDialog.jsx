import { useState, useRef } from "react";
import globalData from "./GlobalData";

function CourtsDialog({ fixtureid, type, title, courts, setViewTime }) {
  const [editMode, setEditMode] = useState(false);
  const [newCourts, setNewCourts] = useState(courts);
  const dialog = useRef();
  const { apiServer } = globalData;
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
    const pattern = new RegExp("\\d{1,2}-\\d{1,2}(?:, \\d{1,2}-\\d{1,2})*");
    if (newCourts !== courts && pattern.test(newCourts)) {
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
        <a href="#" onClick={exitEdit}>
          Cancel
        </a>
        &nbsp;|&nbsp;
        <a
          href="#"
          onClick={() => {
            updateCourts("fixture");
            return false;
          }}
        >
          Update
        </a>
        &nbsp;|&nbsp;
        <a
          href="#"
          onClick={() => {
            updateCourts("all");
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
      {title}: {courts} &emsp;
      <a href="#" onClick={enterEdit}>
        Edit
      </a>
      <br />
      <br />
    </div>
  );
}

export default CourtsDialog;
