// Función para obtener los días válidos de clase
function getClassDates(academicCalendar, timetable) {
    const { cicleStartDate, cicleEndDate, holydayDates } = academicCalendar;
    const startDate = new Date(cicleStartDate);
    const endDate = new Date(cicleEndDate);

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
        if (timetable[dayName] && timetable[dayName].classDay && !holyDays.includes(date.toDateString())) {
            classDays.push(new Date(date)); // Añadir copia de la fecha
        }
    }

    return classDays;
}

// Función para formatear una fecha en formato yyyy-mm-dd
function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para asignar fechas a las unidades proporcionalmente a sus horas
function assignClassDatesToUnits(coursePlan, validClassDates) {
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
function countDatesInRange(datesList, startDate, endDate) {
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
const academicCalendar = {
    modality: "quarter",
    firstExamDate: "2024-10-16",
    cicleStartDate: "2024-09-01",
    cicleEndDate: "2024-12-13",
    holydayDates: [
        "2024-10-24",
        "2024-11-02",
        "2024-12-09"
    ]
};

const timetable = {
    monday: {
        classDay: false,
        periods: 0
    },
    tuesday: {
        classDay: true,
        periods: 2
    },
    wednesday: {
        classDay: false,
        periods: 0
    },
    thursday: {
        classDay: true,
        periods: 2
    },
    friday: {
        classDay: false,
        periods: 0
    },
    saturday: {
        classDay: false,
        periods: 0
    },
    sunday: {
        classDay: false,
        periods: 0
    }
};

const coursePlan = [
    {
        unitName: "Álgebra elemental y sistemas de ecuaciones lineales",
        hours: "31",
        topics: [
            "Productos notables",
            "Factorización",
            "Resolución de ecuación lineal, cuadrática y sus aplicaciones.",
            "Números complejos y sus operaciones.",
            "Sistemas de ecuaciones lineales y sus aplicaciones: clasificación; métodos de solución."
        ]
    },
    {
        unitName: "Matrices",
        hours: "22",
        topics: [
            "Definición de matriz.",
            "Igualdad de matrices.",
            "Operaciones básicas de matrices.",
            "Matriz identidad.",
            "Clasificación de matrices en atención a sus propiedades: transpuesta; simétrica; antisimétrica; conjugada; ortogonal.",
            "Cálculo de la matriz inversa por transformaciones elementales.",
            "Ecuaciones con matrices: representación matricial de un sistema de ecuaciones lineales; diferencias entre álgebra de números y álgebra matricial.",
            "Partición de matrices: submatriz e hipermatriz; operaciones con matrices por partición."
        ]
    },
    {
        unitName: "Determinantes",
        hours: "9",
        topics: [
            "Definición y propiedades.",
            "Cálculo de los determinantes: regla de Sarrus; desarrollo de un determinante por cofactores (condensación pivotal).",
            "Aplicaciones: cálculo de la inversa por medio de la matriz adjunta; resolución de sistemas de ecuaciones lineales por medio de la regla de Cramer."
        ]
    },
    {
        unitName: "Cálculo diferencial.",
        hours: "13",
        topics: [
            "Funciones y relaciones.",
            "Límites y continuidad, definiciones y propiedades.",
            "La derivada: definición y notación; reglas de derivación.",
            "Aplicaciones de la derivada:",
            "Máximos y mínimos de una función; funciones crecientes y decrecientes;",
            "Formas indeterminadas y regla de L’Hôpital;",
            "Concavidad y puntos de inflexión (prueba de la segunda derivada para valores extremos relativos);",
            "Rapidez de cambio (variación de funciones, desplazamiento, velocidad y aceleración);",
            "Derivadas de orden superior;",
            "Curvatura.",
            "Diferenciales: concepto; la diferencial como aproximación del incremento; errores pequeños; diferenciales de orden superior."
        ]
    }
];

// Obtener los días válidos de clase
const validClassDates = getClassDates(academicCalendar, timetable);

// Asignar las fechas de clase a cada unidad
const updatedCoursePlan = assignClassDatesToUnits(coursePlan, validClassDates);

console.log(updatedCoursePlan)

// Contar cuántas fechas hay en el rango de cada unidad
updatedCoursePlan.forEach(unit => {
    const startDate = unit.startDate;
    const endDate = unit.endDate;
    const count = countDatesInRange(validClassDates, startDate, endDate);
    console.log(`Unidad: ${unit.unitName}, Fechas asignadas: ${count}`);
});