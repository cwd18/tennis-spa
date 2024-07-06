import { useEffect, useState, useRef } from "react";
import globalData from "./GlobalData";

function UserDialog({ dialog, userData, cancelDialog, setViewTime }) {
  const [edited, setEdited] = useState(false);
  const { apiServer } = globalData;
  const ref = useRef();
  useEffect(() => {
    if (dialog) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [dialog, userData]);
  const updateUserData = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch(apiServer + "/api/user/" + userData.Userid, {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then(cancelDialog)
      .then(() => setViewTime((vt) => vt + 1)); // refresh the user list
  };
  if (!dialog) return null;
  return (
    <dialog ref={ref} onCancel={cancelDialog}>
      <p>
        <b>Update user</b>
      </p>
      <form onSubmit={updateUserData}>
        <p>
          <label>
            First Name
            <br />
            <input
              name="fname"
              defaultValue={userData.FirstName}
              onChange={() => setEdited(true)}
            />
          </label>
        </p>
        <p>
          <label>
            Last Name
            <br />
            <input
              name="lname"
              defaultValue={userData.LastName}
              onChange={() => setEdited(true)}
            />
          </label>
        </p>
        <p>
          <label>
            Email
            <br />
            <input
              style={{ width: "300px" }}
              type="email"
              name="email"
              defaultValue={userData.EmailAddress}
              onChange={() => setEdited(true)}
            />
          </label>
        </p>
        <p>
          <label className="pure-checkbox">
            <input
              name="booker"
              type="checkbox"
              defaultChecked={userData.Booker}
              onChange={() => setEdited(true)}
            />{" "}
            Booker
          </label>
        </p>
        {edited && (
          <button
            type="submit"
            className="pure-button pure-button-primary button-margin-right"
          >
            Update
          </button>
        )}
        <button type="button" className="pure-button" onClick={cancelDialog}>
          Cancel
        </button>
      </form>
      <br />
      <hr />
      <br />
      <button className="pure-button" onClick={cancelDialog}>
        Delete this user
      </button>
    </dialog>
  );
}

export default UserDialog;
