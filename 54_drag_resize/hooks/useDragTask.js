import { useRef, useState, useCallback } from "react";

const DAY_WIDTH = 30;

const useDragTask = () => {
  const dragItem = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startMouseX = useRef(0);
  const startLeft = useRef(0);
  const movedDays = useRef(0);

  // 性能优化，防止频繁触发rerender
  const rerendering = useRef(false);

  const getCurrentPosition = (mouseX) => {
    if (!dragItem.current) return 0;
    const parentNode = dragItem.current.parentNode;
    const scrollLeft = parentNode?.scrollLeft ?? 0;
    const { left } = parentNode.getBoundingClientRect();
    return mouseX - left + scrollLeft;
  };
  const changeTaskPosition = useCallback(
    (movedPosition) => {
      const days = Math.round(movedPosition / DAY_WIDTH);
      console.log(movedDays.current, days);
      if (!dragItem.current || movedDays.current === days) return;
      const targetLeft = startLeft.current + days * DAY_WIDTH;
      console.log(targetLeft);
      dragItem.current.style.left = `${targetLeft}px`;
      requestAnimationFrame(() => {
        movedDays.current = days;
      });
    },
    [DAY_WIDTH]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) {
        setIsDragging(true);
      }
      if (rerendering.current) return;
      rerendering.current = true;
      const currentPosition = getCurrentPosition(e.clientX);
      const movedPosition = currentPosition - startMouseX.current;
      changeTaskPosition(movedPosition);
      requestAnimationFrame(() => {
        rerendering.current = false;
      });
    },
    [changeTaskPosition, isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    if (movedDays.current !== 0) {
      dispatchMoveTask();
    }
    dragItem.current = null;
    startMouseX.current = 0;
    movedDays.current = 0;
    removeDOMSelect();
  }, []);
  const dispatchMoveTask = () => {
    console.log("Task", movedDays.current);
  };

  const onMouseDown = useCallback((e) => {
    dragItem.current = e.currentTarget;
    startLeft.current = dragItem.current.offsetLeft;
    startMouseX.current = getCurrentPosition(e.clientX);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  return {
    onMouseDown,
    isDragging,
  };
};

const removeDOMSelect = () => {
  const input = document.createElement("input");
  input.style.position = "absolute";
  input.style.top = "-9999px";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.focus();
  input.select();
  document.body.removeChild(input);
};
export default useDragTask;
