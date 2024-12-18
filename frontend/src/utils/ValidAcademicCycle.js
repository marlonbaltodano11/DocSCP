export const ValidAcademicCycle = (AcademicCalendar, Timetable) => {
    const isFirstExamDateValid = AcademicCalendar.modality === "trimester"
      ? true  // Si es "trimester", no importa el valor de firstExamDate
      : AcademicCalendar.firstExamDate !== "";
  
    const ValidAcademicCalendar = (
      isFirstExamDateValid &&
      AcademicCalendar.cicleStartDate !== "" &&
      AcademicCalendar.cicleEndDate !== ""
    );
  
    const ValidTimetable = Object.values(Timetable).some(day => day.classDay === true);
  
    return ValidAcademicCalendar && ValidTimetable;
  };
  