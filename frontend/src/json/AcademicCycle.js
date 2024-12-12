export const ClassModality = {
  options: [
    { label: "Cuatrimestral", value: "quarter" },
    { label: "Semestral", value: "semester" },
    { label: "Trimestral", value: "trimester" }
  ],
  dayConfig: {
    quarter: {
      selectedDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
      disabledDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true, // Sábado deshabilitado
      }
    },
    semester: {
      selectedDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
      },
      disabledDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true, // Sábado deshabilitado
      }
    },
    trimester: {
      selectedDays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: true,
      },
      disabledDays: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false, // Solo sábado habilitado
      }
    }
  }
};

export const DateInputs = [
  
  {
    id: "firstExamDate",
    label: "Fecha de Primer Examen",
    multiple: false
  },
  {
    id: "cicleStartDate",
    label: "Fecha de Inicio de Ciclo",
    multiple: false
  },
  {
    id: "cicleEndDate",
    label: "Fecha de Fin de Ciclo",
    multiple: false
  },
  {
    id: "holydayDates",
    label: "Fecha de Días Feriados",
    multiple: true
  }
];


export const daysOfWeek = [
  { id: "monday", label: "LUNES" },
  { id: "tuesday", label: "MARTES" },
  { id: "wednesday", label: "MIÉRCOLES" },
  { id: "thursday", label: "JUEVES" },
  { id: "friday", label: "VIERNES" },
  { id: "saturday", label: "SÁBADO" },
];


export const defaultDayPeriod = {
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0,
};
