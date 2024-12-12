import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import "@styles/study_plan_range/study_plan_range_gantt.css";
import PropTypes from "prop-types";
import { romanNumber } from "../../json/RomansNumbers";

const StudyPlanRangeGantt = ({ tasks = [], onTaskChange }) => {
  const handleChange = (updatedTask) => {
    const taskIndex = tasks.findIndex(
      (task) => task.topicsLocal === updatedTask.topicsLocal
    );
    if (taskIndex !== -1) {
      onTaskChange(
        {
          start: updatedTask?.start.toISOString().slice(0, 10),
          end: updatedTask?.end.toISOString().slice(0, 10),
        },
        taskIndex
      );
    }
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="gantt-main-container">
      <Gantt
        tasks={safeTasks.map((task) => ({
          ...task,
          start:
            task?.start instanceof Date ? task.start : new Date(task.start),
          end: task?.end instanceof Date ? task.end : new Date(task.end),
        }))}
        viewMode={ViewMode.Day}
        barBackgroundColor={"#023568a5"}
        barBackgroundSelectedColor={"#023568a5"}
        onDateChange={handleChange}
        locale="es"
        TaskListHeader={() => (
          <th className="gantt-table-header">Nombre de Unidad</th>
        )}
        TaskListTable={() => (
          <>
            {safeTasks.map((task, index) => (
              <tr key={index}>
                <td className="gantt-table-td">
                  {romanNumber[index] + " - " + (task?.unitNameLocal ?? "")}
                </td>
              </tr>
            ))}
          </>
        )}
        TooltipContent={() => null}
      />
    </div>
  );
};

export default StudyPlanRangeGantt;

StudyPlanRangeGantt.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTaskChange: PropTypes.func.isRequired,
};
