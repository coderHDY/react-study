import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChildText = () => {
  useEffect(() => {
    console.log("------------ enter ----------------")
  }, []);


  const location = useLocation();
  const nav = useNavigate();
  // const [val, setVal] = useState(location.state?.threadId);
  const changeVal = (v) => {
    // setVal(v);
    // location.state.threadId = v;
    nav(location.pathname, { replace: true, state: { threadId: v } });
  };
  console.log(location);
  return (
    <>
      <div>ChildText</div>
      <input
        type="text"
        value={location.state?.threadId}
        onChange={(e) => changeVal(e.target.value)}
      />
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
