import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import AcademicWizard from "@components/common/wizard_design/WizardDesign";
import AcademicPreparationContainer from "@components/common/academic_preparation_container/AcademicPreparationContainer";
import ClipboardWhiteIcon from "@assets/analytical_plan/clipboard_white_icon.svg";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import "@styles/analytical_plan/analytical-plan.css";
import CardsUnitsAndContents from "@components/analytical_plan/CardsUnitsAndContents";
import AddNewUnitIcon from "@assets/analytical_plan/add_new_unit_icon.svg";
import {
  assignClassDatesToUnits,
  getClassDates,
} from "../../utils/codigomagico";

import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import { useEffect } from "react";

const AnalyticalPlan = () => {
  const state = useGlobalState();
  const dispatch = useGlobalDispatch();

  const units = state.AcademicCalendarObject.coursePlan;

  const AddNewUnit = () => {
    dispatch({ type: "ADD_UNIT" });
  };

  const deleteUnit = (index) => {
    if (units.length === 1) {
      return;
    }
    dispatch({ type: "DELETE_UNIT", payload: index });
  };

  const handleEditUnit = (index, field, value) => {
    if (field === "hours" && value < 0) {
      return;
    }

    dispatch({
      type: "EDIT_UNIT",
      payload: { index, field, value },
    });
  };

  //Actualizador de unidades --------------------------------
  useEffect(() => {
    if (
      !state.AcademicCalendarObject.academicCalendar ||
      !state.AcademicCalendarObject.timetable ||
      !state.AcademicCalendarObject.coursePlan
    ) {
      return;
    }

    const validClasses = getClassDates(
      state.AcademicCalendarObject.academicCalendar,
      state.AcademicCalendarObject.timetable
    );

    const newCoursePlan = assignClassDatesToUnits(
      state.AcademicCalendarObject.coursePlan,
      validClasses
    );

    dispatch({
      type: "SET_TASKS",
      payload: newCoursePlan,
    });
  }, [state.AcademicCalendarObject]);

  return (
    <MainComponent>
      <HeaderComponent />
      <main>
        <AcademicWizard currentViewStep={2} />
        <AcademicPreparationContainer
          IconHead={ClipboardWhiteIcon}
          NumberView={2}
          TitleHead="Plan Analítico"
          NextPage="/thematic-plan"
          PreviousPage="/academic-cycle"
          NewClass="without-padding"
        >
          <div className="units-analytical-plan-container">
            <CardsUnitsAndContents
              UnitsData={units}
              onDeleteUnit={deleteUnit}
              onEditUnit={handleEditUnit}
            />
          </div>
          <button
            type="button"
            onClick={AddNewUnit}
            className="add-new-unit-button-analytical-plan"
          >
            <img alt="add new unit" src={AddNewUnitIcon} />
            Agregar Otra unidad
          </button>
        </AcademicPreparationContainer>
        <NavigationButtons
          NextPage="/thematic-plan"
          PreviousPage="/academic-cycle"
        />
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default AnalyticalPlan;
