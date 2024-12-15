import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import AcademicWizard from "@components/common/wizard_design/WizardDesign";
import AcademicPreparationContainer from "@components/common/academic_preparation_container/AcademicPreparationContainer";
import CalendarIcon from "@assets/academic_cycle/calendar_icon.svg";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import AcademicCycleForm from "@components/academic_cycle/AcademicCycleForm";
import { useGlobalState } from "@global_context/GlobalProvider";
import { useEffect, useState } from "react";
import { ValidAcademicCycle } from "../../utils/ValidAcademicCycle";
const AcademicCycle = () => {
  const TitleHead = "Datos Elementales del Ciclo Académico";
  const NumberView = 1;
  const [NextPage, SetNewPage] = useState("/academic-cycle");
  const PreviousPage = "/";

  const [showWarning, setshowWarning] = useState(false);

  const state = useGlobalState();

  useEffect(() => {
    const isValid = ValidAcademicCycle(
      state.AcademicCalendarObject.academicCalendar,
      state.AcademicCalendarObject.timetable
    );
    console.log("Valido?", isValid);
    if (isValid) {
      setshowWarning(false);
      SetNewPage("/analytical-plan");
    } else {
      setshowWarning(true);
      SetNewPage("/academic-cycle");
    }
  }, [
    state.AcademicCalendarObject.academicCalendar,
    state.AcademicCalendarObject.timetable,
  ]);

  return (
    <MainComponent>
      <HeaderComponent></HeaderComponent>
      <main>
        <AcademicWizard currentViewStep={NumberView}></AcademicWizard>
        <AcademicPreparationContainer
          IconHead={CalendarIcon}
          NumberView={NumberView}
          TitleHead={TitleHead}
          NextPage={NextPage}
        >
          <AcademicCycleForm></AcademicCycleForm>
          {showWarning ? (
            <p className="warning-dates">
              Colocar correctamente los campos: Fecha Inicio de Ciclo, Fecha
              Primer Examen Parcial, Fecha Final de Ciclo y la Frecuencia
              Semanal
            </p>
          ) : (
            ""
          )}
        </AcademicPreparationContainer>
        <NavigationButtons
          NextPage={NextPage}
          PreviousPage={PreviousPage}
        ></NavigationButtons>
      </main>
      <FooterComponent></FooterComponent>
    </MainComponent>
  );
};

export default AcademicCycle;
