import "./styles.css";
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);
  const trafficConfig = [
    {
      color: "red",
      duration: 1000,
    },
    {
      color: "yellow",
      duration: 5000,
    },
    {
      color: "green",
      duration: 2000,
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
    }, trafficConfig[currentIndex].duration);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="App">
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
