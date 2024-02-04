/**
 * 默认传入的横向滚动块同宽
 * 默认传入的纵向滚动块同高
 */
import { useCallback, useRef, useEffect, useState } from "react";

const MAX_WHEEL_SPEED = 200;

export const useSyncScrollController = () => {
  const rowSubscriber = useRef(new Set([]));
  const colSubscriber = useRef(new Set([]));
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 添加横向scroll订阅者
  const addRowSubscriber = (ref) => {
    rowSubscriber.current.add(ref);
  };
  // 添加纵向scroll订阅者
  const addColSubscriber = (ref) => {
    colSubscriber.current.add(ref);
  };

  // wheel滚动事件
  // 性能优化：避免重复刷新注册事件
  const onRowWheel = useCallback((e) => {
    e.preventDefault();
    const { deltaY, deltaX, currentTarget: target } = e;
    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }
    const maxScrollLeft = target.scrollWidth - target.clientWidth;
    const needScrollLeft =
      Math.min(Math.abs(deltaX), MAX_WHEEL_SPEED) * Math.sign(deltaX);
    let newScrollLeft = target.scrollLeft + needScrollLeft;
    // 控制滚动速度
    newScrollLeft =
      newScrollLeft < 0
        ? 0
        : newScrollLeft > maxScrollLeft
        ? maxScrollLeft
        : newScrollLeft;

    // 滚动后会触发scroll事件，所以不需要手动触发
    target.scrollLeft = newScrollLeft;
    setScrollLeft(newScrollLeft);
  }, []);

  const onColWheel = useCallback((e) => {
    e.preventDefault();
    const { deltaY, deltaX, currentTarget: target } = e;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return;
    }
    const maxScrollTop = target.scrollHeight - target.clientHeight;
    const needScrollTop =
      Math.min(Math.abs(deltaY), MAX_WHEEL_SPEED) * Math.sign(deltaY);
    // 控制滚动速度
    let newScrollTop = target.scrollTop + needScrollTop;
    newScrollTop =
      newScrollTop < 0
        ? 0
        : newScrollTop > maxScrollTop
        ? maxScrollTop
        : newScrollTop;
    target.scrollTop = newScrollTop;
    setScrollTop(newScrollTop);
  }, []);

  // scroll滚动事件 / 按钮滚动事件
  const onRowScroll = useCallback((e) => {
    const targetScrollLeft = e.currentTarget.scrollLeft;
    rowSubscriber.current.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.scrollLeft = targetScrollLeft;
    });
    setScrollLeft(e.currentTarget.scrollLeft);
  }, []);
  const onColScroll = useCallback((e) => {
    const targetScrollTop = e.currentTarget.scrollTop;
    colSubscriber.current.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.scrollTop = targetScrollTop;
    });
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // wheel滚动监听
  useEffect(() => {
    rowSubscriber.current.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("wheel", onRowWheel, { passive: false });
    });
    return () => {
      rowSubscriber.current.forEach((ref) => {
        ref.current?.removeEventListener("wheel", onRowWheel, {
          passive: false,
        });
      });
    };
  }, [rowSubscriber.current.size]);
  useEffect(() => {
    colSubscriber.current.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("wheel", onColWheel, { passive: false });
    });
    return () => {
      colSubscriber.current.forEach((ref) => {
        ref.current?.removeEventListener("wheel", onColWheel, {
          passive: false,
        });
      });
    };
  }, [colSubscriber.current.size]);

  // scroll滚动监听
  useEffect(() => {
    rowSubscriber.current.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("scroll", onRowScroll);
    });
    return () => {
      rowSubscriber.current.forEach((ref) => {
        ref.current?.removeEventListener("scroll", onRowScroll);
      });
    };
  }, [rowSubscriber.current.size]);
  useEffect(() => {
    colSubscriber.current.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("scroll", onColScroll);
    });
    return () => {
      colSubscriber.current.forEach((ref) => {
        ref.current?.removeEventListener("scroll", onColScroll);
      });
    };
  }, [colSubscriber.current.size]);
  return {
    addRowSubscriber,
    addColSubscriber,
    scrollTop,
    scrollLeft,
  };
};
