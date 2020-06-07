import React, { useState, useEffect, useRef } from "react";
import useInterval from "./hooks/useInterval";
import TimerControl from './components/TimerControl';
import "./App.css";

const DEFAULT_SESSION = 25;
const DEFAULT_BREAK = 5;
const DEFAULT_TIMER = DEFAULT_SESSION * 60;
const audioSrc =
  "http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3";

const App = () => {
  const [breakLength, setBreakLength] = useState(DEFAULT_BREAK);
  const [sesLength, setSesLength] = useState(DEFAULT_SESSION);
  const [timerStatus, setTimerStatus] = useState("stopped");
  // const [intervalId, setIntervalId] = "";
  const [mode, setMode] = useState("Session");
  const [timer, setTimer] = useState(DEFAULT_TIMER);
  const beep = useRef();

  useInterval(
    () => setTimer(timer - 1),
    timerStatus === "running" ? 1000 : null
  );

  useEffect(() => {
    setTimer(sesLength * 60);
  }, [sesLength]);

  useEffect(() => {
    if (timer === 0 && mode === "Session") {
      beep.current.play();
      console.log(beep.current.paused);
      setMode("Break");
      setTimer(breakLength * 60);
    } else if (timer === 0 && mode === "Break") {
      beep.current.play();
      console.log(beep.current.paused);
      setMode("Session");
      setTimer(sesLength * 60);
    }
  }, [mode, timer, breakLength, sesLength]);

  const setBreakLengthHandler = event => {
    if (timerStatus === "running") return;
    if (event.currentTarget.value === "+" && breakLength >= 60) return;
    if (event.currentTarget.value === "-" && breakLength === 1) return;
    if (event.currentTarget.value === "+") {
      setBreakLength(breakLength + 1);
    }
    if (event.currentTarget.value === "-") {
      setBreakLength(breakLength - 1);
    }
  };
  const setSessionLengthHandler = event => {
    if (timerStatus === "running") return;
    if (event.currentTarget.value === "+" && sesLength >= 60) return;
    if (event.currentTarget.value === "-" && sesLength === 1) return;
    if (event.currentTarget.value === "+") {
      setSesLength(sesLength + 1);
    }
    if (event.currentTarget.value === "-") {
      setSesLength(sesLength - 1);
    }
  };

  const beginCountDown = () => {
    if (timerStatus === "running") {
      setTimerStatus("stopped");
      return;
    }
    setTimerStatus("running");
  };
  
  const currTime = () => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  const handleReset = () => {
    beep.current.pause();
    beep.current.currentTime = 0;
    setBreakLength(DEFAULT_BREAK);
    setSesLength(DEFAULT_SESSION);
    setTimer(DEFAULT_TIMER);
    setTimerStatus("stopped");
    setMode("Session");
  };
  return (
    <div className="container">
      <div className="controls">
        <TimerControl
          click={setBreakLengthHandler}
          labelId={"break-label"}
          labelTitle={"Break Length"}
          decrementId={"break-decrement"}
          incrementId={"break-increment"}
          breakId={"break-length"}
          length={breakLength}
        />
        <TimerControl
          click={setSessionLengthHandler}
          labelId={"session-label"}
          labelTitle={"Session Length"}
          decrementId={"session-decrement"}
          incrementId={"session-increment"}
          breakId={"session-length"}
          length={sesLength}
        />
      </div>
      <div className="timer">
        <div className="timer-wrapper">
          <h2 id="timer-label">{mode}</h2>
          <div id="time-left">{currTime()}</div>
        </div>
        <div className="start-stop">
          <button onClick={beginCountDown} id="start_stop">
            <i className="fa fa-play fa-2x" />
            <i className="fa fa-pause fa-2x" />
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa fa-refresh fa-2x" />
          </button>
        </div>
      </div>
      <audio id="beep" preload="auto" src={audioSrc} ref={beep} />
    </div>
  );
};

export default App;
