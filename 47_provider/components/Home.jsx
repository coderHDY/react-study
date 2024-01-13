// @monaco-editor/react + ajv
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Ajv from "ajv";
import Form from "./Form";
import { useAddToolWindow } from "./ToolsWindow";
import { useNavigate } from "react-router-dom";

const JsonEditor = () => {
  const addToolWindow = useAddToolWindow();
  const add2Window = () => {
    console.log("add");
    addToolWindow(<Form key={Math.random()} />);
  };
  const nav = useNavigate();
  const toChildTest = () => {
    nav("/childTest");
  };
  return (
    <div>
      <h2>Home</h2>
      <button onClick={toChildTest}>toChildTest</button>
      <button onClick={add2Window}>add2Window</button>
    </div>
  );
};

export default JsonEditor;
