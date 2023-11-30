import CrossIcon from "../../assets/icons/xmark.svg?react";

import css from "./Modal.module.scss";

function Modal({ onClose, children }) {
  return (
    <div className={css.wrapper}>
      <div className={css.overlay} onClick={onClose} />
      <div className={css.window}>
        <button className={css.close} title="Close modal" onClick={onClose}>
          <CrossIcon />
        </button>
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
