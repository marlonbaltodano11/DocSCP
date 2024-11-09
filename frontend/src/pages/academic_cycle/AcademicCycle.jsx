import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import AcademicWizard from "@components/common/wizard_design/WizardDesign";
import AcademicPreparationContainer from "@components/common/academic_preparation_container/AcademicPreparationContainer";
import CalendarIcon from "@assets/academic_cycle/calendar_icon.svg";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import AcademicCycleForm from "@components/academic_cycle/AcademicCycleForm";

const AcademicCycle = () => {
  const TitleHead = "Datos Elementales del Ciclo Académico";
  const NumberView = 1;
  const NextPage = "/analytical-plan";
  const PreviousPage = "/";

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
