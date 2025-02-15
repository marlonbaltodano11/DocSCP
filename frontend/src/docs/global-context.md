# Documentación del Contexto Global en React

## Introducción

El Contexto Global en React permite manejar el estado global de la aplicación sin necesidad de pasar props manualmente entre componentes. Se implementa con `useReducer` y persistencia en `localStorage`.

## Implementación del Contexto Global

### 1. Creación del Contexto y Proveedor

Define el contexto y su proveedor en `GlobalProvider.js`:

```jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import globalReducer, { initialState } from "./GlobalReducer";
import { loadState, saveState } from "../utils/StatePersistance";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    globalReducer,
    loadState() || initialState
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalState = () => useContext(GlobalContext)[0];
const useGlobalDispatch = () => useContext(GlobalContext)[1];

export { GlobalContext, useGlobalState, useGlobalDispatch };
export default GlobalProvider;

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
```

### 2. Definición del Reducer

El `GlobalReducer.js` maneja el estado global a través de acciones predefinidas.

#### Tipos de Acciones (algunas)

```jsx
const types = {
  SET_ACADEMIC_CALENDAR: "SET_ACADEMIC_CALENDAR",
  ADD_UNIT: "ADD_UNIT",
  UPDATE_TASK: "UPDATE_TASK",
  RESET_STATE: "RESET_STATE",
};
```

#### Estado Inicial (se ha importado)

```jsx
const initialState = {
  academicCalendar: {},
  coursePlan: [],
  checkboxes: {},
};
```

#### Implementación del Reducer

```jsx
const globalReducer = (state, action) => {
  switch (action.type) {
    case types.SET_ACADEMIC_CALENDAR:
      return {
        ...state,
        academicCalendar: action.payload,
      };
    case types.ADD_UNIT:
      return {
        ...state,
        coursePlan: [...state.coursePlan, { unitName: "", topics: [""] }],
      };
    case types.UPDATE_TASK:
      return {
        ...state,
        coursePlan: state.coursePlan.map((task, i) =>
          i === action.payload.index
            ? { ...task, ...action.payload.updatedTask }
            : task
        ),
      };
    case types.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export { initialState, types };
export default globalReducer;
```

### 3. Uso del Contexto en Componentes

#### Obtener el Estado Global

```jsx
import { useGlobalState } from "../context/GlobalProvider";

const MiComponente = () => {
  const state = useGlobalState();
  return <div>{JSON.stringify(state)}</div>;
};
```

#### Despachar Acciones

```jsx
import { useGlobalDispatch } from "../context/GlobalProvider";

const OtroComponente = () => {
  const dispatch = useGlobalDispatch();
  const actualizarCalendario = () => {
    dispatch({
      type: "SET_ACADEMIC_CALENDAR",
      payload: { modalidad: "online" },
    });
  };
  return <button onClick={actualizarCalendario}>Actualizar Calendario</button>;
};
```

### 4. Mini Guía para Agregar un Nuevo Estado

1. **Definir el nuevo estado en `initialState`.**
2. **Agregar un nuevo tipo de acción en `types`.**
3. **Implementar un `case` en `globalReducer` para manejar la acción.**
4. **Usar `useGlobalDispatch` para actualizar el estado en los componentes.**

## Persistencia del Estado

El contexto usa `localStorage` para guardar y cargar el estado:

```jsx
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("globalState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.error("Error cargando estado", e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("globalState", serializedState);
  } catch (e) {
    console.error("Error guardando estado", e);
  }
};
```

## Conclusión

Este contexto global proporciona una gestión eficiente del estado, incluyendo persistencia en `localStorage`, y permite escalar la aplicación de manera modular y organizada.
