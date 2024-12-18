import DateInput from "@components/common/date_input/DateInput";
import "@styles/academic_cycle_form/academic-cycle-form.css";
import {
  ClassModality,
  DateInputs,
  daysOfWeek,
  defaultDayPeriod,
} from "@json/AcademicCycle";
import {
  formatDuration,
  isValidNumber,
} from "@utils/academic_cycle/InputsUtils";

import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import DataLoadingAnimation from "../animations/DataLoadingAnimation";

const AcademicCycleForm = () => {
  // Llamado al contexto global
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  const { academicCalendar, timetable } = state.AcademicCalendarObject;

  // Estado visual para deshabilitar días según modalidad
  const disabledDays =
    ClassModality.dayConfig[academicCalendar.modality]?.disabledDays || {};

  // Manejar cambio en los checkboxes de días de la semana
  const handleDayChange = (e) => {
    const { id, checked } = e.target;
    dispatch({
      type: "SET_ACADEMIC_CALENDAR_TIMETABLE",
      payload: {
        day: id,
        value: {
          classDay: checked,
          periods: checked ? timetable[id]?.periods : 0,
        },
      },
    });
  };

  // Manejar cambio en el número de períodos
  const handlePeriodChange = (e, day) => {
    const { value } = e.target;
    dispatch({
      type: "SET_ACADEMIC_CALENDAR_TIMETABLE",
      payload: {
        day,
        value: {
          classDay: timetable[day]?.classDay || false,
          periods: isValidNumber(parseInt(value)) ? parseInt(value) : 0,
        },
      },
    });
  };

  // Manejar cambio en la modalidad de clase
  const handleClassModalityChange = (e) => {
    const { value } = e.target;

    if (value === "trimester") {
      dispatch({
        type: "SET_ACADEMIC_CALENDAR_DATE",
        payload: { id: "firstExamDate", value: "" },
      });
    }

    const defaultConfig = ClassModality.dayConfig[value];
    if (!defaultConfig) return;

    const updatedTimetable = Object.keys(defaultConfig.selectedDays).reduce(
      (acc, day) => {
        acc[day] = {
          classDay: defaultConfig.selectedDays[day],
          periods: defaultDayPeriod[day] || 0,
        };
        return acc;
      },
      {}
    );

    dispatch({ type: "SET_ACADEMIC_CALENDAR_MODALITY", payload: value });
    dispatch({
      type: "SET_ACADEMIC_CALENDAR_TIMETABLE",
      payload: updatedTimetable,
    });
  };

  return state.AcademicCalendarObject ? (
    <section className="academic-cycle-form-container">
      <form>
        <fieldset>
          <h3>Calendario Académico</h3>
          <section className="form-container">
            {/* Modalidad de clase */}
            <div className="label-radio">
              <p className="radio-title">Modalidad de Clase</p>
              <div className="input-radio-container">
                {ClassModality.options.map((option) => (
                  <article key={option.value} className="radio-option">
                    <input
                      id={option.value}
                      type="radio"
                      name="classModality"
                      value={option.value}
                      checked={academicCalendar.modality === option.value}
                      onChange={handleClassModalityChange}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </article>
                ))}
              </div>
            </div>

            {/* Inputs de fecha */}
            {DateInputs.map((dateInput, index) => (
              <DateInput
                key={index}
                isDisabled={
                  dateInput.id === "firstExamDate" &&
                  academicCalendar?.modality === "trimester"
                }
                InputLabel={dateInput.label}
                Multiple={dateInput.multiple}
                IsStartEndDate={
                  dateInput.id === "cicleStartDate" ||
                  dateInput.id === "cicleEndDate"
                    ? true
                    : false
                }
                onChange={(value) => {
                  const formattedValue = Array.isArray(value)
                    ? value.map(
                        (date) => new Date(date).toISOString().split("T")[0]
                      )
                    : new Date(value).toISOString().split("T")[0];
                  dispatch({
                    type: "SET_ACADEMIC_CALENDAR_DATE",
                    payload: { id: dateInput.id, value: formattedValue },
                  });
                }}
                value={academicCalendar[dateInput.id]} // Sincronizado con el estado global
              />
            ))}
          </section>
        </fieldset>

        <fieldset>
          <h3>Horario Semanal</h3>
          <section className="schedule-form-container">
            {/* Checkboxes de días de la semana */}
            <div className="schedule-row week-days">
              <span className="row-title">Frecuencia Semanal</span>
              {daysOfWeek.map((day) => (
                <div key={day.id}>
                  <input
                    type="checkbox"
                    id={day.id}
                    checked={timetable[day.id]?.classDay || false}
                    onChange={handleDayChange}
                    disabled={disabledDays[day.id]} // Días deshabilitados según modalidad
                  />
                  <label htmlFor={day.id}>{day.label}</label>
                </div>
              ))}
            </div>

            {/* Inputs de períodos */}
            <div className="schedule-row inputs">
              <span className="row-title">Períodos en el Día</span>
              {daysOfWeek.map((day) => (
                <div key={day.id} className="period-container">
                  <input
                    type="number"
                    placeholder="0"
                    value={timetable[day.id]?.periods || ""}
                    onChange={(e) => handlePeriodChange(e, day.id)}
                    disabled={
                      !timetable[day.id]?.classDay || disabledDays[day.id]
                    } // Control según selección
                    min="0"
                    max="6"
                  />
                  <span
                    className={
                      !timetable[day.id]?.classDay || disabledDays[day.id]
                        ? "periods-span disable-period"
                        : "periods-span"
                    }
                  >
                    Período/s
                  </span>
                </div>
              ))}
            </div>

            {/* Duración del período */}
            <div className="schedule-row">
              <span className="row-title">Duración del Período</span>
              {daysOfWeek.map((day) => (
                <div key={day.id}>
                  <input
                    type="text"
                    placeholder="Esperando Períodos..."
                    value={
                      !timetable[day.id]?.periods
                        ? "0h 0m"
                        : formatDuration(
                            timetable[day.id]?.periods,
                            academicCalendar.modality
                          )
                    }
                    disabled={
                      !timetable[day.id]?.classDay || disabledDays[day.id]
                    }
                    readOnly
                  />
                </div>
              ))}
            </div>
          </section>
        </fieldset>
      </form>
    </section>
  ) : (
    <DataLoadingAnimation />
  );
};

export default AcademicCycleForm;
