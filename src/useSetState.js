import { useState, useEffect, useRef } from "react";

function useSetState(initialState = {}) {
  const [state, updateState] = useState(initialState);
  const [prevState, setPrevState] = useState(null);
  const ref = useRef();

  // :((((((
  useEffect(() => {
    if (ref.current && JSON.stringify(prevState) !== JSON.stringify(state))
      ref.current();
  }, [state, prevState]);

  const setPartialState = (newState, cb) => {
    setPrevState(state);
    let correctedState = { ...state };
    let tempNewState = newState;

    if (typeof tempNewState === "function") {
      tempNewState = tempNewState();
    }

    if (typeof tempNewState === "object") {
      if (cb) ref.current = cb;

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
