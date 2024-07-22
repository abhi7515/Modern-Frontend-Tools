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
