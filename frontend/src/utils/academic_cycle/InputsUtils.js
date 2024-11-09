export const formatDuration = (value, classModality) => {
    let durationPerPeriod;

    // Determinar la duración por período según la modalidad
    if (classModality === "cuatrimestral" || classModality === "semestral") {
      durationPerPeriod = 50;
    }
    
    if (classModality === "trimestral") {
      durationPerPeriod = 35;
    }

    // Calcular la duración total en minutos
    const totalMinutes = value * durationPerPeriod;

    // Convertir a horas y minutos
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  export const isValidNumber = (value) => {
    // Lista de números permitidos
    const allowedNumbers = [1, 2, 3, 4, 5, 6];
    
    if (/[eE+-]/.test(value)) {
      return false; // No actualizar el estado si se ingresa 'e', '+' o '-'
    }

    // Verificar si el valor está en la lista de números permitidos
    return allowedNumbers.includes(parseInt(value, 10));
  };