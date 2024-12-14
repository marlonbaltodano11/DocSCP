export const InputsTableStepOne = [
    {
      id: "{{signatureName}}",
      label: "Asignatura",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{signatureCode}}",
      label: "Código",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{modality}}",
      label: "Modalidad",
      radios: [
        {
          id: "{{modality}}-in-person",
          label: "Presencial",
          value: "in-person",
          name: "{{modality}}",
        },
        {
          id: "{{modality}}-semi-in-person",
          label: "Semi-Presencial",
          value: "semi-in-person",
          name: "{{modality}}",
        },
      ],
    },
    {
      id: "{{academicRegime}}",
      label: "Ciclo Académico",
      radios: [
        {
          id: "{{academicRegime}}-quarter",
          label: "Cuatrimestre",
          value: "quarter",
          name: "{{academicRegime}}",
        },
        {
          id: "{{academicRegime}}-semester",
          label: "Semestre",
          value: "semester",
          name: "{{academicRegime}}",
        },
        {
          id: "{{academicRegime}}-trimester",
          label: "Trimestre",
          value: "trimester",
          name: "{{academicRegime}}",
        },
      ],
    },    
    {
      id: "{{credits}}",
      label: "Créditos",
      radios: [
        {
          id: "{{credits}}-2",
          label: "2",
          value: "2",
          name: "{{credits}}",
        },
        {
          id: "{{credits}}-3",
          label: "3",
          value: "3",
          name: "{{credits}}",
        },
        {
          id: "{{credits}}-4",
          label: "4",
          value: "4",
          name: "{{credits}}",
        },
        {
          id: "{{credits}}-5",
          label: "5",
          value: "5",
          name: "{{credits}}",
        },
        {
          id: "{{credits}}-6",
          label: "6",
          value: "6",
          name: "{{credits}}",
        },
      ],
    },
    {},
    {
      id: "{{weeklyFrequency}}",
      label: "Frecuencia Semanal",
      radios: [
        {
          id: "{{weeklyFrequency}}-2",
          label: "2",
          value: "2",
          name: "{{weeklyFrequency}}",
        },
        {
          id: "{{weeklyFrequency}}-3",
          label: "3",
          value: "3",
          name: "{{weeklyFrequency}}",
        },
        {
          id: "{{weeklyFrequency}}-4",
          label: "4",
          value: "4",
          name: "{{weeklyFrequency}}",
        },
        {
          id: "{{weeklyFrequency}}-5",
          label: "5",
          value: "5",
          name: "{{weeklyFrequency}}",
        },
        {
          id: "{{weeklyFrequency}}-6",
          label: "6",
          value: "6",
          name: "{{weeklyFrequency}}",
        },
      ],
    },
    {},
    {
      id: "{{careerYear}}",
      label: "Año",
      placeholder: "Escriba aquí...",
      type: "text",
    },

    {
      id: "{{totalHours}}",
      label: "Total de Horas",
      placeholder: "Escriba aquí...",
      type: "text",
    },

    {
      id: "{{career}}",
      label: "Carrera",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{teacherFullname}}",
      label: "Grado y Nombre Completo del Docente",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{deliveryDate}}",
      label: "Fecha de Entrega",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{updateDate}}",
      label: "Fecha de Actualización",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{approvedDate}}",
      label: "Fecha de Aprobación",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{timetable}}",
      label: "Horario",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{approvedBy}}",
      label: "Aprobado por",
      placeholder: "Escriba aquí...",
      type: "text",
    },
  ];