import PropTypes from "prop-types";
import { useGlobalState } from "@global_context/GlobalProvider";
import { romanNumber } from "../../json/RomansNumbers";

const InputSelectStepThree = ({ value, onChange }) => {
  const { AcademicCalendarObject } = useGlobalState();
  const UnitsName = AcademicCalendarObject.coursePlan || [];

  // Extraer nombres únicos de unidades de la tabla
  const unitOptions = [
    ...new Set(UnitsName.map((unit) => unit.unitName).filter(Boolean)),
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="select-input-container">
      <select
        className="select-input shadow"
        value={value}
        onChange={handleChange}
      >
        <option value="">Selecciona Unidad...</option>
        {unitOptions
          .filter((unit) => !unit.toLowerCase().includes("examen")) // Excluir "Examen"
          .map((unit, index) => (
            <option key={index} value={unit}>
              {romanNumber[index] + "-" + unit}
            </option>
          ))}
      </select>
    </div>
  );
};

InputSelectStepThree.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputSelectStepThree;
