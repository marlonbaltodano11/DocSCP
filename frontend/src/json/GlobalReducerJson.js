export const FormatSyllabusObject = {
    checkboxes: {
      "{{modality}}": "",
      "{{academicRegime}}": "",
      "{{credits}}": "",
      "{{weeklyFrequency}}": "",
    },
    "{{signatureName}}": "",
    "{{signatureCode}}": "",
    "{{careerYear}}": "",
    "{{totalHours}}": "",
    "{{career}}": "",
    "{{teacherFullname}}": "",
    "{{deliveryDate}}": "",
    "{{updateDate}}": "",
    "{{approvedDate}}": "",
    "{{timetable}}": "",
    "{{approvedBy}}": "",
    "{{subjectObjective}}": "",
    "{{methodologicalRecommendations}}": "",
    "{{evaluationMethod}}": "",
    microplanningTable: [["", "", "", "", "", "", "", "", ""],],
    "{{scheduleDescription}}": "",
    scheduleTable: {
      firstPartial: [["", "", "", "", "","",]],
      secondPartial: [["", "", "", "", "","",]],
    },
    "{{bibliography}}": "",
  }

  export const AcademicCalendarObject = {
    academicCalendar: {
      modality: "quarter",
      firstExamDate: "",
      cicleStartDate: "",
      cicleEndDate: "",
      holydayDates: [],
    },
    timetable: {
      monday: { classDay: false, periods: 0 },
      tuesday: { classDay: false, periods: 0 },
      wednesday: { classDay: false, periods: 0 },
      thursday: { classDay: false, periods: 0 },
      friday: { classDay: false, periods: 0 },
      saturday: { classDay: false, periods: 0 },
    },
    coursePlan: [
      {
        unitName: "",
        startDate: "",
        endDate: "",
        topics: [],
      },
    ],
  }

  export const CheckBoxesValue = {
    GlobalCheckboxes: {
      contents: [], // Globales para "Contenidos a Desarrollar"
      learningStrategies: [], // Globales para "Estrategias de Aprendizaje"
      resources: [], // Globales para "Materiales y Recursos"
      evaluation: [], // Globales para "Evaluación de Aprendizaje"
    },
  }

  export const FirstApiResponse = {}