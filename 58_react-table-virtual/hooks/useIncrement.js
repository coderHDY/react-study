import { useState } from "react";

export const useCounter = () => {
  const [count, setCount] = useState(0);
  const getIncrementProps = () => ({
    onClick: () => setCount(+count + 1),
  });
  const getDecrementProps = () => ({
    onClick: () => setCount(+count - 1),
  });
  const getCountProps = () => ({
    type: "number",
    value: count,
    onChange: (e) => setCount(e.target.value),
  });
  return {
    getIncrementProps,
    getDecrementProps,
    getCountProps,
  };
};
