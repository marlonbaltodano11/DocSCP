import DateInput from "@components/common/date_input/DateInput";
import "@styles/academic_cycle_form/academic-cycle-form.css";
import { useState, useEffect } from "react";
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

const AcademicCycleForm = () => {
  //Objetos de interes
  const [selectedDays, setSelectedDays] = useState({});
  const [periods, setPeriods] = useState(defaultDayPeriod);
  const [classModality, setClassModality] = useState("cuatrimestral"); // Valor por defecto

  //Objeto visual
  const [disabledDays, setDisabledDays] = useState({}); // Estado para deshabilitar días

  // Manejar cambio en los checkboxes de días de la semana
  const handleDayChange = (e) => {
    const { id, checked } = e.target;
    setSelectedDays((prev) => ({ ...prev, [id]: checked }));
  };

  // Manejar cambio en el número de períodos
  const handlePeriodChange = (e, day) => {
    const { value } = e.target;
    let ValueLength = value.length;
    setPeriods((prev) => ({
      ...prev,
      [day]:
        !isValidNumber(parseInt(value)) || ValueLength == 0
          ? 0
          : parseInt(value),
    }));
  };

  // Manejar cambio en la modalidad de clase
  const handleClassModalityChange = (e) => {
    const { value } = e.target;
    setClassModality(value);
  };

  // Efecto para seleccionar/desmarcar días y deshabilitarlos según la modalidad
  useEffect(() => {
    const config = ClassModality.dayConfig[classModality];
    if (config) {
      setSelectedDays(config.selectedDays);
      setDisabledDays(config.disabledDays);
      setPeriods(defaultDayPeriod);
    }
  }, [classModality]);

  return (
    <section className="academic-cycle-form-container">
      <form>
        <fieldset>
          <h3>Calendario Académico</h3>
          <section className="form-container">
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
                      checked={classModality === option.value}
                      onChange={handleClassModalityChange}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                  </article>
                ))}
              </div>
            </div>

            {DateInputs.map((dateInput, index) => (
              <DateInput
                InputLabel={dateInput.label}
                Multiple={dateInput.Multiple}
                key={index}
              />
            ))}
          </section>
        </fieldset>

        <fieldset>
          <h3>Horario Semanal</h3>
          <section className="schedule-form-container">
            {/* Fila de checkboxes */}
            <div className="schedule-row week-days">
              <span className="row-title">Frecuencia Semanal</span>
              {daysOfWeek.map((day) => (
                <div key={day.id}>
                  <input
                    type="checkbox"
                    id={day.id}
                    checked={selectedDays[day.id] || false}
                    onChange={handleDayChange}
                    disabled={disabledDays[day.id]} // Días deshabilitados
                  />
                  <label htmlFor={day.id}>{day.label}</label>
                </div>
              ))}
            </div>

            {/* Fila de inputs de número de períodos */}
            <div className="schedule-row inputs">
              <span className="row-title">Períodos en el Día</span>
              {daysOfWeek.map((day) => (
                <div key={day.id} className="period-container">
                  <input
                    type="number"
                    placeholder="0"
                    value={periods[day.id] || ""}
                    onChange={(e) => handlePeriodChange(e, day.id)}
                    disabled={!selectedDays[day.id] || disabledDays[day.id]} // Deshabilitar según selección
                    min="0"
                    max="6"
                  />
                  <span
                    key={day.id}
                    className={
                      !selectedDays[day.id] || disabledDays[day.id]
                        ? "periods-span disable-perdion"
                        : "periods-span"
                    }
                  >
                    Período/s
                  </span>
                </div>
              ))}
            </div>

            {/* Fila de inputs de duración */}
            <div className="schedule-row">
              <span className="row-title">Duración del Período</span>
              {daysOfWeek.map((day) => (
                <div key={day.id}>
                  <input
                    type="text"
                    placeholder="Esperando Períodos..."
                    value={
                      !periods[day.id]
                        ? "0h 0m"
                        : formatDuration(periods[day.id], classModality)
                    }
                    disabled={!selectedDays[day.id] || disabledDays[day.id]}
                    readOnly // Deshabilitar según selección
                  />
                </div>
              ))}
            </div>
          </section>
        </fieldset>
      </form>
    </section>
  );
};

export default AcademicCycleForm;
