import React, { useEffect, useState, createContext, useContext } from "react";

const DispatchContext = createContext(() => {});

export const useAddToolWindow = () => useContext(DispatchContext);

export default function ToolsWindowProvider({ children }) {
  const [list, setList] = useState([]);
  const addToolWindow = (v) => {
    setList([...list, v]);
    console.log(list);
  };

  return (
    <DispatchContext.Provider value={addToolWindow}>
      {children}
      <h2>ToolsWindow</h2>
      {list.map((Item, i) => Item)}
    </DispatchContext.Provider>
  );
}
