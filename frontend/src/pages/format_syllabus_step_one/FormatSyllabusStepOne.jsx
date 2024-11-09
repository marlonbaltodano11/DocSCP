import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import SectionFormaSyllabus from "../../components/common/format_syllabus/SectionFormaSyllabus";

const FormatSyllabusStepOne = () => {
  // Simulación de datos de prueba para el formulario

  return (
    <MainComponent>
      <HeaderComponent />
      <main>
        <SectionFormaSyllabus Title="I. Información General"></SectionFormaSyllabus>
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default FormatSyllabusStepOne;
