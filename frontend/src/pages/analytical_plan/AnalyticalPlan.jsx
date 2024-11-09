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
import { useState, useCallback, useMemo } from "react";

const AnalyticalPlan = () => {
  const TitleHead = "Plan Analítico";
  const NumberView = 2;
  const NextPage = "/thematic-plan";
  const PreviousPage = "/academic-cycle";
  const NewClass = "without-padding";

  const initialUnitsData = [
    {
      unitName: "Introducción a la Programación",
      topics: [
        "Historia de la programación",
        "Tipos de lenguajes de programación",
        "Estructura básica de un programa",
      ],
    },
    {
      unitName: "Estructuras de Control",
      topics: ["Condicionales", "Bucles", "Funciones"],
    },
  ];

  const [units, setUnits] = useState(initialUnitsData);

  const AddNewUnit = () => {
    const newUnit = {
      unitName: "",
      topics: [""],
    };
    setUnits([...units, newUnit]);
  };

  const deleteUnit = useCallback(
    (index) => {
      setUnits((prevUnits) => prevUnits.filter((_, i) => i !== index));
    },
    [setUnits]
  );

  const handleEditUnit = useCallback(
    (index, field, value) => {
      setUnits((prevUnits) =>
        prevUnits.map((unit, i) =>
          i === index ? { ...unit, [field]: value } : unit
        )
      );
    },
    [setUnits]
  );

  const memoizedUnits = useMemo(() => units, [units]);

  return (
    <MainComponent>
      <HeaderComponent />
      <main>
        <AcademicWizard currentViewStep={NumberView} />
        <AcademicPreparationContainer
          IconHead={ClipboardWhiteIcon}
          NumberView={NumberView}
          TitleHead={TitleHead}
          NextPage={NextPage}
          PreviousPage={PreviousPage}
          NewClass={NewClass}
        >
          <div className="units-analytical-plan-container">
            <CardsUnitsAndContents
              UnitsData={memoizedUnits}
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
        <NavigationButtons NextPage={NextPage} PreviousPage={PreviousPage} />
      </main>
      <FooterComponent />
    </MainComponent>
  );
};

export default AnalyticalPlan;
