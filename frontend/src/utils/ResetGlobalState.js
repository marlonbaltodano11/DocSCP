// @utils/ResetGlobalState.js

import { AcademicCalendarObject, FormatSyllabusObject, CheckBoxesValue } from "@json/GlobalReducerJson";

/**
 * Limpia todo el estado global y lo resetea a sus valores iniciales.
 *
 *
 * uso
 useEffect(() => {
    resetEntireGlobalState(dispatch);
  }, []);
 * @param {Function} dispatch - La función dispatch del contexto global.
 */
export const resetEntireGlobalState = (dispatch) => {
    dispatch({
      type: "RESET_ENTIRE_GLOBAL_STATE",
      payload: {
        AcademicCalendarObject,
        FormatSyllabusObject,
        CheckBoxesValue
      },
    });
  };
  
