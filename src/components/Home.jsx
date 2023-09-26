import React, { memo, useCallback, useState } from "react";

const Home = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [sum, setSum] = useState(1);
  const add = useCallback((i) => setSum((c) => c + i), []);
  return (
    <div>
      <div>{sum}</div>
      {arr.map((i) => (
        <Child key={i} onClick={() => add(i)}>
          {i}
        </Child>
      ))}
    </div>
  );
};

const arePropsEqual = (oldProps, newProps) => {
  return oldProps.children === newProps.children;
};
const Child = memo(({ onClick, children }) => {
  console.log("refresh");
  return <button onClick={onClick}>{children}</button>;
});

export default Home;
