import "@styles/format_syllabus/navigation_head.css";
import PropTypes from "prop-types";
import NavigateArrowBlackIcon from "@assets/format_syllabus/navigation_arrow_black_icon.svg";
import { useNavigate } from "react-router-dom";
import NavigationHeadIcon from "@assets/format_syllabus/navigate_head_icon.svg";

const NavigationHead = ({ NumberView, TitleHead, NextPage, PreviousPage }) => {
  const navigate = useNavigate();

  const NavigateToNextPage = () => {
    navigate(NextPage);
  };
  const NavigateToPreviousPage = () => {
    navigate(PreviousPage);
  };

  return (
    <section className="header-format-syllabus">
      <div className="icon-title-container">
        <img src={NavigationHeadIcon} alt="" />
        <p>{TitleHead}</p>
      </div>
      <div className="navigation-arrow-container">
        {NextPage || PreviousPage ? (
          <>
            <img
              onClick={NavigateToPreviousPage}
              className="invert-arrow"
              src={!PreviousPage ? "" : NavigateArrowBlackIcon}
              alt=""
            />
            <p>Paso {NumberView}</p>
            <img
              onClick={NavigateToNextPage}
              src={!NextPage ? "" : NavigateArrowBlackIcon}
              alt=""
            />{" "}
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

NavigationHead.propTypes = {
  NumberView: PropTypes.number.isRequired,
  TitleHead: PropTypes.string.isRequired,
  NextPage: PropTypes.string,
  PreviousPage: PropTypes.string,
};

NavigationHead.defaultProps = {
  NextPage: null,
  PreviousPage: null,
};

export default NavigationHead;
