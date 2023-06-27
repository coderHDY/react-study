import React, { useState } from "react";

const ChildText = () => {
  return (
    <>
      <div>ChildText</div>
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
