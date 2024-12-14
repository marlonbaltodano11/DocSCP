import HeaderLeftSide from "@assets/header/header_left_icon.svg";
import HeaderRightSide from "@assets/header/header_right_icon.svg";
import "@styles/header/header-styles.css";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <header className="header-container shadow main-header">
      <img
        onClick={() => {
          const onConfirm = confirm("¿Seguro de volver?");
          if (onConfirm) {
            setTimeout(() => {
              navigate("/");
            }, 500); // 1 segundo de retraso
          }
        }}
        className="imagotype-header"
        src={HeaderLeftSide}
        alt=""
      />
      <div>
        <img className="decoration-right-header" src={HeaderRightSide} alt="" />
      </div>
    </header>
  );
};

export default HeaderComponent;
