// src/utils/statePersistence.js

const STORAGE_KEY = "globalState";

// Guarda el estado global en localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error("Error guardando el estado en localStorage", error);
  }
};

// Carga el estado global desde localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error cargando el estado desde localStorage", error);
    return undefined;
  }
};

// Limpia el estado guardado
export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error limpiando el estado en localStorage", error);
  }
};
