import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "@styles/notification_overlay/notification-overlay.css";
import {
  OverlayDataMap,
  ClassNameList,
} from "../../../config/overlay_config/OverlayConfig";

const NotificationOverlay = ({
  OverlayType = 0,
  IsModalOpen = false,
  overlayActions = {},
}) => {
  const dialogRef = useRef(null);

  const data = OverlayDataMap[OverlayType] || {};
  const { Icon = null, Title = "", Subtitle = "", ButtonsArray = [] } = data;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (IsModalOpen && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!IsModalOpen && dialog && dialog.open) {
      dialog.close();
    }
  }, [IsModalOpen]);

  return (
    <dialog
      className={
        ClassNameList[OverlayType] +
        " dialog-overlay " +
        (IsModalOpen ? "open" : "")
      }
      ref={dialogRef}
    >
      <div>
        {Icon && <img src={Icon} alt="Notification Icon" />}
        <h3>{Title}</h3>
        <p>{Subtitle}</p>
        <section className="section-button">
          {ButtonsArray.map((button, index) => {
            const onClickAction =
              button.actionKey && overlayActions[button.actionKey]
                ? overlayActions[button.actionKey]
                : () => {};
            return (
              <button
                className={button.className + " shadow"}
                key={index}
                onClick={onClickAction}
              >
                {button.title}
              </button>
            );
          })}
        </section>
      </div>
    </dialog>
  );
};

NotificationOverlay.propTypes = {
  OverlayType: PropTypes.number,
  IsModalOpen: PropTypes.bool.isRequired,
  overlayActions: PropTypes.object,
};

export default NotificationOverlay;
