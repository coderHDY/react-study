import { useRef, useState, useCallback } from "react";

const useDragArrow = ({ containerRef }) => {
  const [isDragging, setIsDragging] = useState(false);

  //
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 200, y: 100 });

  // 性能优化，防止频繁触发rerender
  const rerendering = useRef(false);

  // 拿到相对于父盒子的 mouseX
  const getCurrentPosition = useCallback(
    (e) => {
      if (!containerRef.current) return 0;
      const scrollLeft = containerRef.current?.scrollLeft ?? 0;
      const scrollTop = containerRef.current?.scrollTop ?? 0;
      const { left, top } = containerRef.current.getBoundingClientRect();
      // 判断是否需要滚动
      return {
        x: e.clientX - left + scrollLeft,
        y: e.clientY - top + scrollTop,
      };
    },
    [containerRef]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) {
        setIsDragging(true);
      }
      if (rerendering.current) return;
      rerendering.current = true;
      const end = getCurrentPosition(e);
      setEnd(end);
      requestAnimationFrame(() => {
        rerendering.current = false;
      });
    },
    [getCurrentPosition, isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    setStart(null);
    setEnd(null);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    removeDOMSelect();
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e) => {
      const start = getCurrentPosition(e);
      setIsDragging(true);
      setStart(start);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [getCurrentPosition, onMouseMove, onMouseUp]
  );

  return {
    onMouseDown,
    start,
    end,
    isDragging,
  };
};

const removeDOMSelect = () => {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
};
export default useDragArrow;
