import React from "react";
import useSetState from "./useSetState";

const App = () => {
  const [clicks, setClicks] = useSetState({ value: 0 });

  const myCallBack = () => {
    console.log(clicks);
  };

  return (
    <div className="container">
      <div>{JSON.stringify(clicks, null, 1)}</div>
      <button
        onClick={() => {
          setClicks({ value: clicks.value + 1 }, myCallBack);
        }}
      >
        click
      </button>
    </div>
  );
};

export default App;
