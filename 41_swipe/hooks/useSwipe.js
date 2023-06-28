import React, { useRef, useEffect } from "react";

const useSwipe = ({ onStart, onMove, onEnd }, target) => {
  const listen = useRef(false);
  const init = ({ onStart, onMove, onEnd }, target = document.body) => {
    const initStarInfo = {
      time: new Date(),
      x: 0,
      y: 0,
    };
    let starInfo = initStarInfo;
    let moveInfo = {
      x: 0,
      y: 0,
      xMove: 0,
      yMove: 0,
      totalXMoved: 0,
      totalYMoved: 0,
      speed: new Date(), // px / ms / 1000
    };

    const onTouchStart = (e) => {
      const touch = e.changedTouches[0];
      starInfo = {
        time: +new Date(),
        x: touch.clientX,
        y: touch.clientY,
      };
      if (onStart) {
        const newListen = onStart(starInfo);
        listen.current = onStart && newListen === false ? false : true; // 决定要不要监听本次滑动事件
      }
    };
    const onTouchMove = (e) => {
      if (!listen.current || !onMove) return;
      const touch = e.changedTouches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const xMove = touch.clientX - moveInfo.x;
      const yMove = touch.clientY - moveInfo.y;
      const totalXMoved = touch.clientX - starInfo.x;
      const totalYMoved = touch.clientY - starInfo.y;
      const movedTime = +new Date() - starInfo.time;
      moveInfo = {
        x,
        y,
        xMove,
        yMove,
        totalXMoved,
        totalYMoved,
        xSpeed: totalXMoved / movedTime,
        ySpeed: totalYMoved / movedTime,
      };
      onMove?.(moveInfo);
    };

    const onTouchEnd = (e) => {
      if (!listen.current || !onEnd) return;
      const touch = e.changedTouches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const xMove = touch.clientX - moveInfo.x;
      const yMove = touch.clientY - moveInfo.y;
      const totalXMoved = touch.clientX - starInfo.x;
      const totalYMoved = touch.clientY - starInfo.y;
      const movedTime = +new Date() - starInfo.time;
      moveInfo = {
        x,
        y,
        xMove,
        yMove,
        totalXMoved,
        totalYMoved,
        xSpeed: totalXMoved / movedTime,
        ySpeed: totalYMoved / movedTime,
      };
      starInfo = initStarInfo;
      onEnd?.(moveInfo);
    };
    const onTouchCancel = (e) => {
      if (!listen.current || !onEnd) return;
      const touch = e.changedTouches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const xMove = touch.clientX - moveInfo.x;
      const yMove = touch.clientY - moveInfo.y;
      const totalXMoved = touch.clientX - starInfo.x;
      const totalYMoved = touch.clientY - starInfo.y;
      const movedTime = +new Date() - starInfo.time;
      moveInfo = {
        x,
        y,
        xMove,
        yMove,
        totalXMoved,
        totalYMoved,
        xSpeed: totalXMoved / movedTime,
        ySpeed: totalYMoved / movedTime,
      };
      starInfo = initStarInfo;
      onEnd?.(moveInfo);
    };
    target.addEventListener("touchstart", onTouchStart);
    target.addEventListener("touchmove", onTouchMove);
    target.addEventListener("touchend", onTouchEnd);
    target.addEventListener("touchcancel", onTouchCancel);
    const destroy = () => {
      target.removeEventListener("touchstart", onTouchStart);
      target.removeEventListener("touchmove", onTouchMove);
      target.removeEventListener("touchend", onTouchEnd);
      target.removeEventListener("touchcancel", onTouchCancel);
    };
    return destroy;
  };
  useEffect(() => {
    const destroy = init({ onStart, onMove, onEnd }, target);
    return destroy;
  }, [target]);
};

export default useSwipe;
