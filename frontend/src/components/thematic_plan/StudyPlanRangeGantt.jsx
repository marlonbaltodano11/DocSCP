import { Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import "@styles/study_plan_range/study_plan_range_gantt.css";
import PropTypes from "prop-types";

const StudyPlanRangeGantt = ({ tasks, onTaskChange }) => {
  const handleTaskChange = (updatedTask) => {
    const taskIndex = tasks.findIndex((task) => task.name === updatedTask.name);
    if (taskIndex !== -1) {
      onTaskChange(
        {
          start: updatedTask.start,
          end: updatedTask.end,
        },
        taskIndex
      );
    }
  };

  return (
    <div className="gantt-main-container">
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Day}
        barBackgroundColor={"#023568a5"}
        barBackgroundSelectedColor={"#023568a5"}
        onDateChange={handleTaskChange}
        locale="es"
        TaskListHeader={() => (
          <th className="gantt-table-header">Nombre de Unidad</th>
        )}
        TaskListTable={() => (
          <>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="gantt-table-td">
                  {task.unidad + "- " + task.name}
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
