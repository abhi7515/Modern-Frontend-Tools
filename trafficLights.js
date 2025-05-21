import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [redDuration, setRedDuration] = useState(2);
  const [greenDuration, setGreenDuration] = useState(2);
  const [yellowDuration, setYellowDuration] = useState(2);
  const [activeIndex, setActiveIndex] = useState(0);

  const lights = {
    red: redDuration,
    yellow: yellowDuration,
    green: greenDuration,
    yellow: yellowDuration,
  };

  const redArray = Array(lights.red).fill("red");
  const yellowArray = Array(lights.yellow).fill("yellow");
  const greenArray = Array(lights.green).fill("green");
  const secondYellowArray = Array(lights.yellow).fill("yellow");
  const resultArray = redArray.concat(
    yellowArray,
    greenArray,
    secondYellowArray
  );

  const time = lights.red + 2 * lights.yellow + lights.green;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === resultArray.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [resultArray.length]);

  return (
    <div className="App">
      <div
        style={{
          height: "fit-content",
          width: "fit-content",
          backgroundColor: "black",
          padding: "20px",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "100px",
            backgroundColor: "red",
            borderRadius: "50%",
            opacity: resultArray[activeIndex] === "red" ? "1" : "0.2",
          }}
        ></div>
        <div
          style={{
            height: "100px",
            width: "100px",
            backgroundColor: "yellow",
            borderRadius: "50%",
            opacity: resultArray[activeIndex] === "yellow" ? "1" : "0.2",
          }}
        ></div>
        <div
          style={{
            height: "100px",
            width: "100px",
            backgroundColor: "green",
            borderRadius: "50%",
            opacity: resultArray[activeIndex] === "green" ? "1" : "0.2",
          }}
        ></div>
      </div>
    </div>
  );
}







---------------------useMemo------------------


// The sequence array (["red", ..., "yellow", ..., "green", ...]) is computed from state values (redDuration, etc.) and used inside useEffect's dependency array.

// If you don’t memoize it:

// This array is new on every render, even if the durations haven’t changed. That causes the useEffect to run unnecessarily because React sees the array reference has changed — even though its contents might not have.

// Avoid unnecessary interval resets
// useEffect will only re-run when the durations change, not on every render.

// Without useMemo, your useEffect depends on a value (sequence) that’s unstable — it changes on every render due to a new array reference.

// sequence can be expensive if durations are large. useMemo ensures it's only recalculated when needed.

// Rule of thumb:
// If you're using a computed value (like an array or object) inside a dependency array, and it’s derived from state/props, use useMemo.

import "./styles.css";
import { useState, useEffect, useMemo } from "react";

export default function App() {
  const [redDuration, setRedDuration] = useState(2);
  const [yellowDuration, setYellowDuration] = useState(2);
  const [greenDuration, setGreenDuration] = useState(2);
  const [activeIndex, setActiveIndex] = useState(0);

  const sequence = useMemo(() => {
    return [
      ...Array(redDuration).fill("red"),
      ...Array(yellowDuration).fill("yellow"),
      ...Array(greenDuration).fill("green"),
      ...Array(yellowDuration).fill("yellow"),
    ];
  }, [redDuration, yellowDuration, greenDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === sequence.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [sequence]);

  const lightStyle = (color) => ({
    height: "100px",
    width: "100px",
    backgroundColor: color,
    borderRadius: "50%",
    opacity: sequence[activeIndex] === color ? 1 : 0.2,
    margin: "10px 0",
  });

  return (
    <div className="App">
      <div
        style={{
          backgroundColor: "black",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={lightStyle("red")}></div>
        <div style={lightStyle("yellow")}></div>
        <div style={lightStyle("green")}></div>
      </div>
    </div>
  );
}

