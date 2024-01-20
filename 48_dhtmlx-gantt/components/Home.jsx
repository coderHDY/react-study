// @monaco-editor/react + ajv
import React, { useState, useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { ganttMock } from "mock/gantt";
import ToolBar from "./Toolbar";

const Home = () => {
  const ganttContainer = useRef(null);
  const [tasks] = useState(ganttMock);
  const [zoom, setZoom] = useState("Days");
  const onZoomChange = (value) => {
    setZoom(value);
    if (!gantt.$initialized) {
      initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  };
  const initZoom = () => {
    gantt.i18n.setLocale("cn");
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    gantt.init(ganttContainer.current);
    gantt.ext.zoom.init({
      levels: [
        {
          name: "Hours",
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: "day", step: 1, format: "%d %M" },
            { unit: "hour", step: 1, format: "%H" },
          ],
        },
        {
          name: "Days",
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: "week", step: 1, format: "Week #%W" },
            { unit: "day", step: 1, format: "%d %M" },
          ],
        },
        {
          name: "Months",
          scale_height: 30,
          min_column_width: 70,
          scales: [
            { unit: "month", step: 1, format: "%F" },
            { unit: "week", step: 1, format: "#%W" },
          ],
        },
      ],
    });
  };
  useEffect(() => {
    initZoom();
    gantt.parse(tasks);
  }, []);
  return (
    <>
      <h2>Home</h2>
      <ToolBar zoom={zoom} onZoomChange={onZoomChange} />
      <div className="gantt-container">
        <div
          ref={ganttContainer}
          style={{ width: "100%", height: "100%" }}
        ></div>
      </div>
    </>
  );
};

export default Home;
