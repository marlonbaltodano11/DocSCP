import PropTypes from "prop-types";

const MainComponent = ({ children }) => {
  return <main className="principal-main">{children}</main>;
};

export default MainComponent;

MainComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
