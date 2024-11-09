import PropTypes from "prop-types";
import NavigateArrowIcon from "@assets/academic_cycle/navigate_arrow_icon.svg";
import "@styles/academic_preparation_container/academic-preparation-container.css";
import { useNavigate } from "react-router-dom";

const AcademicPreparationContainer = ({
  IconHead,
  NumberView,
  TitleHead,
  children,
  NextPage,
  PreviousPage,
  NewClass,
}) => {
  const navigate = useNavigate();

  const NavigateToNextPage = () => {
    navigate(NextPage);
  };
  const NavigateToPreviousPage = () => {
    navigate(PreviousPage);
  };

  return (
    <div className="main-container-academic-preparation">
      <section className="header-academic-preparation">
        <div className="icon-title-container">
          <img src={IconHead} alt="" />
          <p>{TitleHead}</p>
        </div>
        <div className="navigation-arrow-container">
          <img
            onClick={NavigateToPreviousPage}
            className="invert-arrow"
            src={!PreviousPage ? "" : NavigateArrowIcon}
            alt=""
          />
          <p>Paso {NumberView}</p>
          <img
            onClick={NavigateToNextPage}
            src={!NextPage ? "" : NavigateArrowIcon}
            alt=""
          />
        </div>
      </section>
      <section className={`content-academic-preparation ${NewClass}`}>
        {children}
      </section>
    </div>
  );
};

export default AcademicPreparationContainer;

AcademicPreparationContainer.propTypes = {
  IconHead: PropTypes.elementType.isRequired,
  NumberView: PropTypes.number.isRequired,
  TitleHead: PropTypes.string.isRequired,
  children: PropTypes.node,
  NextPage: PropTypes.string,
  PreviousPage: PropTypes.string,
  NewClass: PropTypes.string,
};

AcademicPreparationContainer.defaultProps = {
  NextPage: null,
  PreviousPage: null,
  NewClass: "",
};
