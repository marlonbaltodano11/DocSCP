import PropTypes from "prop-types";
import "@styles/format_syllabus/section-format-syllabus.css";

const SectionFormaSyllabus = ({
  children,
  IconDecoration,
  Title,
  NextSection,
  PreviousSection,
  idSection,
}) => {
  const navigateTo = (section) => {
    if (section) window.location.href = section;
  };

  return (
    <section id={idSection} className="section-format-syllabus-container">
      <nav className="section-nav-container">
        <div className="section-nav-title">
          {IconDecoration && <IconDecoration />}
          <h2>{Title}</h2>
        </div>
        <div className="section-nav-buttons">
          {PreviousSection && (
            <button
              onClick={() => navigateTo(PreviousSection)}
              aria-label="Sección anterior"
            >
              <img src="" alt="Ir a la sección anterior" />
            </button>
          )}
          {NextSection && (
            <button
              onClick={() => navigateTo(NextSection)}
              aria-label="Siguiente sección"
            >
              <img src="" alt="Ir a la siguiente sección" />
            </button>
          )}
        </div>
      </nav>
      <div className="section-content-container">{children}</div>
    </section>
  );
};

SectionFormaSyllabus.propTypes = {
  children: PropTypes.node.isRequired,
  IconDecoration: PropTypes.elementType,
  Title: PropTypes.string.isRequired,
  NextSection: PropTypes.string,
  PreviousSection: PropTypes.string,
  idSection: PropTypes.string.isRequired,
};

SectionFormaSyllabus.defaultProps = {
  NextSection: null,
  PreviousSection: null,
};

export default SectionFormaSyllabus;
