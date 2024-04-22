import { useCallback, useRef, useState } from "react";

const DAY_WIDTH = 30;

const useDragResize = (dragItem) => {
  const [isDragging, setIsDragging] = useState(false);

  const startMouseX = useRef(0);
  const startWidth = useRef(0);
  const startLeft = useRef(0);
  const movedDays = useRef(0);

  // 性能优化，防止频繁触发rerender
  const rerendering = useRef(false);

  // 拿到相对于父盒子的 mouseX
  const getCurrentPosition = useCallback(
    (mouseX) => {
      if (!dragItem.current) return 0;
      const parentNode = dragItem.current.parentNode;
      const scrollLeft = parentNode?.scrollLeft ?? 0;
      const { left } = parentNode.getBoundingClientRect();
      return mouseX - left + scrollLeft;
    },
    [dragItem]
  );

  const changeTaskRight = useCallback(
    (movedPosition) => {
      const days = Math.round(movedPosition / DAY_WIDTH);
      if (!dragItem.current || movedDays.current === days) return;
      let targetWidth = startWidth.current + days * DAY_WIDTH;
      if (targetWidth < DAY_WIDTH) {
        targetWidth = DAY_WIDTH;
      }
      dragItem.current.style.width = `${targetWidth}px`;
      movedDays.current = (targetWidth - startWidth.current) / DAY_WIDTH;
    },
    [dragItem]
  );

  const changeTaskLeft = useCallback(
    (movedPosition) => {
      const days = Math.round(movedPosition / DAY_WIDTH);
      if (!dragItem.current || movedDays.current === days) return;
      let targetWidth = startWidth.current - days * DAY_WIDTH;
      if (targetWidth < DAY_WIDTH) {
        targetWidth = DAY_WIDTH;
      }
      movedDays.current = (targetWidth - startWidth.current) / DAY_WIDTH;
      console.log(movedDays.current);
      const targetLeft = startLeft.current + startWidth.current - targetWidth;

      dragItem.current.style.width = `${targetWidth}px`;
      dragItem.current.style.left = `${targetLeft}px`;
    },
    [dragItem]
  );

  const onRightMouseMove = useCallback(
    (e) => {
      setIsDragging(true);
      if (rerendering.current) return;
      rerendering.current = true;
      const currentPosition = getCurrentPosition(e.clientX);
      const movedPosition = currentPosition - startMouseX.current;
      changeTaskRight(movedPosition);
      requestAnimationFrame(() => {
        rerendering.current = false;
      });
    },
    [changeTaskRight, getCurrentPosition]
  );

  const onRightMouseUp = useCallback(
    (e) => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onRightMouseMove);
      document.removeEventListener("mouseup", onRightMouseUp);
      if (movedDays.current !== 0) {
        console.log("dispatchResizeTaskRight", movedDays.current);
      }

      startMouseX.current = 0;
      startWidth.current = 0;
      startLeft.current = 0;
      movedDays.current = 0;
      removeDOMSelect();
    },
    [onRightMouseMove]
  );

  const onLeftMouseMove = useCallback(
    (e) => {
      setIsDragging(true);
      if (rerendering.current) return;
      rerendering.current = true;
      const currentPosition = getCurrentPosition(e.clientX);
      const movedPosition = currentPosition - startMouseX.current;
      changeTaskLeft(movedPosition);
      requestAnimationFrame(() => {
        rerendering.current = false;
      });
    },
    [changeTaskLeft, getCurrentPosition]
  );

  const onLeftMouseUp = useCallback(
    (e) => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onLeftMouseMove);
      document.removeEventListener("mouseup", onLeftMouseUp);
      if (movedDays.current !== 0) {
        console.log("dispatchResizeTaskLeft", movedDays.current);
      }
      startMouseX.current = 0;
      startWidth.current = 0;
      startLeft.current = 0;
      movedDays.current = 0;
      removeDOMSelect();
    },
    [onLeftMouseMove]
  );

  const onLeftMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      startWidth.current = dragItem.current.clientWidth;
      startLeft.current = dragItem.current.offsetLeft;
      startMouseX.current = getCurrentPosition(e.clientX);
      document.addEventListener("mousemove", onLeftMouseMove);
      document.addEventListener("mouseup", onLeftMouseUp);
    },
    [dragItem, getCurrentPosition, onLeftMouseMove, onLeftMouseUp]
  );
  const onRightMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      startWidth.current = dragItem.current.clientWidth;
      startLeft.current = dragItem.current.offsetLeft;
      startMouseX.current = getCurrentPosition(e.clientX);
      document.addEventListener("mousemove", onRightMouseMove);
      document.addEventListener("mouseup", onRightMouseUp);
    },
    [dragItem, getCurrentPosition, onRightMouseMove, onRightMouseUp]
  );
  return { isDragging, onLeftMouseDown, onRightMouseDown };
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

export default useDragResize;
