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
import ModalStepThree from "../../components/common/format_syllabus/ModalStepThree";
import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import "@styles/format_syllabus/schedule-table.css";
import DeleteScheduleRow from "@assets/format_syllabus/delete_schedule_row.svg";
import AddScheduleRow from "@assets/format_syllabus/add_schedule_row.svg";
import { useEffect } from "react";

const adjustTextareaHeight = (textarea) => {
  textarea.style.height = "auto"; // Restablecer altura para recalcular
  textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar según el contenido
};

const FormatSyllabusStepThree = () => {
  const { FormatSyllabusObject } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const scheduleTable = FormatSyllabusObject.scheduleTable;

  const handleCellChange = (rowIndex, colIndex, value, partialType) => {
    const updatedTable = [...scheduleTable[partialType]];
    updatedTable[rowIndex][colIndex] = value;

    dispatch({
      type: "UPDATE_SCHEDULE_TABLE",
      payload: {
        partialType,
        value: updatedTable,
      },
    });
  };

  const calculateTotal = (partialType) => {
    return scheduleTable[partialType]?.reduce(
      (sum, row) => sum + (parseFloat(row[4]) || 0),
      0
    );
  };

  useEffect(() => {
    const textareas = document.querySelectorAll(".schedule-textarea");
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [scheduleTable]);

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
              {["firstPartial", "secondPartial"].map((partialType, idx) => (
                <>
                  <tr
                    className="number-partial-tr"
                    key={`${partialType}-header`}
                  >
                    <td colSpan="7">
                      {idx === 0 ? "Primer parcial" : "Segundo parcial"}
                    </td>
                  </tr>
                  {scheduleTable[partialType].map((row, rowIndex) => (
                    <tr key={`${partialType}-${rowIndex}`}>
                      {row.map((cell, colIndex) => (
                        <td key={`${rowIndex}-${colIndex}`}>
                          {colIndex === 0 ? (
                            <DateInput
                              value={cell || ""}
                              onChange={(newValue) => {
                                const formattedValue = new Date(newValue)
                                  .toISOString()
                                  .split("T")[0];
                                handleCellChange(
                                  rowIndex,
                                  colIndex,
                                  formattedValue,
                                  partialType
                                );
                              }}
                              IsTable={true}
                            />
                          ) : colIndex === 1 ? (
                            <InputSelectStepThree
                              value={cell || ""}
                              onChange={(newValue) =>
                                handleCellChange(
                                  rowIndex,
                                  colIndex,
                                  newValue,
                                  partialType
                                )
                              }
                            />
                          ) : colIndex === 3 ? (
                            <div>
                              <textarea
                                className="schedule-textarea"
                                value={cell || ""}
                                readOnly
                              />
                              <ModalStepThree
                                title="Seleccionar Contenidos"
                                typeTitle="(Unidad Temática)"
                                icon={AddScheduleRow}
                                buttonClass="modal-button"
                                onSave={(selectedTopics) =>
                                  handleCellChange(
                                    rowIndex,
                                    colIndex,
                                    selectedTopics.join(", "),
                                    partialType
                                  )
                                }
                                unitName={row[1]} // Unidad seleccionada
                                initialSelectedTopics={
                                  cell?.split(", ").filter(Boolean) || []
                                } // Inicializar con valores guardados
                              />
                            </div>
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
                                  partialType
                                )
                              }
                            />
                          ) : (
                            <textarea
                              className="schedule-textarea"
                              value={cell || ""}
                              onChange={(e) => {
                                handleCellChange(
                                  rowIndex,
                                  colIndex,
                                  e.target.value,
                                  partialType
                                );
                                adjustTextareaHeight(e.target);
                              }}
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
                                  partialType,
                                  rowIndex,
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
                              if (scheduleTable[partialType].length === 1) {
                                return;
                              }
                              const updatedTable = [
                                ...scheduleTable[partialType],
                              ];
                              updatedTable.splice(rowIndex, 1);
                              dispatch({
                                type: "UPDATE_SCHEDULE_TABLE",
                                payload: {
                                  partialType,
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
                  <tr className="punctuation-tr" key={`${partialType}-total`}>
                    <td colSpan="7">
                      Puntuación Total{" "}
                      {idx === 0 ? "Primer Parcial" : "Segundo Parcial"}:{" "}
                      <span>{calculateTotal(partialType)}</span>
                    </td>
                  </tr>
                </>
              ))}
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
