import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  memo,
  Fragment,
} from "react";

const DispatchContext = createContext(() => {});
export const useAddToolWindow = () => useContext(DispatchContext);

const WindowIdProvider = createContext("");
export const useWindowId = () => useContext(WindowIdProvider);

export default function ToolsWindowProvider({ children }) {
  const [list, setList] = useState([]);
  const addToolWindow = (v) => {
    const id = Math.random();
    console.log(id);
    const Child = (
      <WindowIdProvider.Provider value={id}>{v}</WindowIdProvider.Provider>
    );
    setList([...list, Child]);
  };

  return (
    <DispatchContext.Provider value={addToolWindow}>
      {children}
      <h2>ToolsWindow</h2>
      {list.map((Item, i) => (
        <Fragment key={i}>{Item}</Fragment>
      ))}
    </DispatchContext.Provider>
  );
}
