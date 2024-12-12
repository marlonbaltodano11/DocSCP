import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import globalReducer, { initialState } from "./GlobalReducer";
import { loadState, saveState } from "../utils/StatePersistance";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  // Inicializa el estado desde localStorage si está disponible
  const [state, dispatch] = useReducer(
    globalReducer,
    loadState() || initialState
  );

  // Efecto para guardar el estado en localStorage cada vez que cambie
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
