import React, {
  memo,
  useCallback,
  useState,
  useMemo,
  startTransition,
} from "react";

const Home = () => {
  const [tab, setTab] = useState(1);
  const changeTab = () => {
    startTransition(() => setTab((c) => (c === 1 ? 2 : 1)));
  };
  // const changeTab = () => {
  //   setTab((c) => (c === 1 ? 2 : 1));
  // };
  return (
    <div>
      <div className="wrapper">
        <div className={`tab ${tab === 1 ? "active" : ""}`}></div>
        <div className={`tab ${tab === 2 ? "active" : ""}`}></div>
      </div>

      <button onClick={changeTab}>change tab</button>
    </div>
  );
};

const Child = ({ onClick, children }) => {
  console.log("refresh");
  return <button onClick={onClick}>{children}</button>;
};

export default Home;
