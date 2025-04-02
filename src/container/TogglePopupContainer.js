// container/TogglePopupContainer.js
import React, { useState } from "react";
import TogglePopup from "../component/TogglePopup";

const TogglePopupContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openPopup}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "0.75rem 1.25rem",
          backgroundColor: "#6b7280",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        옵션 설정 열기
      </button>

      {isOpen && <TogglePopup onClose={closePopup} />}
    </>
  );
};

export default TogglePopupContainer;
