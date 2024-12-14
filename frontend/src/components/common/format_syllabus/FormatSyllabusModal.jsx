import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "@styles/format_syllabus/format-syllabus-modal.css";
import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";

const FormatSyllabusModal = ({
  title,
  typeTitle,
  icon,
  buttonClass,
  columnKey,
  mode,
  rowIndex,
  colIndex,
}) => {
  const dialogRef = useRef(null);
  const { CheckBoxesValue, FormatSyllabusObject } = useGlobalState();
  const dispatch = useGlobalDispatch();

  // Estados locales
  const [localCheckboxes, setLocalCheckboxes] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [newCheckbox, setNewCheckbox] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sincroniza el estado global si está vacío con los valores de la tabla
  useEffect(() => {
    const globalCheckboxes = CheckBoxesValue.GlobalCheckboxes[columnKey] || [];
    if (!isModalOpen) {
      return;
    }
    if (mode === "individual") {
      const individualCheckboxes =
        FormatSyllabusObject.microplanningTable[rowIndex]?.[colIndex]
          ?.split("\n")
          .filter(Boolean) || [];
      setLocalCheckboxes([
        ...new Set([...globalCheckboxes, ...individualCheckboxes]),
      ]);
      setSelectedCheckboxes(individualCheckboxes);
    } else if (mode === "global") {
      setLocalCheckboxes(globalCheckboxes);
      setSelectedCheckboxes(globalCheckboxes);
    }
  }, [
    CheckBoxesValue,
    FormatSyllabusObject,
    columnKey,
    mode,
    rowIndex,
    colIndex,
    isModalOpen,
  ]);

  // Abre el modal
  const openDialog = () => {
    handleAddCheckbox();
    setIsModalOpen(true);
    if (dialogRef.current) dialogRef.current.showModal();
  };

  // Cierra el modal
  const closeDialog = () => {
    setIsModalOpen(false);
    if (dialogRef.current) dialogRef.current.close();
  };

  // Agregar un nuevo checkbox al estado global
  const handleAddCheckbox = () => {
    if (newCheckbox.trim() && !localCheckboxes.includes(newCheckbox)) {
      const updatedCheckboxes = [...localCheckboxes, newCheckbox];

      // Actualizar estado global
      dispatch({
        type: "ADD_GLOBAL_CHECKBOX",
        payload: { columnKey, value: newCheckbox },
      });

      setLocalCheckboxes(updatedCheckboxes);
      setNewCheckbox("");
    }
  };

  // Manejar selección de checkbox
  const handleCheckboxSelect = (checkbox) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(checkbox)
        ? prev.filter((item) => item !== checkbox)
        : [...prev, checkbox]
    );
  };

  // Guardar cambios
  const handleSave = () => {
    if (mode === "global") {
      // Aplicar cambios globales a toda la columna de la tabla
      dispatch({
        type: "APPLY_CHECKBOXES_TO_TABLE",
        payload: { columnKey, values: selectedCheckboxes },
      });
    } else if (mode === "individual") {
      // Actualizar solo la celda específica
      const updatedTable = [...FormatSyllabusObject.microplanningTable];
      updatedTable[rowIndex][colIndex] = selectedCheckboxes.join("\n");
      dispatch({
        type: "UPDATE_FORMAT_SYLLABUS",
        payload: { key: "microplanningTable", value: updatedTable },
      });
    }

    closeDialog();
  };

  return (
    <>
      <button
        className={`small-modal-button ${buttonClass}`}
        onClick={openDialog}
      >
        {icon && <img src={icon} alt="icon" className="button-icon" />}
      </button>

      <dialog className="format-syllabus-modal" ref={dialogRef}>
        <header className="modal-header">
          <h2>
            {title} <span>{typeTitle}</span>
          </h2>
        </header>

        <section className="add-new-element-section-modal">
          <input
            className="shadow"
            type="text"
            value={newCheckbox}
            onChange={(e) => setNewCheckbox(e.target.value)}
          />
          <button onClick={handleAddCheckbox}>Agregar</button>
        </section>

        <section className="elements-section-modal">
          {localCheckboxes?.map((checkbox, index) => (
            <div key={index} className="checkbox-item">
              <input
                type="checkbox"
                checked={selectedCheckboxes.includes(checkbox)}
                onChange={() => handleCheckboxSelect(checkbox)}
              />
              <label>{checkbox}</label>
            </div>
          ))}
        </section>
        <section className="previsualization-element-modal">
          <h2>Previsualización Previa:</h2>
          <p>
            {" "}
            {selectedCheckboxes.map((data, index) => (
              <span key={index}>
                {data}
                {index < selectedCheckboxes.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
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

FormatSyllabusModal.propTypes = {
  title: PropTypes.string,
  typeTitle: PropTypes.string,
  icon: PropTypes.element,
  buttonClass: PropTypes.string,
  columnKey: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(["global", "individual"]).isRequired,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default FormatSyllabusModal;
