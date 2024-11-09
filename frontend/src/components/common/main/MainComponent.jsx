import PropTypes from "prop-types";

const MainComponent = ({ children }) => {
  return <div className="principal-main">{children}</div>;
};

export default MainComponent;

MainComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
