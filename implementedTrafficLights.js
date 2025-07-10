import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);
  const trafficConfig = [
    {
      color: "red",
      duration: 30000,
    },
    {
      color: "yellow",
      duration: 30000,
    },
    {
      color: "green",
      duration: 30000,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => {
        if (currentIndex >= 0 && currentIndex < 2) {
          return ++currentIndex;
        } else {
          return 0;
        }
      });
    }, 30000);
  }, []);

  return (
    <div className="App">
      {console.log("index", currentIndex)}
      {trafficConfig.map((light, idx) => (
        <div
          style={{
            backgroundColor: `${light.color}`,
            opacity: currentIndex == idx ? 1 : 0.25,
          }}
          className="traffic-light"
          key={idx}
        ></div>
      ))}
    </div>
  );
}
