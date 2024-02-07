import React, { useEffect, useRef } from "react";
import useDragTask from "../hooks/useDragTask";

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
  const { onMouseDown } = useDragTask();
  return <div className="process" onMouseDown={onMouseDown}></div>;
};
