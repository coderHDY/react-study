import React, { useEffect } from "react";

const onTouchStart = (e) => console.log("start", e);
const onTouchMove = (e) => console.log("move", e);
const onTouchEnd = (e) => console.log("end", e);
const onTouchCancel = (e) => console.log("cancel", e);
const init = () => {
  window.addEventListener("touchstart", onTouchStart);
  window.addEventListener("touchmove", onTouchMove);
  window.addEventListener("touchend", onTouchEnd);
  window.addEventListener("touchcancel", onTouchCancel);
};
const destroy = () => {
  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);
  window.removeEventListener("touchcancel", onTouchCancel);
};

const useSwipe = () => {
  useEffect(() => {
    init();
    return destroy;
  }, []);
};

export default useSwipe;
