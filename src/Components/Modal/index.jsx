import css from "./Modal.module.scss";

function Modal({ onClose, children }) {
  return (
    <div className={css.wrapper}>
      <div className={css.overlay} onClick={onClose} />
      <div className={css.window}>
        <button
          className={css.close}
          aria-label="Close modal"
          onClick={onClose}
        >
          <svg
            version="1.1"
            viewBox="0 0 36 36"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g id="Layer_1" />
            <g id="icons">
              <path
                class="st0"
                d="M6.2,3.5L3.5,6.2c-0.7,0.7-0.7,1.9,0,2.7l9.2,9.2l-9.2,9.2c-0.7,0.7-0.7,1.9,0,2.7l2.6,2.6   c0.7,0.7,1.9,0.7,2.7,0l9.2-9.2l9.2,9.2c0.7,0.7,1.9,0.7,2.7,0l2.6-2.6c0.7-0.7,0.7-1.9,0-2.7L23.3,18l9.2-9.2   c0.7-0.7,0.7-1.9,0-2.7l-2.6-2.6c-0.7-0.7-1.9-0.7-2.7,0L18,12.7L8.8,3.5C8.1,2.8,6.9,2.8,6.2,3.5z"
                id="close_1_"
              />
            </g>
          </svg>
        </button>
        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
