import { useState, useEffect } from "react";

function useSetState(initialState = {}) {
  const [state, updateState] = useState(initialState);
  const [userCallBack, setUserCallBack] = useState();

  // :(
  useEffect(() => {
    if (userCallBack) userCallBack();
  }, [state]);

  const setPartialState = (newState, cb) => {
    let correctedState = { ...state };
    let tempNewState = newState;

    if (typeof newState === "function") {
      tempNewState = newState();
    }

    if (typeof tempNewState === "object") {
      if (cb) setUserCallBack(cb);

      Object.keys(tempNewState).forEach((el) => {
        if (typeof correctedState[el] !== "undefined") {
          correctedState[el] = tempNewState[el];
          delete tempNewState[el];
        } else {
          correctedState = { ...correctedState, ...tempNewState };
        }
      });
    } else {
      throw new Error("BAD TYPE");
    }

    updateState(correctedState);
  };
  return [state, setPartialState];
}

export default useSetState;
