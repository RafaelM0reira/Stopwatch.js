import { useState } from "react";

import "./App.css";

let [miliseconds, seconds, minutes] = [0, 0, 0];
let [dMiliseconds, dSeconds, dMinutes] = [0, 0, 0];
let interval = null;

function App() {
  const [timer, setTimer] = useState({
    minutes: "00",
    seconds: "00",
    miliseconds: "000",
  });
  const [click, setClick] = useState("Start");

  function actualizeDisplay() {
    minutes < 10 ? (dMinutes = "0" + minutes) : (dMinutes = minutes);
    seconds < 10 ? (dSeconds = "0" + seconds) : (dSeconds = seconds);
    miliseconds < 100
      ? miliseconds < 10
        ? (dMiliseconds = "00" + miliseconds)
        : (dMiliseconds = "0" + miliseconds)
      : (dMiliseconds = miliseconds);
    setTimer({
      minutes: dMinutes,
      seconds: dSeconds,
      miliseconds: dMiliseconds,
    });
  }
  function timerFunction() {
    miliseconds += 10;
    if (miliseconds >= 1000) {
      seconds += 1;
      miliseconds = 0;
    }
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    if (miliseconds >= 1000) {
      seconds += 1;
      miliseconds = 0;
    }
    actualizeDisplay();
  }

  function start() {
    if (click === "Stop") {
      stop();
      setClick("Start");
    } else {
      if (interval) return;
      interval = setInterval(timerFunction, 10);
      setClick("Stop");
    }
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  function reset() {
    stop();
    setTimer({
      minutes: "00",
      seconds: "00",
      miliseconds: "000",
    });
    [miliseconds, seconds, minutes] = [0, 0, 0];
  }

  return (
    <>
      <div>
        <span className="timerNumber">{timer.minutes}:</span>
        <span className="timerNumber">{timer.seconds}:</span>
        <span className="timerNumber">{timer.miliseconds}</span>
      </div>
      <div className="card">
        <button onClick={start}>{click}</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;
