import React from "react";

import style from "./Modal.module.css";

const Modal = ({ show, children }) => {
  return (
    <div
      className={style.modalOverlay}
      style={{ display: show ? "flex" : "none" }}
    >
      <div className={style.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;
