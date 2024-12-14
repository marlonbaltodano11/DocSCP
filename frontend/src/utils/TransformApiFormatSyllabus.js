export const transformApiResponseToFormatSyllabus = (apiResponse) => {
    const formatSyllabus = {
      checkboxes: apiResponse.checkboxes || {
        "{{modality}}": "",
        "{{academicRegime}}": "",
        "{{credits}}": "",
        "{{weeklyFrequency}}": "",
      },
      "{{signatureName}}": apiResponse["{{signatureName}}"] || "",
      "{{signatureCode}}": apiResponse["{{signatureCode}}"] || "",
      "{{careerYear}}": apiResponse["{{careerYear}}"] || "",
      "{{totalHours}}": apiResponse["{{totalHours}}"] || "",
      "{{career}}": apiResponse["{{career}}"] || "",
      "{{teacherFullname}}": apiResponse["{{teacherFullname}}"] || "",
      "{{deliveryDate}}": apiResponse["{{deliveryDate}}"] || "",
      "{{updateDate}}": apiResponse["{{updateDate}}"] || "",
      "{{approvedDate}}": apiResponse["{{approvedDate}}"] || "",
      "{{timetable}}": apiResponse["{{timetable}}"] || "",
      "{{approvedBy}}": apiResponse["{{approvedBy}}"] || "",
      "{{subjectObjective}}": apiResponse["{{subjectObjective}}"] || "",
      "{{methodologicalRecommendations}}": apiResponse["{{methodologicalRecommendations}}"] || "",
      "{{evaluationMethod}}": apiResponse["{{evaluationMethod}}"] || "",
      microplanningTable: apiResponse.microplanningTable || [["", "", "", "", "", "", "", "", ""]],
      "{{scheduleDescription}}": apiResponse["{{scheduleDescription}}"] || "",
      scheduleTable: apiResponse.scheduleTable || {
        firstPartial: [["", "", "", "", "", ""]],
        secondPartial: [["", "", "", "", "", ""]],
      },
      "{{bibliography}}": apiResponse["{{bibliography}}"] || "",
    };
  
    return formatSyllabus;
  };
  