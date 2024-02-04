import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routerMap from "./router";

import { CountProvider } from "./hooks/useCountProvider";

function App() {
  const elements = useRoutes(routerMap);
  return (
    <div>
      <CountProvider> {elements} </CountProvider>
    </div>
  );
}

export default App;
