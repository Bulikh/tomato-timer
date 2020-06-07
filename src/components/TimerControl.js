import React from "react";

const TimerControl = props => {
  return (
    <div className="control-container">
      <div id={props.labelId}>
        <h3>{props.labelTitle}</h3>
      </div>
      <div className="control-buttons">
        <button onClick={props.click} value="-" id={props.decrementId}>
          <i className="fa fa-arrow-down fa-2x" />
        </button>
        <div>
          <h2 id={props.breakId}>{props.length}</h2>
        </div>
        <button onClick={props.click} value="+" id={props.incrementId}>
          <i className="fa fa-arrow-up fa-2x" />
        </button>
      </div>
    </div>
  );
};

export default TimerControl;
