import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChildText = () => {
  const nav = useNavigate();
  const toHome = () => {
    nav("/");
  };
  return (
    <>
      <div>ChildText</div>
      <button onClick={toHome}>toHome</button>
      <A Comp={B} />
    </>
  );
};

const A = ({ Comp }) => {
  const [name] = useState("小黄");
  return (
    <>
      <div>11111</div>
      <Comp name={name} />
    </>
  );
};
const B = ({ name }) => {
  return (
    <>
      <div>22222222</div>
      name: <span>{name}</span>
    </>
  );
};

export default ChildText;
