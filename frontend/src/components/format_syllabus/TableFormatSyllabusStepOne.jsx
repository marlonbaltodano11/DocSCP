import { InputsTableStepOne } from "@json/FormatSyllabus";
import { useState } from "react";

const testData = {
  "{{signatureName}}": "Matemáticas Aplicadas",
  "{{signatureCode}}": "MAT101",
  "{{modality}}": "in-person",
  "{{academicRegime}}": "semester",
  "{{careerYear}}": "2024",
  "{{credits}}": "3",
  "{{totalHours}}": "60",
  "{{weeklyFrequency}}": "3",
  "{{career}}": "Ingeniería en Cibernética Electrónica",
  "{{teacherFullname}}": "Dr. José Pérez",
  "{{deliveryDate}}": "2024-11-10",
  "{{updateDate}}": "2024-11-05",
  "{{approvedDate}}": "2024-11-12",
  "{{timetable}}": "Lunes y Miércoles, 9:00-11:00 AM",
  "{{approvedBy}}": "Departamento Académico",
};

const TableFormatSyllabusStepOne = () => {
  const [formData, setFormData] = useState(testData);

  const handleChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <tbody>
        {InputsTableStepOne.map((row, index) =>
          row.radios ? (
            <tr key={row.id}>
              <td
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#e0e0e0",
                }}
              >
                {row.label}
              </td>
              <td
                colSpan={3}
                style={{ padding: "8px", border: "1px solid #ccc" }}
              >
                {row.radios.map((radio) => (
                  <label key={radio.id} style={{ marginRight: "16px" }}>
                    <input
                      type="radio"
                      id={radio.id}
                      name={radio.name}
                      value={radio.value}
                      checked={formData[row.id] === radio.value}
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
                <td
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#e0e0e0",
                  }}
                >
                  {row.label}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                  <input
                    type={row.type}
                    id={row.id}
                    placeholder={row.placeholder}
                    defaultValue={formData[row.id]} // Usa el valor de prueba
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange(row.id, e.target.value)}
                  />
                </td>
                {InputsTableStepOne[index + 1] && (
                  <>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#e0e0e0",
                      }}
                    >
                      {InputsTableStepOne[index + 1].label}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                      <input
                        type={InputsTableStepOne[index + 1].type}
                        id={InputsTableStepOne[index + 1].id}
                        placeholder={InputsTableStepOne[index + 1].placeholder}
                        defaultValue={
                          formData[InputsTableStepOne[index + 1].id]
                        } // Usa el valor de prueba
                        style={{ width: "100%" }}
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
