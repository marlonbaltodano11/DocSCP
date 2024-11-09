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
      /*Necesario el objeto vacio para el correcto funcionamiento */
    },
    {
      id: "{{academicRegime}}",
      label: "Ciclo Académico",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{careerYear}}",
      label: "Año",
      placeholder: "Escriba aquí...",
      type: "text",
    },
    {
      id: "{{credits}}",
      label: "Créditos",
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
      id: "{{weeklyFrequency}}",
      label: "Frecuencia Semanal",
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