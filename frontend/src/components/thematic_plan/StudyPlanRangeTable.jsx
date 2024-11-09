import DateInput from "@components/common/date_input/DateInput";
import PropTypes from "prop-types";
import "@styles/study_plan_range/study_plan_range_table.css";

const StudyPlanRangeTable = ({ tasks, onTaskChange }) => {
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
        {tasks.map((task, index) => (
          <tr key={index}>
            <td>{task.unidad}</td>
            <td>{task.name}</td>
            <td className="input-date-table">
              <DateInput
                IsTable={true}
                InputLabel="Inicio"
                Multiple={false}
                value={new Date(task.start).toISOString().slice(0, 10)}
                onChange={(date) => {
                  const newStart = new Date(date).toISOString().slice(0, 10);
                  if (
                    newStart !== task.start &&
                    (newStart <= task.end || !task.end)
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
                value={new Date(task.end).toISOString().slice(0, 10)}
                onChange={(date) => {
                  const newEnd = new Date(date).toISOString().slice(0, 10);
                  if (
                    newEnd !== task.end &&
                    (newEnd >= task.start || !task.start)
                  ) {
                    onTaskChange({ end: newEnd }, index);
                  }
                }}
              />
            </td>
            <td>
              {" "}
              <input
                type="number"
                min="0"
                placeholder=". . ."
                max="10"
                value={task.encuentros}
                onChange={(e) => {
                  const newEncuentros = parseInt(e.target.value, 10);

                  onTaskChange({ encuentros: newEncuentros }, index);
                }}
                style={{ width: "100%" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudyPlanRangeTable;

StudyPlanRangeTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTaskChange: PropTypes.func.isRequired,
};
