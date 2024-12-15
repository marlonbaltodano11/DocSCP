/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import AcademicWizard from "@components/common/wizard_design/WizardDesign";
import AcademicPreparationContainer from "@components/common/academic_preparation_container/AcademicPreparationContainer";
import ClipboardWhiteIcon from "@assets/analytical_plan/clipboard_white_icon.svg";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import DocButtonIcon from "@assets/thematic_plan/doc_button_icon.svg";
import StudyPlanRangeTable from "@components/thematic_plan/StudyPlanRangeTable";
import StudyPlanRangeGantt from "@components/thematic_plan/StudyPlanRangeGantt";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/UseApi";
import DataLoadingAnimation from "../../components/animations/DataLoadingAnimation";
import { transformApiResponseToFormatSyllabus } from "../../utils/TransformApiFormatSyllabus";
import NotificationOverlay from "../../components/common/notification_overlay/NotificationOverlay";

export const ThematicPlan = () => {
  // Estado Global
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  //Variables locales
  const TitleHead = "Plan Temático";
  const NumberView = 3;
  const PreviousPage = "/analytical-plan";
  const StartDateCycleLocal =
    state.AcademicCalendarObject.academicCalendar.cicleStartDate ||
    new Date().toISOString().slice(0, 10);
  const EndDateCycleLocal =
    state.AcademicCalendarObject.academicCalendar.cicleEndDate ||
    new Date().toISOString().slice(0, 10);

  const globalTasks = state.AcademicCalendarObject.coursePlan;

  const initializeTasks = (tasks) => {
    console.log("HORAS", tasks);
    return tasks.map((task, index) => {
      const isValidDate = (date) => !isNaN(new Date(date).getTime());
      return {
        unitNameLocal: task.unitName || `Unidad ${index + 1}`,
        topicsLocal: task.topics.join(", ") || `Tarea ${index + 1}`,
        hours: task.hours,
        objectives: task.objectives,
        start: isValidDate(task.startDate)
          ? task.startDate
          : StartDateCycleLocal,
        end: isValidDate(task.endDate) ? task.endDate : EndDateCycleLocal,
        type: "task",
        encuentros: null,
        dependencies: index > 0 ? [index] : [],
        id: index + 1,
      };
    });
  };

  // Estado local de tareas inicializado desde el estado global
  const [tasks, setTasks] = useState(initializeTasks(globalTasks));

  // Sincronizar los cambios locales con el estado global
  useEffect(() => {
    dispatch({
      type: "SET_TASKS",
      payload: tasks.map((task) => ({
        unitName: task.unitNameLocal,
        topics: task.topicsLocal.split(", ").map((topic) => topic.trim()),
        startDate: task.start,
        endDate: task.end,
        hours: task.hours,
        objectives: task.objectives,
      })),
    });
  }, [tasks, dispatch]);

  const handleTaskChange = (updatedTask, index) => {
    setTasks((prevTasks) => {
      const taskToUpdate = prevTasks[index];
      const updatedTasks = [...prevTasks];

      const newStart =
        updatedTask.start && !isNaN(new Date(updatedTask.start).getTime())
          ? new Date(updatedTask.start)
          : new Date(taskToUpdate.start);

      const newEnd =
        updatedTask.end && !isNaN(new Date(updatedTask.end).getTime())
          ? new Date(updatedTask.end)
          : new Date(taskToUpdate.end);

      updatedTasks[index] = {
        ...taskToUpdate,
        ...updatedTask,
        start: updatedTask.start
          ? newStart.toISOString().slice(0, 10)
          : taskToUpdate.start,
        end: updatedTask.end
          ? newEnd.toISOString().slice(0, 10)
          : taskToUpdate.end,
      };

      return updatedTasks;
    });
  };

  const ganttTasks = tasks.map((task) => ({
    ...task,
    start: new Date(task.start),
    end: new Date(task.end),
  }));

  const navigate = useNavigate();

  //MANEJO DE API-------------------------------------
  const UploadAcademicCalendarApi = useApi({
    endpoint: "/api/v1/lesson-plans/process",
    method: "POST",
    autoFetch: false,
    sendJson: true,
  });

  useEffect(() => {
    UploadAcademicCalendarApi.setRequestData({
      academicCalendar: state.AcademicCalendarObject.academicCalendar,
      timetable: state.AcademicCalendarObject.timetable,
      coursePlan: state.AcademicCalendarObject.coursePlan,
      bibliography: state.FirstApiResponse.bibliography,
      evaluationMethod: state.FirstApiResponse.evaluationMethod,
      subjectObjective: state.FirstApiResponse.subjectObjective,
      generalInformation: state.FirstApiResponse.generalInformation,
      methodologicalRecommendations:
        state.FirstApiResponse.methodologicalRecommendations,
    });
  }, [
    state.FirstApiResponse,
    state.AcademicCalendarObject,
    state.coursePlan,
    state.timetable,
  ]);

  useEffect(() => {
    if (UploadAcademicCalendarApi.error) {
      setOverlayType(0);
      setModalOpen(true);
      return;
    }

    if (UploadAcademicCalendarApi.response) {
      const transformedData = transformApiResponseToFormatSyllabus(
        UploadAcademicCalendarApi.response
      );

      dispatch({
        type: "UPDATE_FORMAT_SYLLABUS_FROM_API",
        payload: transformedData,
      });
      navigate("/format-syllabus/step_1");
    }
  }, [UploadAcademicCalendarApi.response, UploadAcademicCalendarApi.error]);

  const handleProcessDocument = () => {
    UploadAcademicCalendarApi.makeRequest();
  };

  //Overlay
  const closeOverlay = () => setModalOpen(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [overlayType, setOverlayType] = useState(null);

  const overlayActions = {
    closeOverlay,
  };

  return UploadAcademicCalendarApi.loading ? (
    <DataLoadingAnimation />
  ) : (
    <MainComponent>
      <HeaderComponent />
      <main>
        <AcademicWizard currentViewStep={NumberView} />
        <AcademicPreparationContainer
          IconHead={ClipboardWhiteIcon}
          NumberView={NumberView}
          TitleHead={TitleHead}
          PreviousPage={PreviousPage}
          NewClass={"without-padding"}
        >
          <section className="title-table-container">
            <h2>Rango del Plan de Estudios</h2>
            <div className="title-table-content">
              <div className="amount-weeks">
                <p className="title">Total de semanas:</p> <p>{"15 semanas"}</p>
              </div>
              <p className="tip-text">
                Nota: La última fecha no se incluye y las fechas son solo
                sugerencias.
              </p>
            </div>
          </section>

          <StudyPlanRangeTable tasks={tasks} onTaskChange={handleTaskChange} />
        </AcademicPreparationContainer>
        <section className="container-gantt-in-view">
          <h2 className="subtitle-gantt">Cronograma del las Actividades</h2>
          <p className="tip-text-gantt">
            Nota: Las fechas de un solo día se editan mediante la tabla.
          </p>
          <StudyPlanRangeGantt
            tasks={ganttTasks}
            onTaskChange={handleTaskChange}
          />
        </section>
        <NavigationButtons
          PreviousPage={PreviousPage}
          FunctionNextPage={handleProcessDocument}
          IconButtonNextPage={DocButtonIcon}
          TitleNextPage="Procesar"
        />
        {overlayType !== null && (
          <NotificationOverlay
            OverlayType={overlayType}
            IsModalOpen={isModalOpen}
            overlayActions={overlayActions}
          />
        )}
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default ThematicPlan;
