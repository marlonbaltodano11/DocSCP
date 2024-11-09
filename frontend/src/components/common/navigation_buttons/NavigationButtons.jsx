import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "@styles/navigation_buttons/navigation-buttons.css";

const NavigationButtons = ({
  NextPage,
  PreviousPage,
  TitleNextPage = "Siguiente",
  TitlePreviousPage = "Volver",
  IconButtonNextPage,
  IconButtonPrevioustPage = null,
  FunctionNextPage = null,
}) => {
  const navigate = useNavigate();

  const handleNextPage = () => {
    if (FunctionNextPage) {
      FunctionNextPage();
      return;
    }
    navigate(NextPage);
  };

  const handlePreviousPage = () => {
    navigate(PreviousPage);
  };

  return (
    <section className="navigation-button-container">
      {PreviousPage ? (
        <button
          onClick={handlePreviousPage}
          className="previous-page-button shadow"
        >
          {" "}
          <img src={IconButtonPrevioustPage || ""} alt="" />
          {TitlePreviousPage}{" "}
        </button>
      ) : (
        ""
      )}
      {NextPage || FunctionNextPage ? (
        <button onClick={handleNextPage} className="next-page-button shadow">
          {" "}
          <img src={IconButtonNextPage || ""} alt="" />
          {TitleNextPage}
        </button>
      ) : (
        ""
      )}
    </section>
  );
};

export default NavigationButtons;

NavigationButtons.propTypes = {
  NextPage: PropTypes.string,
  PreviousPage: PropTypes.string,
  TitleNextPage: PropTypes.string,
  TitlePreviousPage: PropTypes.string,
  IconButtonNextPage: PropTypes.element,
  IconButtonPrevioustPage: PropTypes.element,
  FunctionNextPage: PropTypes.func,
};
