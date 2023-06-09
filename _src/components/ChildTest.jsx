import React, { useEffect, useMemo, useState, createElement } from "react";

const ChildText = () => {
  const [state, setState] = useState(false);
  const Test = useMemo(() => (state ? <A /> : <B />), [state]);
  console.log(<div>{Test}</div>);

  return (
    <>
      <div>ChildText</div>
      {Test}
      <button onClick={() => setState((c) => !c)}>切换</button>
      {/* 渲染同一 Test */}
      {Test}
    </>
  );
};

const A = ({ Comp }) => {
  useEffect(() => console.log("------ A load ---------"), []);
  return (
    <>
      <div>11111</div>
    </>
  );
};
const B = ({ Comp }) => {
  useEffect(() => console.log("------ B load ---------"), []);
  return (
    <>
      <div>22222</div>
    </>
  );
};

export default ChildText;
