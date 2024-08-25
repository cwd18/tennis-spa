import { useEffect, useState, useRef, Fragment } from "react";
import globalData from "./GlobalData";
import ConfirmDialog from "./ConfirmDialog";

function UserDialog({
  dialogVisible,
  userData,
  fixtureid,
  cancelDialog,
  incrementViewTime,
}) {
  const [edited, setEdited] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const { apiServer } = globalData;
  const ref = useRef();
  useEffect(() => {
    if (dialogVisible) {
      ref.current?.showModal();
      ref.current?.focus();
    } else {
      ref.current?.close();
    }
  }, [dialogVisible, userData]);
  const cancel = () => {
    setEdited(false);
    setConfirmDialogVisible(false);
    cancelDialog();
  };
  const updateUserData = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    fetch(apiServer + "/api/user/" + (userData ? userData.Userid : 0), {
      credentials: "include",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    })
      .then(cancel)
      .then(incrementViewTime); // refresh the user list
  };
  const deleteUser = (scope) => {
    fetch(
      apiServer +
        "/api/user/" +
        scope +
        "/" +
        fixtureid +
        "/" +
        userData.Userid,
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(cancel)
      .then(incrementViewTime); // refresh the user list
  };
  if (!dialogVisible) return null;
  return (
    <dialog ref={ref} onCancel={cancel}>
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
              defaultValue={userData ? userData.FirstName : ""}
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
              defaultValue={userData ? userData.LastName : ""}
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
              defaultValue={userData ? userData.EmailAddress : ""}
              onChange={() => setEdited(true)}
            />
          </label>
        </p>
        <p>
          <label className="pure-checkbox">
            <input
              name="booker"
              type="checkbox"
              defaultChecked={userData ? userData.Booker : false}
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
            {userData ? "Update" : "Add"}
          </button>
        )}
        <button type="button" className="pure-button" onClick={cancel}>
          Cancel
        </button>
      </form>
      <br />
      <hr />
      <br />
      {fixtureid === 0 ? (
        <Fragment>
          <button
            className="pure-button"
            onClick={() => setConfirmDialogVisible(true)}
          >
            Delete user
          </button>
          <ConfirmDialog
            dialogVisible={confirmDialogVisible}
            message="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser("global")}
            onCancel={() => setConfirmDialogVisible(false)}
          />
        </Fragment>
      ) : (
        <div>
          <button className="pure-button" onClick={() => deleteUser("fixture")}>
            Remove user from fixture
          </button>
          <br />
          <br />
          <button className="pure-button" onClick={() => deleteUser("all")}>
            Remove user from all fixtures
          </button>
        </div>
      )}
    </dialog>
  );
}

export default UserDialog;
