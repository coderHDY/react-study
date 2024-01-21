// @monaco-editor/react + ajv
import React, { useState, useEffect, useRef } from "react";
import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";

const randomDate = () => {
  return randomDateFrom(new Date(2020, 0, 1), new Date());
};
const randomDateFrom = (start, end = new Date()) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
let tasks = Array(100)
  .fill()
  .map((item, i) => {
    const start = randomDate();
    const end = randomDateFrom(start);
    return {
      start,
      end,
      name: "Idea",
      id: `Task ${i}`,
      type: "task",
      progress: 45,
      isDisabled: true,
      styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    };
  });
const Home = () => {
  return (
    <>
      <h2>Home</h2>
      <Gantt tasks={tasks} />
    </>
  );
};

export default Home;
