import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import routerMap from "./router";

import { CountProvider } from "./hooks/useCountProvider";
import versionChecker from "utils/watchVersion";

function App() {
  const elements = useRoutes(routerMap);
  const updatedCb = () => console.log("------  updated ------");
  useEffect(() => {
    versionChecker.addCallBack(updatedCb);
    versionChecker.checkVersion();
  }, []);
  return (
    <div>
      <CountProvider> {elements} </CountProvider>{" "}
    </div>
  );
}

export default App;
