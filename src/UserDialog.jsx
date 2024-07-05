import { useEffect, useRef } from "react";

function UserDialog({ dialog, userData, cancelDialog }) {
  const ref = useRef();
  useEffect(() => {
    if (dialog) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [dialog, userData]);
  if (!dialog) return null;
  return (
    <dialog ref={ref} onCancel={cancelDialog}>
      <h3>Update user</h3>
      <p>
        <label>
          First Name
          <br />
          <input name="fname" defaultValue={userData.FirstName} />
        </label>
      </p>
      <p>
        <label>
          Last Name
          <br />
          <input name="lname" defaultValue={userData.LastName} />
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
          />
        </label>
      </p>
      <p>
        <label className="pure-checkbox">
          <input
            name="booker"
            type="checkbox"
            defaultChecked={userData.Booker}
          />{" "}
          Booker
        </label>
      </p>
      <button
        className="pure-button pure-button-primary button-margin-right"
        onClick={cancelDialog}
      >
        Update
      </button>
      <button className="pure-button" onClick={cancelDialog}>
        Cancel
      </button>
      <br />
      <br />
      <button className="pure-button" onClick={cancelDialog}>
        Delete this user
      </button>
    </dialog>
  );
}

export default UserDialog;
