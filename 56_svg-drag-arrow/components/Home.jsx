import React, { useCallback, useEffect, useRef, useState } from "react";
import useDragTask from "../hooks/useDragTask";
import useDragResize from "../hooks/useDragResize";
import useDragArrow from "hooks/useDragArrow";

const links = [
  {
    source: "A",
    sourceTime: "end",
    target: "B",
    targetTime: "start",
  },
  {
    source: "B",
    sourceTime: "end",
    target: "C",
    targetTime: "start",
  },
  {
    source: "C",
    sourceTime: "start",
    target: "D",
    targetTime: "start",
  },
  {
    source: "D",
    sourceTime: "start",
    target: "E",
    targetTime: "end",
  },
  {
    source: "E",
    sourceTime: "end",
    target: "F",
    targetTime: "start",
  },
];
const linksInfo = [
  {
    startX: 100,
    startY: 100,
    endX: 200,
    endY: 200,
    startDirect: 1,
    endDirect: 1,
  },
  {
    startX: 200,
    startY: 200,
    endX: 300,
    endY: 300,
    startDirect: -1,
    endDirect: -1,
  },
  {
    startX: 300,
    startY: 300,
    endX: 400,
    endY: 400,
    startDirect: -1,
    endDirect: 1,
  },
  {
    startX: 400,
    startY: 400,
    endX: 500,
    endY: 500,
    startDirect: 1,
    endDirect: -1,
  },
  {
    startX: 500,
    startY: 500,
    endX: 600,
    endY: 600,
    startDirect: 1,
    endDirect: 1,
  },
  {
    startX: 600,
    startY: 600,
    endX: 700,
    endY: 700,
    startDirect: -1,
    endDirect: -1,
  },
  {
    startX: 700,
    startY: 700,
    endX: 800,
    endY: 800,
    startDirect: -1,
    endDirect: 1,
  },
  {
    startX: 800,
    startY: 800,
    endX: 900,
    endY: 900,
    startDirect: 1,
    endDirect: -1,
  },
  {
    startX: 900,
    startY: 900,
    endX: 1000,
    endY: 1000,
    startDirect: 1,
    endDirect: 1,
  },
  {
    startX: 1000,
    startY: 1000,
    endX: 1100,
    endY: 1100,
    startDirect: -1,
    endDirect: -1,
  },
  {
    startX: 1100,
    startY: 1100,
    endX: 1200,
    endY: 1200,
    startDirect: -1,
    endDirect: 1,
  },
  {
    startX: 1200,
    startY: 1200,
    endX: 1300,
    endY: 1300,
    startDirect: 1,
    endDirect: -1,
  },
  {
    startX: 1300,
    startY: 1300,
    endX: 1400,
    endY: 1400,
    startDirect: 1,
    endDirect: 1,
  },
  {
    startX: 1400,
    startY: 1400,
    endX: 1500,
    endY: 1500,
    startDirect: -1,
    endDirect: -1,
  },
  {
    startX: 1500,
    startY: 1500,
    endX: 1600,
    endY: 1600,
    startDirect: -1,
    endDirect: 1,
  },
  {
    startX: 1600,
    startY: 1600,
    endX: 1700,
    endY: 1700,
    startDirect: 1,
    endDirect: -1,
  },
];

const TRIANGLE_WIDTH = 5;
const TASK_HEIGHT = 34;
const PREPARE_WIDTH = 40;

const Home = () => {
  const [links, setLinks] = useState(linksInfo);
  const containerRef = useRef(null);

  const { start, end, onMouseDown } = useDragArrow({ containerRef });
  return (
    <div className="container" ref={containerRef} onMouseDown={onMouseDown}>
      <svg className="svg-container" width="1400" height="1400">
        {links.map((link, index) => (
          <Link link={link} />
        ))}
      </svg>
      <DragLink start={start} end={end} />
    </div>
  );
};

export default Home;

const Link = ({ link }) => {
  const { startDirect, startX, startY, endDirect, endX, endY } = link;
  const lineStart = `${startX},${startY}`;
  const horWidth =
    endX - endDirect * PREPARE_WIDTH - (startX + startDirect * PREPARE_WIDTH);
  const verWidth = endY - startY - TASK_HEIGHT / 2;
  const verSign = Math.sign(verWidth);
  return (
    <g>
      <path
        d={`
          M ${lineStart}
          h ${startDirect * PREPARE_WIDTH}
          v ${(verSign * TASK_HEIGHT) / 2}
          h ${horWidth}
          v ${verWidth}
          h ${endDirect * (PREPARE_WIDTH - TRIANGLE_WIDTH)}
        `}
        stroke="#42ff4f"
        strokeLinejoin="round"
        strokeWidth="1"
        fill="none"
      />

      {/* 三角形 */}
      <polygon
        points={`
          ${endX - TRIANGLE_WIDTH * 2},${endY - TRIANGLE_WIDTH}
          ${endX - TRIANGLE_WIDTH * 2},${endY + TRIANGLE_WIDTH}
          ${endX},${endY}
        `}
        transform={`rotate(${endDirect > 0 ? 0 : 180},${endX},${endY})`}
        fill="#42ff4f"
      />
    </g>
  );
};

const DragLink = ({ start, end }) => {
  if (!start || !end) return <></>;

  // 给三角形箭头留安全展示距离
  const PADDING = 10;

  const width = Math.abs(end.x - start.x) + PADDING * 2;
  const height = Math.abs(end.y - start.y) + PADDING * 2;
  const left = Math.min(start.x, end.x) - PADDING;
  const top = Math.min(start.y, end.y) - PADDING;
  const startX = start.x < end.x ? PADDING : width - PADDING;
  const startY = start.y < end.y ? PADDING : height - PADDING;
  const endX = start.x < end.x ? width - PADDING : PADDING;
  const endY = start.y < end.y ? height - PADDING : PADDING;
  return (
    <svg
      className="drag-svg-container"
      style={{ left, top }}
      width={width}
      height={height}
    >
      <defs>
        <marker
          id="drag-triangle"
          orient="auto"
          viewBox="0 0 10 10"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
        >
          <polygon points="0,0 10,5 0,10" fill="#42ff4f" />
        </marker>
      </defs>
      <path
        d={`M ${startX},${startY} L ${endX},${endY}`}
        stroke="#42ff4f"
        strokeLinejoin="round"
        strokeWidth="1"
        markerEnd="url(#drag-triangle)"
        fill="none"
      />
    </svg>
  );
};
