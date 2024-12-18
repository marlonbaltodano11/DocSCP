import "@styles/date_input/date-input.css";
import DatePicker from "react-multi-date-picker";
import gregorian_es_lowercase from "@config/date_input/CustomLocale";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import PropTypes from "prop-types";
import { useGlobalState } from "../../../global_context/GlobalProvider";

const DateInput = ({
  IsStartEndDate,
  value,
  onChange,
  Multiple,
  IsTable,
  InputLabel,
  isDisabled,
}) => {
  const { AcademicCalendarObject } = useGlobalState();

  // Verificar y convertir fechas si existen en el objeto
  const cicleStartDate = AcademicCalendarObject?.academicCalendar
    ?.cicleStartDate
    ? new Date(AcademicCalendarObject.academicCalendar.cicleStartDate)
    : null;

  const cicleEndDate = AcademicCalendarObject?.academicCalendar?.cicleEndDate
    ? new Date(AcademicCalendarObject.academicCalendar.cicleEndDate)
    : null;

  const holidayDates =
    AcademicCalendarObject?.academicCalendar?.holydayDates || [];

  const addDaysToDate = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  return (
    <div className="date-picker-container">
      {/* Etiqueta opcional */}
      {!IsTable && <label className="label-date-input">{InputLabel}</label>}

      {/* Componente DatePicker con propiedades dinámicas */}
      <DatePicker
        value={value}
        onChange={(date) => onChange(date)} // Llama a la función onChange pasada como prop
        minDate={
          !IsStartEndDate && cicleStartDate && cicleEndDate
            ? cicleStartDate
            : ""
        } // Fecha mínima seleccionable
        maxDate={
          !IsStartEndDate && cicleStartDate && cicleEndDate
            ? addDaysToDate(cicleEndDate, 1)
            : ""
        } // Fecha máxima seleccionable
        sort
        disabled={isDisabled}
        dateSeparator=","
        multiple={Multiple}
        locale={gregorian_es_lowercase}
        className="rmdp-mobile"
        monthYearSeparator="|"
        plugins={[<DatePanel key="" />]}
        mobileLabels={{
          OK: "Aceptar",
          CANCEL: "Cerrar",
        }}
        mapDays={({ date }) => {
          const formattedDate = date.format("YYYY-MM-DD"); // Formato ISO
          if (holidayDates.includes(formattedDate)) {
            return {
              disabled: true,
              style: { color: "red", textDecoration: "line-through" },
            };
          }
        }}
        render={(value, openCalendar) => {
          // Convertir `value` a cadena si es necesario
          let formattedValue = "";

          if (Array.isArray(value)) {
            // Si es un array, formatea cada fecha
            formattedValue = value
              .map((date) =>
                date instanceof Date
                  ? date
                      .toISOString()
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("/")
                  : date
              )
              .join(", ");
          } else if (value instanceof Date) {
            // Si es una fecha, formatea directamente
            formattedValue = value
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/");
          } else if (typeof value === "string") {
            // Si es una cadena, intenta invertirla
            formattedValue = value.split("/").reverse().join("/");
          }

          return (
            <div
              className={
                !IsTable
                  ? `input-wrapper shadow${
                      isDisabled ? " calendar-disabled" : ""
                    }`
                  : `table-wrapper${isDisabled ? " calendar-disabled" : ""}`
              }
              onClick={openCalendar}
            >
              {IsTable && value ? (
                <>
                  {!formattedValue && <i className="calendar-icon" />}
                  <p>{formattedValue || "Ingresar Fecha"}</p>
                </>
              ) : (
                <>
                  <i className="calendar-icon" />
                  <p>Selecciona una Fecha</p>
                </>
              )}
              <span>{formattedValue || "......"}</span>
            </div>
          );
        }}
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  ]), // Soporta Date o array de Date para rangos
  onChange: PropTypes.func.isRequired, // onChange obligatorio para manejar el estado externamente
  Multiple: PropTypes.bool,
  IsTable: PropTypes.bool,
  InputLabel: PropTypes.string,
  IsStartEndDate: PropTypes.bool, // Verifica si es fecha de inicio o de fin
  isDisabled: PropTypes.bool,
};

DateInput.defaultProps = {
  Multiple: false,
  IsTable: false,
  InputLabel: "Fecha",
  IsStartEndDate: false,
  isDisabled: false,
};

export default DateInput;
