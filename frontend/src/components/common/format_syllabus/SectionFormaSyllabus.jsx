import PropTypes from "prop-types";
import "@styles/format_syllabus/section-format-syllabus.css";
import NavigateSectionArrow from "@assets/format_syllabus/navigate_section_arrow.svg";

const SectionFormaSyllabus = ({
  children,
  IconDecoration,
  Title,
  IdNextSection,
  IdPreviousSection,
  IdSection,
}) => {
  const navigateTo = (section) => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        const offset = 120; // Ajusta el espacio deseado en píxeles
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section id={IdSection} className="section-format-syllabus-container">
      <nav className="section-nav-container">
        <div className="section-nav-title">
          <img src={IconDecoration} alt="" />
          <h2>{Title}</h2>
        </div>
        {IdNextSection || IdPreviousSection ? (
          <div className="section-nav-buttons">
            <button
              className={!IdPreviousSection ? "btn-disabled" : ""}
              onClick={() => navigateTo(IdPreviousSection)}
              aria-label="Sección anterior"
              disabled={!IdPreviousSection}
            >
              <img src={NavigateSectionArrow} alt="Ir a la sección anterior" />
            </button>

            <button
              className={!IdNextSection ? "btn-disabled" : ""}
              onClick={() => navigateTo(IdNextSection)}
              aria-label="Siguiente sección"
              disabled={!IdNextSection}
            >
              <img
                src={NavigateSectionArrow}
                className="invert-direction"
                alt="Ir a la siguiente sección"
              />
            </button>
          </div>
        ) : null}
      </nav>
      <div className="section-content-container">{children}</div>
    </section>
  );
};

SectionFormaSyllabus.propTypes = {
  children: PropTypes.node.isRequired,
  IconDecoration: PropTypes.elementType,
  Title: PropTypes.string.isRequired,
  IdNextSection: PropTypes.string,
  IdPreviousSection: PropTypes.string,
  IdSection: PropTypes.string.isRequired,
};

SectionFormaSyllabus.defaultProps = {
  IdNextSection: null,
  IdPreviousSection: null,
};

export default SectionFormaSyllabus;
