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
  const processForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const selectedUsers = [];
    for (const key of formData.keys()) {
      if (key.startsWith("user_")) {
        selectedUsers.push(formData.get(key));
      }
    }
    onSelect(selectedUsers);
  };
  return (
    <dialog ref={ref} onCancel={onCancel}>
      <p>
        <b>{message}</b>
      </p>
      <form onSubmit={processForm}>
        {users.map((u, index) => (
          <label key={u.Userid} className="pure-checkbox">
            <input type="checkbox" name={"user_" + u.Userid} value={u.Userid} />
            {u.FirstName + " " + u.LastName}
            <br />
          </label>
        ))}
        <br />
        <button className="pure-button pure-button-primary button-margin-right">
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
