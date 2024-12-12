import { InputsTableStepOne } from "@json/FormatSyllabus";
import "@styles/format_syllabus/general-information-table.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { resetEntireGlobalState } from "../../utils/ResetGlobalState";
import { useGlobalDispatch } from "../../global_context/GlobalProvider";

const TableFormatSyllabusStepOne = ({ formData, onFormDataChange }) => {
  const handleChange = (id, value) => {
    // Verificar si la clave pertenece a `checkboxes`
    if (id in formData.checkboxes) {
      onFormDataChange("checkboxes", { ...formData.checkboxes, [id]: value });
    } else {
      onFormDataChange(id, value);
    }
  };

  const dispatch = useGlobalDispatch();
  /*
  useEffect(() => {
    resetEntireGlobalState(dispatch);
  }, []);*/

  return (
    <table className="general-information-table">
      <tbody>
        {InputsTableStepOne.map((row, index) =>
          row.radios ? (
            <tr key={row.id}>
              <td className="table-label">{row.label}</td>
              <td className="radio-group" colSpan={3}>
                {row.radios.map((radio) => (
                  <label key={radio.id} className="radio-label">
                    <input
                      type="radio"
                      id={radio.id}
                      name={radio.name}
                      value={radio.value}
                      checked={formData.checkboxes[row.id] === radio.value}
                      onChange={(e) => handleChange(row.id, e.target.value)}
                    />
                    {radio.label}
                  </label>
                ))}
              </td>
            </tr>
          ) : (
            index % 2 === 0 && (
              <tr key={row.id}>
                <td className="table-label">{row.label}</td>
                <td>
                  <input
                    type={row.type}
                    id={row.id}
                    placeholder={row.placeholder}
                    value={
                      row.id in formData.checkboxes
                        ? formData.checkboxes[row.id]
                        : formData[row.id] || ""
                    }
                    className="input-field"
                    onChange={(e) => handleChange(row.id, e.target.value)}
                  />
                </td>
                {InputsTableStepOne[index + 1] && (
                  <>
                    <td className="table-label">
                      {InputsTableStepOne[index + 1].label}
                    </td>
                    <td>
                      <input
                        type={InputsTableStepOne[index + 1].type}
                        id={InputsTableStepOne[index + 1].id}
                        placeholder={InputsTableStepOne[index + 1].placeholder}
                        value={
                          InputsTableStepOne[index + 1].id in
                          formData.checkboxes
                            ? formData.checkboxes[
                                InputsTableStepOne[index + 1].id
                              ]
                            : formData[InputsTableStepOne[index + 1].id] || ""
                        }
                        className="input-field"
                        onChange={(e) =>
                          handleChange(
                            InputsTableStepOne[index + 1].id,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </>
                )}
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  );
};

export default TableFormatSyllabusStepOne;

TableFormatSyllabusStepOne.propTypes = {
  formData: PropTypes.shape({
    checkboxes: PropTypes.object.isRequired,
  }).isRequired,
  onFormDataChange: PropTypes.func.isRequired,
};
