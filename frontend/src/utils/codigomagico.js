// Función para obtener los días válidos de clase
export function getClassDates(academicCalendar, timetable) {
    const { cicleStartDate, cicleEndDate, holydayDates } = academicCalendar;
    const startDate = new Date(cicleStartDate);
    const endDate = new Date(cicleEndDate);

    // Calcular la fecha de inicio de la última semana
    const lastWeekStartDate = new Date(endDate);
    lastWeekStartDate.setDate(lastWeekStartDate.getDate() - 6);

    const holyDays = holydayDates.map(date => new Date(date).toDateString());
    const classDays = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        const dayMapping = {
            0: "sunday",
            1: "monday",
            2: "tuesday",
            3: "wednesday",
            4: "thursday",
            5: "friday",
            6: "saturday"
        };
        const dayName = dayMapping[dayOfWeek];

        // Excluir días de la última semana y días feriados
        if (
            timetable[dayName] &&
            timetable[dayName].classDay &&
            !holyDays.includes(date.toDateString()) &&
            date < lastWeekStartDate
        ) {
            classDays.push(new Date(date)); // Añadir copia de la fecha
        }
    }

    return classDays;
}

// Función para formatear una fecha en formato yyyy-mm-dd
function formatDateToYYYYMMDD(date) {
    if(!date){
        return "";  
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para asignar fechas a las unidades proporcionalmente a sus horas
export function assignClassDatesToUnits(coursePlan, validClassDates) {
    const totalHours = coursePlan.reduce((sum, unit) => sum + (parseInt(unit.hours) || 1), 0);

    let currentIndex = 0;
    coursePlan.forEach(unit => {
        const unitHours = parseInt(unit.hours) || 1; 
        const classCount = Math.round((unitHours / totalHours) * validClassDates.length);

        // Asignar fechas en formato yyyy-mm-dd
        unit.startDate = formatDateToYYYYMMDD(validClassDates[currentIndex]);
        unit.endDate = formatDateToYYYYMMDD(validClassDates[Math.min(currentIndex + classCount - 1, validClassDates.length - 1)]);

        currentIndex += classCount;
    });

    return coursePlan;
}


// Función para contar cuántas fechas hay en un rango de una lista de fechas
export function countDatesInRange(datesList, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const count = datesList.reduce((total, date) => {
        const currentDate = new Date(date);
        if (currentDate >= start && currentDate <= end) {
            return total + 1;
        }

        return total;
    }, 0);

    return count;
}

// Ejemplo completo usando las funciones anteriores:
