import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routerMap from "./router";
import ToolsWindowProvider from "./components/ToolsWindow";

import { CountProvider } from "./hooks/useCountProvider";

function App() {
  const elements = useRoutes(routerMap);
  return (
    <div>
      <ToolsWindowProvider>
        <CountProvider> {elements} </CountProvider>
      </ToolsWindowProvider>
    </div>
  );
}

export default App;
