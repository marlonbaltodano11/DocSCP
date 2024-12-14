import {
  useGlobalDispatch,
  useGlobalState,
} from "@global_context/GlobalProvider";
import HeaderComponent from "@components/common/header/HeaderComponent";
import FooterComponent from "@components/common/footer/FooterComponent";
import MainComponent from "@components/common/main/MainComponent";
import SectionFormaSyllabus from "@components/common/format_syllabus/SectionFormaSyllabus";
import CardListIcon from "@assets/format_syllabus/card_list_icon.svg";
import CardTextIcon from "@assets/format_syllabus/card_text_icon.svg";
import TableFormatSyllabusStepOne from "@components/format_syllabus/TableFormatSyllabusStepOne";
import NavigationButtons from "@components/common/navigation_buttons/NavigationButtons";
import NavigationHead from "@components/common/format_syllabus/NavigationHead";
import SuperiorActionMenu from "@components/common/format_syllabus/SuperiorActionMenu";

const adjustTextareaHeight = (textarea) => {
  textarea.style.height = "auto"; // Restablecer altura para recalcular
  textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar según el contenido
};

const FormatSyllabusStepOne = () => {
  const { FormatSyllabusObject } = useGlobalState();
  const dispatch = useGlobalDispatch();

  const handleStateChange = (key, value) => {
    if (key === "checkboxes") {
      // Si se actualizan valores dentro de `checkboxes`
      dispatch({
        type: "UPDATE_FORMAT_SYLLABUS",
        payload: {
          key: "checkboxes",
          value,
        },
      });
    } else {
      // Para cualquier otra clave
      dispatch({
        type: "UPDATE_FORMAT_SYLLABUS",
        payload: { key, value },
      });
    }
  };

  return (
    <MainComponent>
      <HeaderComponent />
      <main>
        <SuperiorActionMenu />
        <NavigationHead
          TitleHead="Previsualización del formato Syllabus"
          NumberView={1}
          NextPage="/format-syllabus/step_2"
        />
        <SectionFormaSyllabus
          IdSection="GeneralInformation"
          IdNextSection="CourseObjective"
          IconDecoration={CardListIcon}
          Title="I. Información General"
        >
          <TableFormatSyllabusStepOne
            formData={FormatSyllabusObject}
            onFormDataChange={handleStateChange}
          />
        </SectionFormaSyllabus>
        <SectionFormaSyllabus
          IdSection="CourseObjective"
          IdPreviousSection="GeneralInformation"
          IdNextSection="MethodologicalRecommendations"
          Title="II. Objetivo de la Asignatura"
          IconDecoration={CardTextIcon}
        >
          <textarea
            className="shadow auto-resize-textarea"
            name="courseObjective"
            value={FormatSyllabusObject["{{subjectObjective}}"]}
            onChange={(e) => {
              handleStateChange("{{subjectObjective}}", e.target.value);
              adjustTextareaHeight(e.target);
            }}
            onInput={(e) => adjustTextareaHeight(e.target)}
            ref={(textarea) => textarea && adjustTextareaHeight(textarea)}
          />
        </SectionFormaSyllabus>
        <SectionFormaSyllabus
          IdSection="MethodologicalRecommendations"
          IdPreviousSection="CourseObjective"
          IdNextSection="Evaluation"
          Title="III. Recomendaciones Metodológicas"
          IconDecoration={CardTextIcon}
        >
          <textarea
            className="shadow auto-resize-textarea"
            name="methodologicalRecommendations"
            value={FormatSyllabusObject["{{methodologicalRecommendations}}"]}
            onChange={(e) => {
              handleStateChange(
                "{{methodologicalRecommendations}}",
                e.target.value
              );
              adjustTextareaHeight(e.target);
            }}
            onInput={(e) => adjustTextareaHeight(e.target)}
            ref={(textarea) => textarea && adjustTextareaHeight(textarea)}
          />
        </SectionFormaSyllabus>
        <SectionFormaSyllabus
          IdSection="Evaluation"
          IdPreviousSection="MethodologicalRecommendations"
          IdNextSection="Bibliographies"
          Title="IV. Evaluación"
          IconDecoration={CardTextIcon}
        >
          <textarea
            className="shadow auto-resize-textarea"
            name="evaluationMethod"
            value={FormatSyllabusObject["{{evaluationMethod}}"]}
            onChange={(e) => {
              handleStateChange("{{evaluationMethod}}", e.target.value);
              adjustTextareaHeight(e.target);
            }}
            onInput={(e) => adjustTextareaHeight(e.target)}
            ref={(textarea) => textarea && adjustTextareaHeight(textarea)}
          />
        </SectionFormaSyllabus>
        <SectionFormaSyllabus
          IdSection="Bibliographies"
          IdPreviousSection="Evaluation"
          Title="V. Bibliografías"
          IconDecoration={CardTextIcon}
        >
          <textarea
            className="shadow auto-resize-textarea"
            name="bibliography"
            value={FormatSyllabusObject["{{bibliography}}"]}
            onChange={(e) => {
              handleStateChange("{{bibliography}}", e.target.value);
              adjustTextareaHeight(e.target);
            }}
            onInput={(e) => adjustTextareaHeight(e.target)}
            ref={(textarea) => textarea && adjustTextareaHeight(textarea)}
          />
        </SectionFormaSyllabus>
        <NavigationButtons NextPage="/format-syllabus/step_2" />
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default FormatSyllabusStepOne;
