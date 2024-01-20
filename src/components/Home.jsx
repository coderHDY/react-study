// @monaco-editor/react + ajv
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Ajv from "ajv";
import Form from "./Form";
import { useAddToolWindow } from "./ToolsWindow";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const addToolWindow = useAddToolWindow();
  const [count, setCount] = useState(0);
  const onLog = () => {
    setCount((c) => c + 1);
    console.log("Home 组件内定义的log");
  };
  const add2Window = () => {
    const i = <Form />;
    console.log("add");
    addToolWindow(i);
  };
  const nav = useNavigate();
  const toChildTest = () => {
    nav("/childTest");
  };
  return (
    <div>
      <h2>Home</h2>
      <h2>{count}</h2>
      <button onClick={toChildTest}>toChildTest</button>
      <button onClick={add2Window}>add2Window</button>
    </div>
  );
};

export default Home;
