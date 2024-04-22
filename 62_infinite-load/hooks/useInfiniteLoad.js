import { useCallback, useEffect, useState } from "react";

export const useInfiniteLoad = ({
  scrollRef,
  onLoad,
  getHasMore,
  triggerDistance = 100,
}) => {
  const [loading, setLoading] = useState(false);

  const handleScroll = useCallback(async () => {
    if (loading ||!getHasMore()) return;
    const { scrollHeight, scrollTop, clientHeight } = scrollRef.current ?? {};
    if (scrollTop + clientHeight >= scrollHeight - triggerDistance) {
      setLoading(true);
      await onLoad();
      setLoading(false);
    }
  }, [getHasMore, loading, onLoad, triggerDistance, scrollRef]);

  const checkOverflow = useCallback(() => {
    const { scrollHeight, clientHeight } = scrollRef.current ?? {};
    return scrollHeight > clientHeight;
  }, [scrollRef]);

  const firstLoad = useCallback(async () => {
    if (!checkOverflow()) {
      setLoading(true);
      await onLoad();
      requestAnimationFrame(() => {
        firstLoad();
      });
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void firstLoad();
  }, [firstLoad]);

  useEffect(() => {
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [firstLoad, handleScroll, scrollRef]);

  return { loading };
};
