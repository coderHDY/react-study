import React, { memo, useCallback, useState, useMemo } from "react";

const Home = () => {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [sum, setSum] = useState(1);
  const add = useCallback((i) => setSum((c) => c + i), []);

  const arrJsx = useMemo(
    () =>
      arr.map((i) => (
        <Child key={i} onClick={() => add(i)}>
          {i}
        </Child>
      )),
    [add, arr]
  );
  return (
    <div>
      <button onClick={() => setArr((c) => [...c, c.length + 1])}>
        add length
      </button>
      <div>{sum}</div>
      {arrJsx}
    </div>
  );
};

const Child = ({ onClick, children }) => {
  console.log("refresh");
  return <button onClick={onClick}>{children}</button>;
};

export default Home;
