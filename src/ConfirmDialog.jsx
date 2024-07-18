import { useEffect, useRef } from "react";

function ConfirmDialog({ dialogVisible, message, onConfirm, onCancel }) {
  const ref = useRef();
  useEffect(() => {
    if (dialogVisible) {
      ref.current?.showModal();
      ref.current?.focus();
    } else {
      ref.current?.close();
    }
  }, [dialogVisible, message]);
  return (
    <dialog ref={ref} onCancel={onCancel}>
      <p>
        <b>{message}</b>
      </p>
      <button
        className="pure-button pure-button-primary button-margin-right"
        onClick={onConfirm}
      >
        Confirm
      </button>
      <button className="pure-button" onClick={onCancel}>
        Cancel
      </button>
    </dialog>
  );
}

export default ConfirmDialog;
