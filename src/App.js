import React, { useEffect } from "react";
import useSetState from "./useSetState";

const App = () => {
  const [clicks, setClicks] = useSetState({ value: 0 });

  useEffect(() => {
    console.log(clicks);
  }, [clicks]);

  return (
    <div className="container">
      <div className="left">
        <h1>ANSWER</h1>
        <div>
          <div className="answer">{JSON.stringify(clicks, null, 1)}</div>
          <button
            onClick={() => {
              setClicks({ value: clicks.value + 1 });
            }}
          >
            click
          </button>
        </div>
      </div>
      <div className="right">
        <h1>TESTS</h1>
        <div className="test">
          <span>{JSON.stringify({ value: 400, x: 2, y: 4 }, null, 2)}</span>
          <button
            onClick={() => {
              setClicks({ value: 400, x: 2, y: 4 });
            }}
          >
            test 1
          </button>
        </div>
        <div className="test">
          <span>
            {JSON.stringify(["abc", 24, { john: "john" }, [1, 2, 3]], null, 2)}
          </span>
          <button
            onClick={() => {
              setClicks(["abc", 24, { john: "john" }, [1, 2, 3]]);
            }}
          >
            test 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
