import React, { useRef, useEffect, useState } from "react";

// 节流函数
const throttle = (fn, sleep = 200) => {
  let timer = null;
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, sleep);
    return () => {
      timer = null;
    };
  };
};

// 节流监听窗口size变化
const useWindowResize = (callback, throttleTime = 200) => {
  const throttledUpdateWidth = throttle(callback, throttleTime);

  useEffect(() => {
    // 添加事件监听器, 手机横屏
    window.addEventListener("orientationchange", throttledUpdateWidth);
    window.addEventListener("resize", throttledUpdateWidth);
    return () => {
      window.removeEventListener("resize", throttledUpdateWidth);
      window.removeEventListener("orientationchange", throttledUpdateWidth);
    };
  }, [throttledUpdateWidth]);
  useEffect(() => {
    callback();
  }, []);
};

const init = ({ onStart, onMove, onEnd }, target = document.body) => {
  let listen = false;
  const domWidth = document.body.clientWidth;
  const domHeight = document.body.clientHeight;
  const initStarInfo = {
    time: new Date(),
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
  };
  let starInfo = initStarInfo;
  let moveInfo = {
    x: 0,
    y: 0,
    xMoved: 0,
    yMoved: 0,
    xMovePercent: 0,
    yMovePercent: 0,
    xSpeed: 0,
    ySpeed: 0, // px / ms / 1000
  };

  const onTouchStart = (e) => {
    const touch = e.changedTouches[0];
    starInfo = {
      time: +new Date(),
      x: touch.clientX,
      y: touch.clientY,
      xPercent: touch.clientX / domWidth,
      yPercent: touch.clientY / domHeight,
    };
    if (onStart) {
      const newListen = onStart(starInfo);
      listen = onStart && newListen === false ? false : true; // 决定要不要监听本次滑动事件
    }
  };
  const onTouchMove = (e) => {
    if (!listen || !onMove) return;
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const xMoved = touch.clientX - starInfo.x;
    const yMoved = touch.clientY - starInfo.y;
    const xMovePercent = Math.abs(touch.clientX - starInfo.x) / domWidth;
    const yMovePercent = Math.abs(touch.clientY - starInfo.y) / domHeight;
    const movedTime = +new Date() - starInfo.time;
    moveInfo = {
      x,
      y,
      xMoved,
      yMoved,
      xMovePercent,
      yMovePercent,
      xSpeed: xMoved / movedTime,
      ySpeed: yMoved / movedTime,
    };
    onMove?.(moveInfo);
  };

  const onTouchEnd = (e) => {
    if (!listen || !onEnd) return;
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const xMoved = touch.clientX - starInfo.x;
    const yMoved = touch.clientY - starInfo.y;
    const xMovePercent = Math.abs(touch.clientX - starInfo.x) / domWidth;
    const yMovePercent = Math.abs(touch.clientY - starInfo.y) / domHeight;
    const movedTime = +new Date() - starInfo.time;
    moveInfo = {
      x,
      y,
      xMoved,
      yMoved,
      xMovePercent,
      yMovePercent,
      xSpeed: xMoved / movedTime,
      ySpeed: yMoved / movedTime,
    };
    starInfo = initStarInfo;
    onEnd?.(moveInfo);
  };
  const onTouchCancel = (e) => {
    if (!listen || !onEnd) return;
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    const xMoved = touch.clientX - starInfo.x;
    const yMoved = touch.clientY - starInfo.y;
    const xMovePercent = Math.abs(touch.clientX - starInfo.x) / domWidth;
    const yMovePercent = Math.abs(touch.clientY - starInfo.y) / domHeight;
    const movedTime = +new Date() - starInfo.time;
    moveInfo = {
      x,
      y,
      xMoved,
      yMoved,
      xMovePercent,
      yMovePercent,
      xSpeed: xMoved / movedTime,
      ySpeed: yMoved / movedTime,
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

const useSwipe = ({ onStart, onMove, onEnd }, target) => {
  // resize will change dom size
  const [changeTime, setCurrentTime] = useState(new Date());
  const first = useRef(true);
  useWindowResize(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setCurrentTime(new Date());
  });
  useEffect(() => {
    const destroy = init({ onStart, onMove, onEnd }, target);
    return destroy;
  }, [target, changeTime]);
};

export default useSwipe;
