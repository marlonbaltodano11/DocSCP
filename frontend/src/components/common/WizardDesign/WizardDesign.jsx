import React, { useState } from "react";
import IconTest from "../../assets/icon/document.svg";

const AcademicWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalStepsCount = 3;

  const wizardSteps = [
    {
      stepNumber: 1,
      stepTitle: "Ciclo Académico",
      stepSubtitle: "Define tu carga docente",
      stepIcon: IconTest,
    },
    {
      stepNumber: 2,
      stepTitle: "Plan Analítico",
      stepSubtitle: "Define los contenidos",
      stepIcon: IconTest,
    },
    {
      stepNumber: 3,
      stepTitle: "Plan Temático",
      stepSubtitle: "Define la carga académica",
      stepIcon: IconTest,
    },
  ];

  const handleNextStep = () => {
    if (currentStep < totalStepsCount) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepLineBackground = (numberStep) => {
    if (currentStep > numberStep + 1) {
      return "#28A745"; // Línea verde para pasos completados
    }

    if (currentStep === numberStep + 1) {
      return `linear-gradient(to right, #28A745 , #1174D6)`; // Gradiente para el siguiente paso
    }

    return "#444444"; // Línea gris para pasos no completados
  };

  const getIconColor = (numberStep) => {
    if (currentStep === numberStep) {
      return "brightness(0) invert(32%) sepia(88%) saturate(1066%) hue-rotate(184deg) brightness(99%) contrast(98%)";
    }
    if (currentStep > numberStep) {
      return "brightness(0) invert(41%) sepia(18%) saturate(1985%) hue-rotate(81deg) brightness(96%) contrast(84%)";
    }
  };

  const getTitleColor = (numberStep) => {
    if (currentStep === numberStep) {
      return "#1174D6";
    }
    if (currentStep > numberStep) {
      return "#28A745";
    }
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "90%",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2 style={{ marginLeft: "5%", fontSize: "24px", marginBottom: "20px" }}>
        Pasos a seguir
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        {wizardSteps.map((step, index) => (
          <React.Fragment key={step.stepNumber}>
            <article
              style={{
                height: "100px",
                textAlign: "center",
                width: "350px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  border:
                    step.stepNumber === currentStep
                      ? "5px solid #1174D6"
                      : currentStep > step.stepNumber
                      ? "5px solid #28A745"
                      : "5px solid #444444",
                  backgroundColor: "white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                  color: step.stepNumber <= currentStep ? "#fff" : "#999",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  fontSize: "25px",
                  fontWeight: "bold",
                  position: "relative",
                  zIndex: 2,
                  top: "0px",
                }}
              >
                <img
                  style={{
                    width: "40px",
                    filter: getIconColor(step.stepNumber),
                  }}
                  src={step.stepIcon}
                  alt=""
                />
              </div>

              {/* Títulos debajo del círculo */}
              <div style={{ top: "10px", position: "relative", width: "100%" }}>
                <div
                  style={{
                    fontSize: "22px",
                    color: getTitleColor(step.stepNumber),
                    fontWeight: "bold",
                  }}
                >
                  {step.stepTitle}
                </div>
                <div style={{ fontSize: "18px", color: "#777" }}>
                  {step.stepSubtitle}
                </div>
              </div>
            </article>

            {index < wizardSteps.length - 1 && (
              <hr
                style={{
                  flex: 1,
                  width: "100%",
                  border: "none",
                  height: "4px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                  background: getStepLineBackground(step.stepNumber),
                  marginLeft: "-125px",
                  marginRight: "-125px",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "200px",
        }}
      >
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ccc",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            cursor: currentStep === 1 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>
        <button
          onClick={handleNextStep}
          disabled={currentStep === totalStepsCount}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28A745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: currentStep === totalStepsCount ? "not-allowed" : "pointer",
          }}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};

export default AcademicWizard;
