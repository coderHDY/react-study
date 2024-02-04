import React, { useEffect, useRef } from "react";
import { useSyncScrollController } from "../hooks/useSyncScrollController";

const Home = () => {
  const { addRowSubscriber, addColSubscriber } = useSyncScrollController();
  return (
    <div className="container">
      <Left addColSubscriber={addColSubscriber} />
      <Right
        addRowSubscriber={addRowSubscriber}
        addColSubscriber={addColSubscriber}
      />
    </div>
  );
};

export default Home;

const Left = ({ addColSubscriber }) => {
  const titleContainerRef = useRef(null);
  useEffect(() => {
    if (!titleContainerRef.current) return;
    addColSubscriber(titleContainerRef);
  }, [titleContainerRef.current]);
  return (
    <div className="left">
      <div className="leftTop">left top</div>
      <div className="leftBottom" ref={titleContainerRef}>
        {Array(1000)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="leftBottomItem">
              {index}
            </div>
          ))}
      </div>
    </div>
  );
};
const Right = ({ addRowSubscriber, addColSubscriber }) => {
  const rightContainerRef = useRef(null);
  useEffect(() => {
    if (!rightContainerRef.current) return;
    addRowSubscriber(rightContainerRef);
  }, [rightContainerRef.current]);
  return (
    <div className="right">
      <div className="rightTop" ref={rightContainerRef}>
        {Array(1000)
          .fill(0)
          .map((_, index) => (
            <span key={index} className="rightTopItem">
              {index}
            </span>
          ))}
      </div>
      <GanttBody
        addRowSubscriber={addRowSubscriber}
        addColSubscriber={addColSubscriber}
      />
    </div>
  );
};
const GanttBody = ({ addRowSubscriber, addColSubscriber }) => {
  const ganttBodyRef = useRef(null);
  useEffect(() => {
    if (!ganttBodyRef.current) return;
    addRowSubscriber(ganttBodyRef);
    addColSubscriber(ganttBodyRef);
  }, [ganttBodyRef.current]);
  return (
    <div className="ganttBody" ref={ganttBodyRef}>
      {Array(1000)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="bodyItem">
            {index}
          </div>
        ))}
    </div>
  );
};
