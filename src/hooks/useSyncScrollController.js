/**
 * 默认传入的横向滚动块同宽
 * 默认传入的纵向滚动块同高
 */
import {
  useCallback,
  useRef,
  useEffect,
  useState,
  RefObject,
  useMemo,
} from "react";

// 性能优化：质数制造滚动视觉差
const MAX_HOR_WHEEL_SPEED = 177;
const MAX_VER_WHEEL_SPEED = 137;

export const useSyncScrollController = () => {
  const [horSubscriber, setHorSubscriber] = useState(new Set([]));
  const [verSubscriber, setVerSubscriber] = useState(new Set([]));
  const [horContainerWidth, setHorContainerWidth] = useState(0);
  const [verContainerHeight, setVerContainerHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  /**
   * 性能优化：防止抖动赋值
   */
  const syncRunning = useRef(false);

  /**
   * 性能优化：防止 wheel 和 scroll 同时赋值
   */
  const wheelScrolling = useRef(false);

  /**
   * ref性能优化：避免重复注册事件（safari卡顿）
   */
  const syncScrollLeft = useRef((left) => {
    if (syncRunning.current) {
      return;
    }
    syncRunning.current = true;
    horSubscriber.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.scrollLeft = left;
    });
    setScrollLeft(left);
    requestAnimationFrame(() => {
      syncRunning.current = false;
    });
  });

  /**
   * ref性能优化：避免重复注册事件（safari卡顿）
   */
  const syncScrollTop = useRef((top) => {
    if (syncRunning.current) {
      return;
    }
    syncRunning.current = true;
    verSubscriber.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.scrollTop = top;
    });
    setScrollTop(top);
    requestAnimationFrame(() => {
      syncRunning.current = false;
    });
  });

  // 添加横向scroll订阅者
  const addHorSubscriber = (ref) => {
    if (horSubscriber.has(ref)) {
      // 已存在就重新同步位置（sideMenu 开关）
      ref.current && (ref.current.scrollLeft = scrollLeft);
    } else {
      horSubscriber.add(ref);
    }
    const newHorSubscriber = new Set(horSubscriber);
    setHorSubscriber(newHorSubscriber);
  };
  // 添加纵向scroll订阅者
  const addVerSubscriber = (ref) => {
    if (verSubscriber.has(ref)) {
      ref.current && (ref.current.scrollTop = scrollTop);
    } else {
      verSubscriber.add(ref);
    }
    const newVerSubscriber = new Set(verSubscriber);
    setVerSubscriber(newVerSubscriber);
  };

  // 监听屏幕变化动态拿宽度
  useEffect(() => {
    if (horSubscriber.size === 0) {
      return;
    }
    const element = [...horSubscriber][0].current;
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const width = [...horSubscriber].reduce(
        (acc, ref) =>
          ref.current ? Math.max(acc, ref.current.clientWidth) : acc,
        0
      );
      setHorContainerWidth(width);
    });
    resizeObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
    };
  }, [horSubscriber]);

  // 监听屏幕变化动态拿高度
  useEffect(() => {
    if (verSubscriber.size === 0) {
      return;
    }
    const element = [...verSubscriber][0].current;
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      const height = [...verSubscriber].reduce(
        (acc, ref) =>
          ref.current ? Math.max(acc, ref.current.clientHeight) : acc,
        0
      );
      setVerContainerHeight(height);
    });
    resizeObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
    };
  }, [verSubscriber]);

  // wheel滚动事件
  const onHorWheel = useCallback((e) => {
    e.preventDefault();
    if (syncRunning.current) {
      return;
    }

    const { deltaY, deltaX, currentTarget: target } = e;
    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      // 纵向滚动，退出
      return;
    }
    const { scrollWidth, clientWidth, scrollLeft } = target;
    const maxScrollLeft = scrollWidth - clientWidth;
    // 控制滚动速度
    const needScrollLeft =
      Math.min(Math.abs(deltaX), MAX_HOR_WHEEL_SPEED) * Math.sign(deltaX);
    let newScrollLeft = scrollLeft + needScrollLeft;
    newScrollLeft =
      newScrollLeft < 0
        ? 0
        : newScrollLeft > maxScrollLeft
        ? maxScrollLeft
        : newScrollLeft;

    wheelScrolling.current = true;
    syncScrollLeft.current(newScrollLeft);
    requestAnimationFrame(() => {
      wheelScrolling.current = false;
    });
  }, []);

  const onVerWheel = useCallback((e) => {
    e.preventDefault();
    if (syncRunning.current) {
      return;
    }

    const { deltaY, deltaX, currentTarget: target } = e;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 横向滚动，退出
      return;
    }

    const { scrollHeight, clientHeight, scrollTop } = target;
    const maxScrollTop = scrollHeight - clientHeight;
    const needScrollTop =
      Math.min(Math.abs(deltaY), MAX_VER_WHEEL_SPEED) * Math.sign(deltaY);
    // 控制滚动速度
    let newScrollTop = scrollTop + needScrollTop;
    newScrollTop =
      newScrollTop < 0
        ? 0
        : newScrollTop > maxScrollTop
        ? maxScrollTop
        : newScrollTop;

    wheelScrolling.current = true;
    syncScrollTop.current(newScrollTop);
    requestAnimationFrame(() => {
      wheelScrolling.current = false;
    });
  }, []);

  // scroll滚动事件 / 按钮滚动事件
  const onHorScroll = useCallback((e) => {
    // 避免和滚轮事件重复赋值
    if (wheelScrolling.current) {
      return;
    }
    const targetScrollLeft = e.currentTarget.scrollLeft;
    syncScrollLeft.current(targetScrollLeft);
  }, []);

  const onVerScroll = useCallback((e) => {
    // 避免和滚轮事件重复赋值
    if (wheelScrolling.current) {
      return;
    }
    const targetScrollTop = e.currentTarget.scrollTop;
    syncScrollTop.current(targetScrollTop);
  }, []);

  // wheel滚动监听
  useEffect(() => {
    horSubscriber.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("wheel", onHorWheel, { passive: false });
    });
    return () => {
      horSubscriber.forEach((ref) => {
        ref.current?.removeEventListener("wheel", onHorWheel);
      });
    };
  }, [horSubscriber, onHorWheel]);
  useEffect(() => {
    verSubscriber.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("wheel", onVerWheel, { passive: false });
    });
    return () => {
      verSubscriber.forEach((ref) => {
        ref.current?.removeEventListener("wheel", onVerWheel);
      });
    };
  }, [verSubscriber, onVerWheel]);

  /**
   *  scroll滚动监听，两个 useEffect 顺序不能变
   * 触发一方的scroll事件，防抖优化会阻止另一方的滚动事件
   * 纵向有拖动滚动条功能，所以可以主动触发scroll事件，横向没有，所以优先监听纵向
   **/
  useEffect(() => {
    verSubscriber.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("scroll", onVerScroll);
    });
    return () => {
      verSubscriber.forEach((ref) => {
        ref.current?.removeEventListener("scroll", onVerScroll);
      });
    };
  }, [verSubscriber, onVerScroll]);
  useEffect(() => {
    horSubscriber.forEach((ref) => {
      if (!ref.current) {
        return;
      }
      ref.current.addEventListener("scroll", onHorScroll);
    });
    return () => {
      horSubscriber.forEach((ref) => {
        ref.current?.removeEventListener("scroll", onHorScroll);
      });
    };
  }, [horSubscriber, onHorScroll]);
  return {
    addHorSubscriber,
    addVerSubscriber,
    syncScrollLeft: syncScrollLeft.current,
    horContainerWidth,
    verContainerHeight,
    scrollTop,
    scrollLeft,
  };
};
