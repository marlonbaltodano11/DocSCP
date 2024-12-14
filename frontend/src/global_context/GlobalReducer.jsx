import {
  AcademicCalendarObject,
  FormatSyllabusObject,
  CheckBoxesValue,
  FirstApiResponse,
} from "@json/GlobalReducerJson";

const types = {
  //Ciclo Académico
  setAcademicCalendarModality: "SET_ACADEMIC_CALENDAR_MODALITY",
  setAcademicCalendarTimetable: "SET_ACADEMIC_CALENDAR_TIMETABLE",
  setAcademicCalendarDate: "SET_ACADEMIC_CALENDAR_DATE",
  //Plan Analitico
  addUnit: "ADD_UNIT",
  editUnit: "EDIT_UNIT",
  deleteUnit: "DELETE_UNIT",
  //Plan tematico
  setTasks: "SET_TASKS",
  updateTask: "UPDATE_TASK",
  processTasks: "PROCESS_TASKS",
  //FormatSyllabusStepOne
  UpdateFormatSyllabus: "UPDATE_FORMAT_SYLLABUS",
};

const initialState = {
  AcademicCalendarObject,
  FormatSyllabusObject,
  CheckBoxesValue,
  FirstApiResponse,
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case types.setAcademicCalendarModality:
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          academicCalendar: {
            ...state.AcademicCalendarObject.academicCalendar,
            modality: action.payload,
          },
        },
      };

    case types.setAcademicCalendarTimetable: {
      // Si el payload es un objeto completo, reemplaza todo el horario
      if (typeof action.payload === "object" && !action.payload.day) {
        return {
          ...state,
          AcademicCalendarObject: {
            ...state.AcademicCalendarObject,
            timetable: action.payload,
          },
        };
      }

      // Actualización específica de un día
      const { day, value } = action.payload;
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          timetable: {
            ...state.AcademicCalendarObject.timetable,
            [day]: value,
          },
        },
      };
    }

    case types.setAcademicCalendarDate:
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          academicCalendar: {
            ...state.AcademicCalendarObject.academicCalendar,
            [action.payload.id]: action.payload.value,
          },
        },
      };
    //---------------------------------------------------------
    case types.addUnit:
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          coursePlan: [
            ...state.AcademicCalendarObject.coursePlan,
            {
              unitName: "",
              topics: [""],
            },
          ],
        },
      };

    case types.editUnit: {
      const { index, field, value } = action.payload;
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          coursePlan: state.AcademicCalendarObject.coursePlan.map((unit, i) =>
            i === index ? { ...unit, [field]: value } : unit
          ),
        },
      };
    }

    case types.deleteUnit:
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          coursePlan: state.AcademicCalendarObject.coursePlan.filter(
            (_, i) => i !== action.payload
          ),
        },
      };
    //---------------------------------------------------------
    case types.setTasks:
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          coursePlan: action.payload,
        },
      };

    case types.updateTask: {
      const { index, updatedTask } = action.payload;
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          coursePlan: state.AcademicCalendarObject.coursePlan.map((task, i) =>
            i === index ? { ...task, ...updatedTask } : task
          ),
        },
      };
    }

    case types.processTasks:
      console.log("Processing tasks:", state.AcademicCalendarObject.tasks);
      // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor.
      return state;

    //---------------------------------------------------------

    case types.UpdateFormatSyllabus: {
      const { key, value } = action.payload;
      return {
        ...state,
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          [key]: value,
        },
      };
    }

    //--------------CheckBoxes y tabla de microplanificaciones--------------------------------
    case "ADD_GLOBAL_CHECKBOX": {
      const { columnKey, value } = action.payload;
      return {
        ...state,
        CheckBoxesValue: {
          ...state.CheckBoxesValue,
          GlobalCheckboxes: {
            ...state.CheckBoxesValue.GlobalCheckboxes,
            [columnKey]: [
              ...(state.CheckBoxesValue.GlobalCheckboxes[columnKey] || []),
              value,
            ],
          },
        },
      };
    }

    case "REMOVE_GLOBAL_CHECKBOX": {
      const { columnKey, value } = action.payload;
      return {
        ...state,
        CheckBoxesValue: {
          ...state.CheckBoxesValue,
          GlobalCheckboxes: {
            ...state.CheckBoxesValue.GlobalCheckboxes,
            [columnKey]: (
              state.CheckBoxesValue.GlobalCheckboxes[columnKey] || []
            ).filter((item) => item !== value),
          },
        },
      };
    }

    case "APPLY_CHECKBOXES_TO_TABLE": {
      const { columnKey, values } = action.payload;
      const updatedTable = state.FormatSyllabusObject.microplanningTable.map(
        (row) =>
          row.map((cell, colIndex) => {
            // Encuentra celdas vacías en la columna global correspondiente y las llena con los valores seleccionados
            if (columnKey === "contents" && colIndex === 3 && !cell) {
              return values.join(", ");
            } else if (
              columnKey === "learningStrategies" &&
              colIndex === 4 &&
              !cell
            ) {
              return values.join(", ");
            } else if (columnKey === "resources" && colIndex === 5 && !cell) {
              return values.join(", ");
            } else if (columnKey === "evaluation" && colIndex === 6 && !cell) {
              return values.join(", ");
            }
            return cell;
          })
      );

      return {
        ...state,
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          microplanningTable: updatedTable,
        },
      };
    }

    case "UPDATE_FORMAT_SYLLABUS": {
      const { key, value } = action.payload;
      return {
        ...state,
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          [key]: value,
        },
      };
    }

    //-----------------------------------------
    case "UPDATE_SCHEDULE_TABLE": {
      const { partialType, value } = action.payload;
      return {
        ...state,
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          scheduleTable: {
            ...state.FormatSyllabusObject.scheduleTable,
            [partialType]: value, // Actualiza el parcial correspondiente
          },
        },
      };
    }

    case "ADD_ROW_TO_SCHEDULE_TABLE": {
      const { partialType, rowIndex } = action.payload;
      const existingRows =
        state.FormatSyllabusObject.scheduleTable[partialType] || [];
      const updatedRows = [
        ...existingRows.slice(0, rowIndex + 1), // Filas antes y la actual
        ["", "", "", "", "", ""], // Nueva fila vacía
        ...existingRows.slice(rowIndex + 1), // Filas después
      ];

      return {
        ...state,
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          scheduleTable: {
            ...state.FormatSyllabusObject.scheduleTable,
            [partialType]: updatedRows,
          },
        },
      };
    }

    //-------------------Firts Api Handle Response
    case "UPDATE_ACADEMIC_CALENDAR_FROM_RESPONSE": {
      const payload = action.payload; // Datos de la API
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          academicCalendar: {
            ...state.AcademicCalendarObject.academicCalendar,
            modality: payload.generalInformation?.modality || "quarter",
            firstExamDate: payload.generalInformation?.approvedDate || "",
            cicleStartDate: payload.generalInformation?.deliveryDate || "",
            cicleEndDate: payload.generalInformation?.updateDate || "",
          },
          coursePlan: payload.coursePlan.map((unit) => ({
            unitName: unit.unitName || "",
            startDate: "",
            endDate: "",
            topics: unit.topics || [],
          })),
        },
      };
    }
    case "STORE_FIRST_API_RESPONSE":
      return {
        ...state,
        FirstApiResponse: action.payload,
      };

    //Second API response-----------------------
    case "UPDATE_FORMAT_SYLLABUS_FROM_API": {
      return {
        ...state,
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          ...action.payload,
        },
      };
    }

    //--------------Clearing state------------------------
    case "RESET_ENTIRE_GLOBAL_STATE": {
      const {
        AcademicCalendarObject,
        FormatSyllabusObject,
        CheckBoxesValue,
        FirstApiResponse,
      } = action.payload;

      // Solo actualiza claves específicas
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          ...AcademicCalendarObject,
        },
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          ...FormatSyllabusObject,
        },
        CheckBoxesValue: {
          ...state.CheckBoxesValue,
          ...CheckBoxesValue,
        },
        FirstApiResponse: {
          ...state.FirstApiResponse,
          ...FirstApiResponse,
        },
      };
    }

    //Load CheckPoint
    case "LOAD_CHECKPOINT_FILE": {
      const {
        AcademicCalendarObject,
        FormatSyllabusObject,
        CheckBoxesValue,
        FirstApiResponse,
      } = action.payload;

      // Solo actualiza claves específicas
      return {
        ...state,
        AcademicCalendarObject: {
          ...state.AcademicCalendarObject,
          ...AcademicCalendarObject,
        },
        FormatSyllabusObject: {
          ...state.FormatSyllabusObject,
          ...FormatSyllabusObject,
        },
        CheckBoxesValue: {
          ...state.CheckBoxesValue,
          ...CheckBoxesValue,
        },
        FirstApiResponse: {
          ...state.FirstApiResponse,
          ...FirstApiResponse,
        },
      };
    }

    default:
      return state;
  }
};

export { initialState, types };
export default globalReducer;
