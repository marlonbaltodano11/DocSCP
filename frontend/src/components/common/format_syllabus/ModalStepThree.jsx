import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useGlobalState } from "@global_context/GlobalProvider";
import "@styles/format_syllabus/format-syllabus-modal.css";

const ModalStepThree = ({
  title,
  typeTitle,
  icon,
  buttonClass,
  onSave,
  unitName,
  initialSelectedTopics = [],
}) => {
  const dialogRef = useRef(null);
  const { AcademicCalendarObject } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  // Filtrar topics de la unidad seleccionada
  const topics =
    AcademicCalendarObject.coursePlan.find((unit) => unit.unitName === unitName)
      ?.topics || [];

  const openDialog = () => {
    setIsModalOpen(true);
    setSelectedTopics(initialSelectedTopics); // Sincronizar los valores iniciales
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setIsModalOpen(false);
    if (dialogRef.current) dialogRef.current.close();
  };

  const handleSave = () => {
    onSave(selectedTopics); // Guardar los temas seleccionados
    closeDialog();
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  return (
    <>
      <button
        className={`small-modal-button modal-btn-step-3 ${buttonClass}`}
        onClick={openDialog}
      >
        {icon && <img src={icon} alt="icon" className="button-icon" />}
      </button>

      <dialog className="format-syllabus-modal step-three" ref={dialogRef}>
        <header className="modal-header">
          <h2>
            {title} <span>{typeTitle}</span>
          </h2>
        </header>

        <section className="elements-section-modal">
          {topics.map((topic, index) => (
            <div key={index} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedTopics?.includes(topic)}
                onChange={() => handleTopicSelect(topic)}
              />
              <label>{topic}</label>
            </div>
          ))}
        </section>

        <footer className="modal-footer">
          <button className="modal-confirm-btn" onClick={handleSave}>
            Guardar
          </button>
        </footer>
        <button className="modal-cancel-btn" onClick={closeDialog}>
          x
        </button>
      </dialog>
    </>
  );
};

ModalStepThree.propTypes = {
  title: PropTypes.string.isRequired,
  typeTitle: PropTypes.string.isRequired,
  icon: PropTypes.element,
  buttonClass: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  unitName: PropTypes.string.isRequired,
  initialSelectedTopics: PropTypes.array, // Valores iniciales de los temas seleccionados
};

export default ModalStepThree;
