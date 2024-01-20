import { useContext, createContext, useReducer } from "react";

const initCount = 0;

const countReducer = (state, { type, num }) => {
  const newCount = (() => {
    switch (type) {
      case "add": {
        return state + num;
      }
      default: {
        return state;
      }
    }
  })();
  return newCount;
};

const ConditionContext = createContext(initCount);
const DispatchContext = createContext(() => {});

// 要调用某个共享状态的时候使用
const useCount = () => useContext(ConditionContext);
const useCountDispatch = () => useContext(DispatchContext);

// 提供reducer给所有子组件
const CountProvider = ({ children }) => {
  const [count, countDispatch] = useReducer(countReducer, initCount);
  return (
    <ConditionContext.Provider value={count}>
      <DispatchContext.Provider value={countDispatch}>
        {children}
      </DispatchContext.Provider>
    </ConditionContext.Provider>
  );
};
export { useCount, useCountDispatch, CountProvider };
