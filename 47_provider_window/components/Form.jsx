import React from "react";
import { useWindowId } from "./ToolsWindow";

export default function Form({ onLog }) {
  const windowId = useWindowId();
  console.log(windowId);
  console.log("render");
  return <div onClick={onLog}>Form</div>;
}
