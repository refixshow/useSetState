import React from "react";
import useSetState from "./useSetState";

const App = () => {
  const [clicks, setClicks] = useSetState({ value: 0 });

  const myCallBack = () => {
    console.log(clicks);
  };

  return (
    <div className="container">
      <div>
        <h3>{JSON.stringify(clicks, null, 1)}</h3>
        <button
          onClick={() => {
            setClicks({ value: clicks.value + 1 }, myCallBack);
          }}
        >
          click
        </button>
      </div>

      <div>
        <h3>test: {JSON.stringify({ value: 0, a: "a", b: "b" }, null, 1)}</h3>
        <button
          onClick={() => {
            setClicks({ value: 0, a: "a", b: "b" }, myCallBack);
          }}
        >
          click
        </button>
      </div>
      <div>
        <h3>test: [1, 2, 3]</h3>
        <button
          onClick={() => {
            setClicks([1, 2, 3], myCallBack);
          }}
        >
          click
        </button>
      </div>
    </div>
  );
};

export default App;
