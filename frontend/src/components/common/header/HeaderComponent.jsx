import HeaderLeftSide from "@assets/header/header_left_icon.svg";
import HeaderRightSide from "@assets/header/header_right_icon.svg";
import "@styles/header/header-styles.css";

const HeaderComponent = () => {
  return (
    <header className="header-container shadow main-header">
      <img className="imagotype-header" src={HeaderLeftSide} alt="" />
      <div>
        <img className="decoration-right-header" src={HeaderRightSide} alt="" />
      </div>
    </header>
  );
};

export default HeaderComponent;
