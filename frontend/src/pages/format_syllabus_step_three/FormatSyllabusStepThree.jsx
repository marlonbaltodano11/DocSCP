import NavigationHead from "@components/common/format_syllabus/NavigationHead";
import SuperiorActionMenu from "@components/common/format_syllabus/SuperiorActionMenu";
import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import SectionFormaSyllabus from "@components/common/format_syllabus/SectionFormaSyllabus";
import CardTextIcon from "@assets/format_syllabus/card_text_icon.svg";
import DateInput from "../../components/common/date_input/DateInput";
import InputSelectStepThree from "../../components/format_syllabus/InputSelectStepThree";
import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import "@styles/format_syllabus/schedule-table.css";
import DeleteScheduleRow from "@assets/format_syllabus/delete_schedule_row.svg";
import AddScheduleRow from "@assets/format_syllabus/add_schedule_row.svg";

const FormatSyllabusStepThree = () => {
  // Acceso al estado global
  const { FormatSyllabusObject } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const scheduleTable = FormatSyllabusObject.scheduleTable;

  // Función para manejar cambios en las celdas de la tabla
  const handleCellChange = (rowIndex, colIndex, value, partialType) => {
    const updatedTable = [...scheduleTable[partialType]];
    updatedTable[rowIndex][colIndex] = value;

    // Actualizar el estado global
    dispatch({
      type: "UPDATE_SCHEDULE_TABLE",
      payload: {
        partialType,
        value: updatedTable,
      },
    });
  };

  // Función para calcular el puntaje total
  const calculateTotal = (partialType) => {
    return scheduleTable[partialType]?.reduce(
      (sum, row) => sum + (parseFloat(row[4]) || 0),
      0
    );
  };

  return (
    <MainComponent>
      <HeaderComponent />
      <main>
        <SuperiorActionMenu />
        <NavigationHead
          TitleHead="Previsualización del formato Syllabus"
          NumberView={3}
          PreviousPage="/format-syllabus/step_2"
        />
        <SectionFormaSyllabus
          Title="VII. Cronograma de Evaluación de aprendizaje"
          IconDecoration={CardTextIcon}
        >
          <textarea
            className="shadow"
            name="scheduleDescription"
            value={FormatSyllabusObject["{{scheduleDescription}}"]}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FORMAT_SYLLABUS",
                payload: {
                  key: "{{scheduleDescription}}",
                  value: e.target.value,
                },
              })
            }
          />
        </SectionFormaSyllabus>

        <section>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Semana y Fecha</th>
                <th>Número De La Unidad Temática</th>
                <th>Forma/Tipo de Evaluación</th>
                <th>Contenidos a Evaluar</th>
                <th>Puntaje</th>
                <th>Observación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Primer parcial */}
              <tr className="number-partial-tr">
                <td colSpan="7">Primer parcial</td>
              </tr>
              {scheduleTable.firstPartial.map((row, rowIndex) => (
                <tr key={`first-${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>
                      {colIndex === 0 ? (
                        <DateInput
                          value={cell || ""} // Aseguramos que `cell` sea una cadena válida o vacía
                          onChange={(newValue) => {
                            const formattedValue = new Date(newValue)
                              .toISOString()
                              .split("T")[0]; // Convertimos el valor a formato ISO (YYYY-MM-DD)
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              formattedValue,
                              "firstPartial"
                            ); // Actualizamos el estado global
                          }}
                          IsTable={true} // Indicamos que el DateInput está en modo tabla
                        />
                      ) : colIndex === 1 ? (
                        <InputSelectStepThree
                          value={cell || ""}
                          onChange={(newValue) =>
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              newValue,
                              "firstPartial"
                            )
                          }
                        />
                      ) : colIndex === 4 ? (
                        <input
                          type="number"
                          className="schedule-input"
                          value={cell || ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              e.target.value,
                              "firstPartial"
                            )
                          }
                        />
                      ) : (
                        <textarea
                          className="schedule-textarea"
                          value={cell || ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              e.target.value,
                              "firstPartial"
                            )
                          }
                        />
                      )}
                    </td>
                  ))}
                  <td className="action-button-td">
                    <div>
                      <button
                        title="Agregar Fila"
                        className="action-button"
                        onClick={() => {
                          dispatch({
                            type: "ADD_ROW_TO_SCHEDULE_TABLE",
                            payload: {
                              partialType: "firstPartial", // Cambiar por el tipo de parcial correcto
                              rowIndex, // Índice de la fila donde se da clic
                            },
                          });
                        }}
                      >
                        <img src={AddScheduleRow} alt="" />
                      </button>
                      <button
                        title="Borrar Fila"
                        className="action-button"
                        onClick={() => {
                          if (scheduleTable.firstPartial.length == 1) {
                            return;
                          }
                          const updatedTable = [...scheduleTable.firstPartial];
                          updatedTable.splice(rowIndex, 1);
                          dispatch({
                            type: "UPDATE_SCHEDULE_TABLE",
                            payload: {
                              partialType: "firstPartial",
                              value: updatedTable,
                            },
                          });
                        }}
                      >
                        <img src={DeleteScheduleRow} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="punctuation-tr">
                <td colSpan="7">
                  Puntuación Total Primer Parcial:{" "}
                  <span>{calculateTotal("firstPartial")}</span>
                </td>
              </tr>

              {/* Segundo parcial */}
              <tr className="number-partial-tr">
                <td colSpan="7">Segundo parcial</td>
              </tr>
              {scheduleTable.secondPartial.map((row, rowIndex) => (
                <tr key={`second-${rowIndex}`}>
                  {row.map((cell, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`}>
                      {colIndex === 0 ? (
                        <DateInput
                          value={cell || ""} // Aseguramos que `cell` sea una cadena válida o vacía
                          onChange={(newValue) => {
                            const formattedValue = new Date(newValue)
                              .toISOString()
                              .split("T")[0]; // Convertimos el valor a formato ISO (YYYY-MM-DD)
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              formattedValue,
                              "secondPartial"
                            ); // Actualizamos el estado global
                          }}
                          IsTable={true} // Indicamos que el DateInput está en modo tabla
                        />
                      ) : colIndex === 1 ? (
                        <InputSelectStepThree
                          value={cell || ""}
                          onChange={(newValue) =>
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              newValue,
                              "secondPartial"
                            )
                          }
                        />
                      ) : colIndex === 4 ? (
                        <input
                          type="number"
                          className="schedule-input"
                          value={cell || ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              e.target.value,
                              "secondPartial"
                            )
                          }
                        />
                      ) : (
                        <textarea
                          className="schedule-textarea"
                          value={cell || ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              colIndex,
                              e.target.value,
                              "secondPartial"
                            )
                          }
                        />
                      )}
                    </td>
                  ))}
                  <td className="action-button-td">
                    <div>
                      <button
                        className="action-button"
                        title="Agregar Fila"
                        onClick={() => {
                          dispatch({
                            type: "ADD_ROW_TO_SCHEDULE_TABLE",
                            payload: {
                              partialType: "secondPartial", // Cambiar por el tipo de parcial correcto
                              rowIndex, // Índice de la fila donde se da clic
                            },
                          });
                        }}
                      >
                        <img src={AddScheduleRow} alt="" />
                      </button>
                      <button
                        className="action-button"
                        title="Borrar Fila"
                        onClick={() => {
                          if (scheduleTable.secondPartial.length == 1) {
                            return;
                          }
                          const updatedTable = [...scheduleTable.secondPartial];
                          updatedTable.splice(rowIndex, 1);
                          dispatch({
                            type: "UPDATE_SCHEDULE_TABLE",
                            payload: {
                              partialType: "secondPartial",
                              value: updatedTable,
                            },
                          });
                        }}
                      >
                        <img src={DeleteScheduleRow} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="punctuation-tr">
                <td colSpan="7">
                  Puntuación Total Segundo Parcial:{" "}
                  <span>{calculateTotal("secondPartial")}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <NavigationButtons PreviousPage="/format-syllabus/step_2" />
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default FormatSyllabusStepThree;
