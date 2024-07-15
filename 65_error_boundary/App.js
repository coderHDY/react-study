import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routerMap from "./router";
import ErrorBoundary from "./components/ErrorBoundary";

import { CountProvider } from "./hooks/useCountProvider";

function App() {
  const elements = useRoutes(routerMap);
  useEffect(() => {
    const onerror = function (message, source, lineno, colno, error) {
      console.log("捕获到异常：", { message, source, lineno, colno, error });
    };
    window.addEventListener("error", onerror);
    return () => {
      window.removeEventListener("error", onerror);
    };
  }, []);
  return (
    <ErrorBoundary>
      <CountProvider> {elements} </CountProvider>
    </ErrorBoundary>
  );
}

export default App;
