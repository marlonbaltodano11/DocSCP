export const ValidAcademicCycle = (AcademicCalendar, Timetable) =>{

//&& AcademicCalendar.holydayDates.length != 0

const ValidAcademicCalendar =(
       AcademicCalendar.firstExamDate != "" &&
       AcademicCalendar.cicleStartDate != "" &&
       AcademicCalendar.cicleEndDate != "" )
      
       const ValidTimetable = Object.values(Timetable).some(day => day.classDay === true);

    // Retornar true solo si ambas condiciones son válidas
    return ValidAcademicCalendar && ValidTimetable;
}