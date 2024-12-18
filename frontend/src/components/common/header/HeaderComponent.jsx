import HeaderLeftSide from "@assets/header/header_left_icon.svg";
import HeaderRightSide from "@assets/header/header_right_icon.svg";
import "@styles/header/header-styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationOverlay from "../notification_overlay/NotificationOverlay";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [overlayType, setOverlayType] = useState(null);

  const goHome = () => {
    navigate("/upload-document");
    setModalOpen(false);
  };
  const closeOverlay = () => setModalOpen(false);

  const overlayActions = {
    goHome,
    closeOverlay,
  };

  return (
    <header className="header-container shadow main-header">
      <img
        onClick={() => {
          setOverlayType(1);
          setModalOpen(true);
        }}
        className="imagotype-header"
        src={HeaderLeftSide}
        alt=""
      />
      <div>
        <img className="decoration-right-header" src={HeaderRightSide} alt="" />
      </div>
      {overlayType !== null && (
        <NotificationOverlay
          OverlayType={overlayType}
          IsModalOpen={isModalOpen}
          overlayActions={overlayActions}
        />
      )}
    </header>
  );
};

export default HeaderComponent;
