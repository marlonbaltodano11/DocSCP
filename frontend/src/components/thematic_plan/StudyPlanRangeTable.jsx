import DateInput from "@components/common/date_input/DateInput";
import PropTypes from "prop-types";
import "@styles/study_plan_range/study_plan_range_table.css";
import { romanNumber } from "../../json/RomansNumbers";

const StudyPlanRangeTable = ({ tasks = [], onTaskChange, today }) => {
  return (
    <table className="study-plan-range-table">
      <thead>
        <tr>
          <th>Unidad</th>
          <th>Temas o Contenidos</th>
          <th>Semana Inicio</th>
          <th>Semana Fin</th>
          <th>Encuentros</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => {
          const startDate = task?.start || today;
          const endDate = task?.end || today;

          return (
            <tr key={index}>
              <td>{romanNumber[index]}</td>
              <td>{task?.unitNameLocal}</td>
              <td className="input-date-table">
                <DateInput
                  IsTable={true}
                  InputLabel="Inicio"
                  Multiple={false}
                  value={new Date(startDate).toISOString().slice(0, 10)}
                  onChange={(date) => {
                    const newStart = new Date(date).toISOString().slice(0, 10);
                    if (
                      newStart !== startDate &&
                      (newStart <= endDate || !endDate)
                    ) {
                      onTaskChange({ start: newStart }, index);
                    }
                  }}
                />
              </td>
              <td className="input-date-table">
                <DateInput
                  IsTable={true}
                  InputLabel="Fin"
                  Multiple={false}
                  value={new Date(endDate).toISOString().slice(0, 10)}
                  onChange={(date) => {
                    const newEnd = new Date(date).toISOString().slice(0, 10);
                    if (
                      newEnd !== endDate &&
                      (newEnd >= startDate || !startDate)
                    ) {
                      onTaskChange({ end: newEnd }, index);
                    }
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  disabled
                  min="0"
                  placeholder="En Proceso. . ."
                  max="10"
                  value={task?.encuentros ?? ""}
                  onChange={(e) => {
                    const newEncuentros = parseInt(e.target.value, 10) || 0;
                    onTaskChange({ encuentros: newEncuentros }, index);
                  }}
                  style={{ width: "100%" }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StudyPlanRangeTable;

StudyPlanRangeTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTaskChange: PropTypes.func.isRequired,
  today: PropTypes.string.isRequired,
};
