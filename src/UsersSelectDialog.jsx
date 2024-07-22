import { useEffect, useRef } from "react";

function UsersSelectDialog({
  dialogVisible,
  message,
  users,
  onSelect,
  onCancel,
}) {
  const ref = useRef();
  useEffect(() => {
    if (dialogVisible) {
      ref.current?.showModal();
      ref.current?.focus();
    } else {
      ref.current?.close();
    }
  }, [dialogVisible, message, users]);
  return (
    <dialog ref={ref} onCancel={onCancel}>
      <p>
        <b>{message}</b>
      </p>
      <form onSubmit={onSelect}>
        {users.map((u, index) => (
          <label key={u.Userid} className="pure-checkbox">
            <input type="checkbox" name={"user_" + u.Userid} value={u.Userid} />
            {u.FirstName + " " + u.LastName}
            <br />
          </label>
        ))}
        <br />
        <button
          className="pure-button pure-button-primary button-margin-right"
          onClick={onSelect}
        >
          Confirm
        </button>
        <button className="pure-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </dialog>
  );
}

export default UsersSelectDialog;
