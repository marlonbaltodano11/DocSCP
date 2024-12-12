import "@styles/date_input/date-input.css";
import DatePicker from "react-multi-date-picker";
import gregorian_es_lowercase from "@config/date_input/CustomLocale";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import PropTypes from "prop-types";

const DateInput = ({ value, onChange, Multiple, IsTable, InputLabel }) => {
  return (
    <div className="date-picker-container">
      {/* Etiqueta opcional */}
      {!IsTable && <label className="label-date-input">{InputLabel}</label>}

      {/* Componente DatePicker con propiedades dinámicas */}
      <DatePicker
        value={value}
        onChange={(date) => onChange(date)} // Llama a la función onChange pasada como prop
        sort
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
        render={(value, openCalendar) => (
          <div
            className={!IsTable ? "input-wrapper shadow" : "table-wrapper"}
            onClick={openCalendar}
          >
            {IsTable && value ? (
              <p>{value}</p>
            ) : (
              <>
                <i className="calendar-icon" />
                <p>Selecciona una Fecha</p>
              </>
            )}
            <span>{value || "......"}</span>
          </div>
        )}
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
};

DateInput.defaultProps = {
  Multiple: false,
  IsTable: false,
  InputLabel: "Fecha",
};

export default DateInput;
