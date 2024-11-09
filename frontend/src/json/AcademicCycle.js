export const ClassModality = {
  "options": [
    { "label": "Cuatrimestral", "value": "cuatrimestral" },
    { "label": "Semestral", "value": "semestral" },
    { "label": "Trimestral", "value": "trimestral" }
  ],
  "dayConfig": {
    "cuatrimestral": {
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
    "semestral": {
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
    "trimestral": {
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
export const DateInputs =[
    {
      "id": "startDate",
      "label": "Fecha de Inicio de Ciclo",
    },
    {
      "id": "endDate",
      "label": "Fecha de Fin de Ciclo",
    },
    {
      "id": "vacationDate",
      "label": "Días Feriados y Festividades",
       "Multiple" : true
    }
  ]

  export const daysOfWeek = [
    { id: "monday", label: "LUNES" },
    { id: "tuesday", label: "MARTES" },
    { id: "wednesday", label: "MIERCOLES" },
    { id: "thursday", label: "JUEVES" },
    { id: "friday", label: "VIERNES" },
    { id: "saturday", label: "SABADO" },
  ];

  export const defaultDayPeriod ={
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  }