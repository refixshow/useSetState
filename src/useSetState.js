import { useState } from "react";

const useSetState = (initialState = {}) => {
  const [state, updateState] = useState(initialState);

  // check if value can be returned as object
  function typeHandling(value) {
    const type = typeof value;

    switch (type) {
      // check if function returns object
      case "function": {
        if (typeof value() === "object") {
          // run function and return its object
          return value();
        } else throw new Error("FUNCTION DOESN'T RETURN OBJECT");
      }

      // check if its object
      case "object":
        return value;

      // error any other type
      default:
        throw new Error("BAD TYPE");
    }
  }

  // update the state
  function updateValues(newValue, cb) {
    Object.keys(newValue).forEach((el) => {
      const tempnewValue = newValue;
      // if state containes key same as newValue
      if (state[el]) {
        // if keys values are equal throw error
        if (state[el] === tempnewValue[el])
          throw new Error(`VALUES ARE EQUAL. VALUE NAME = "${el}"`);
        // else update state with new value and drop it from tempnewValue obj
        // it allows to update one of many values that can be same as the one in state
        // example:
        // const a = { x: 2, y: 1 };
        // const b = { x: 1, y: 5, z: 3 };
        else {
          const tempState = state;
          tempState[el] = tempnewValue[el];
          delete tempnewValue[el];
          updateState({ ...tempState });
        }
        // if state doesnt contain any of newValue values, create new object with prevState and newValue
      } else {
        updateState({ ...state, ...tempnewValue });
      }
    });
  }

  function setPartialState(newState) {
    // type handling
    const correctedNewState = typeHandling(newState);

    // update state partialy
    updateValues(correctedNewState);
  }

  // return hook

  return [state, setPartialState];
};

export default useSetState;
