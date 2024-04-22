import React, { useRef, useState } from "react";
import { useInfiniteLoad } from "../hooks/useInfiniteLoad";

const Home = () => {
  const [data, setData] = useState(
    Array(10)
      .fill(0)
      .map((_, i) => i)
  );
  const loadMore = async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        setData((prev) => [
          ...prev,
          ...Array(10)
            .fill(0)
            .map((_, i) => i + prev.length),
        ]);
        resolve();
      }, 200)
    );
  };
  const getHasMore = () => data.length < 100;
  const scrollRef = useRef(null);
  const { loading } = useInfiniteLoad({
    scrollRef,
    onLoad: loadMore,
    getHasMore,
  });

  console.log("loading", loading);

  return (
    <div style={{ height: "1000px", overflow: "auto" }} ref={scrollRef}>
      <div>触底加载</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              style={{ height: "50px", border: "1px solid #000" }}
            >
              {item}
            </div>
          );
        })}
      </div>
      {loading && <div>loading...</div>}
    </div>
  );
};
export default Home;
