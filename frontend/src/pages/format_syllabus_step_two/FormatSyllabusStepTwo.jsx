import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import NavigationHead from "@components/common/format_syllabus/NavigationHead";
import SuperiorActionMenu from "@components/common/format_syllabus/SuperiorActionMenu";
import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import SectionFormaSyllabus from "@components/common/format_syllabus/SectionFormaSyllabus";
import CardTextIcon from "@assets/format_syllabus/card_text_icon.svg";
import "@styles/format_syllabus/microplanning-table.css";
import FormatSyllabusModal from "@components/common/format_syllabus/FormatSyllabusModal";
import BtnSingleModal from "@assets/format_syllabus/btn_single_modal.svg";

import { useEffect } from "react";

const adjustTextareaHeight = (textarea) => {
  textarea.style.height = "auto"; // Restablecer altura para recalcular
  textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar según el contenido
};

const FormatSyllabusStepTwo = () => {
  // Acceso al estado global
  const { FormatSyllabusObject, CheckBoxesValue } = useGlobalState();
  const dispatch = useGlobalDispatch();

  // Obtener microplanningTable del estado global
  const microplanningTable = FormatSyllabusObject.microplanningTable;

  // Manejar cambios en la tabla y sincronizarlos con el estado global
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedTable = [...microplanningTable];
    updatedTable[rowIndex][colIndex] = value;

    // Actualizar el estado global
    dispatch({
      type: "UPDATE_FORMAT_SYLLABUS",
      payload: { key: "microplanningTable", value: updatedTable },
    });
  };

  useEffect(() => {
    const textareas = document.querySelectorAll(".microplanning-textarea");
    textareas.forEach((textarea) => adjustTextareaHeight(textarea));
  }, [microplanningTable]);

  const ColumnCheckboxListKeys = [
    "contents",
    "learningStrategies",
    "resources",
    "evaluation",
  ];

  useEffect(() => {
    // Recorre todas las columnas relevantes
    ["contents", "learningStrategies", "resources", "evaluation"].forEach(
      (columnKey, colIndex) => {
        const existingValues = new Set(
          CheckBoxesValue.GlobalCheckboxes[columnKey] || []
        );

        // Recorre las filas para encontrar valores no incluidos en los globales
        FormatSyllabusObject.microplanningTable.forEach((row) => {
          const cellValue =
            row[colIndex + 3]?.split(", ").filter(Boolean) || [];
          cellValue.forEach((value) => {
            if (!existingValues.has(value)) {
              existingValues.add(value); // Añade al conjunto si no está
            }
          });
        });

        // Actualiza el estado global si hay cambios
        dispatch({
          type: "SET_GLOBAL_CHECKBOXES",
          payload: {
            columnKey,
            values: Array.from(existingValues), // Convierte el conjunto a array
          },
        });
      }
    );
  }, [FormatSyllabusObject, CheckBoxesValue, dispatch]);

  console.log(microplanningTable);

  const renderTableRow = (row, rowIndex) => {
    // Detectar si es una fila de examen
    const isExamRow =
      row.length === 2 && row[1].toLowerCase().includes("examen");
    const totalColumns = 9; // Número total de columnas en la tabla (ajusta según tu diseño)

    if (isExamRow) {
      return (
        <tr key={`row-${rowIndex}`}>
          <td colSpan={totalColumns} className="exam-row">
            {row[1]} {/* Nombre del examen */}
          </td>
        </tr>
      );
    }

    // Renderizado de filas normales
    return (
      <tr key={`row-${rowIndex}`}>
        {row.map((cell, colIndex) => (
          <td key={`cell-${rowIndex}-${colIndex}`}>
            <textarea
              className="microplanning-textarea"
              value={cell}
              onChange={(e) =>
                handleCellChange(rowIndex, colIndex, e.target.value)
              }
            />
          </td>
        ))}
      </tr>
    );
  };

  return (
    <MainComponent>
      <HeaderComponent />
      <main>
        <SuperiorActionMenu />
        <NavigationHead
          TitleHead="Previsualización del formato Syllabus"
          NumberView={2}
          NextPage="/format-syllabus/step_3"
          PreviousPage="/format-syllabus/step_1"
        />
        <SectionFormaSyllabus
          Title="IV. Micro Planificación"
          IconDecoration={CardTextIcon}
        >
          <table className="microplanning-table">
            <thead>
              <tr>
                <th>Semana y Fecha</th>
                <th>Número y Unidad Temática</th>
                <th>Objetivo de Aprendizaje</th>
                <th>Contenidos a Desarrollar</th>
                <th>Estrategias de Aprendizaje</th>
                <th>Materiales y Recursos</th>
                <th>Evaluación de Aprendizaje</th>
              </tr>
            </thead>
            <tbody>
              {microplanningTable.map((row, rowIndex) => {
                // Detectar si es una fila de examen
                const isExamRow =
                  row.length === 2 && row[1].toLowerCase().includes("examen");
                const totalColumns = 9; // Número total de columnas visibles en tu tabla

                if (isExamRow) {
                  // Renderizar la fila de examen con colspan
                  return (
                    <tr key={`row-${rowIndex}`}>
                      <td>
                        <textarea
                          className="microplanning-textarea"
                          value={row[0] || ""}
                          onChange={(e) => {
                            handleCellChange(rowIndex, 0, e.target.value);
                            adjustTextareaHeight(e.target);
                          }}
                        />
                      </td>
                      <td colSpan={totalColumns - 1} className="exam-row">
                        {row[1]}
                      </td>
                    </tr>
                  );
                }

                // Renderizado de filas normales (truncando las últimas dos columnas)
                return (
                  <tr key={`row-${rowIndex}`}>
                    {row.slice(0, row.length - 2).map((cell, colIndex) => {
                      // Ajustar la lógica de las últimas columnas y el modal.
                      const isLastFourColumns =
                        colIndex >= row.slice(0, row.length - 2).length - 4;

                      return (
                        <td key={colIndex}>
                          <textarea
                            className="microplanning-textarea"
                            value={cell || ""}
                            readOnly={colIndex > 2}
                            placeholder={
                              isLastFourColumns && row.length > 6
                                ? "Click en el boton de esquina superior derecha para agregar elementos deseados"
                                : "Click para escribir"
                            }
                            onChange={(e) => {
                              handleCellChange(
                                rowIndex,
                                colIndex,
                                e.target.value
                              );
                              adjustTextareaHeight(e.target);
                            }}
                          />
                          {isLastFourColumns && row.length > 6 ? (
                            <FormatSyllabusModal
                              icon={BtnSingleModal}
                              title="Editar Elemento"
                              typeTitle="(unitario)"
                              mode="individual"
                              columnKey={ColumnCheckboxListKeys[colIndex - 3]}
                              rowIndex={rowIndex}
                              colIndex={colIndex}
                              onConfirm={(selectedCheckboxes) => {
                                const updatedTable = [...microplanningTable];
                                selectedCheckboxes.forEach((checkbox) => {
                                  if (
                                    !updatedTable[rowIndex][colIndex].includes(
                                      checkbox
                                    )
                                  ) {
                                    updatedTable[rowIndex][colIndex] +=
                                      updatedTable[rowIndex][colIndex]
                                        ? `, ${checkbox}`
                                        : checkbox;
                                  }
                                });
                                dispatch({
                                  type: "UPDATE_FORMAT_SYLLABUS",
                                  payload: {
                                    key: "microplanningTable",
                                    value: updatedTable,
                                  },
                                });
                              }}
                            />
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </SectionFormaSyllabus>
        <NavigationButtons
          PreviousPage="/format-syllabus/step_1"
          NextPage="/format-syllabus/step_3"
        />
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default FormatSyllabusStepTwo;
