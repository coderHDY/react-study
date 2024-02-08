import React, { useEffect, useRef } from "react";
import useDragTask from "../hooks/useDragTask";
import useDragResize from "../hooks/useDragResize";

const Home = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Process />
        <Process />
        <Process />
        <Process />
        <Process />
        <Process />
        <Process />
      </div>
    </div>
  );
};

export default Home;

const Process = () => {
  const taskRef = useRef(null);
  const { onMouseDown } = useDragTask();
  const { onRightMouseDown, onLeftMouseDown } = useDragResize(taskRef);
  return (
    <div className="process" onMouseDown={onMouseDown} ref={taskRef}>
      <div className="drag-left-handler" onMouseDown={onLeftMouseDown}></div>
      <div className="drag-right-handler" onMouseDown={onRightMouseDown}></div>
    </div>
  );
};
