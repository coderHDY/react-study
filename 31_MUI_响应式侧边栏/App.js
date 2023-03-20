import React, { useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routerMap from './router'
// import { ThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

function App() {
    const elements = useRoutes(routerMap);
    const [mode, setMode] = useState("dark");
    const [rootSize, setRootSize] = useState(16);
    return (
        // <ThemeProvider theme={theme(rootSize)[mode]}>
        <div>
            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>切换</button>
            <button onClick={() => setRootSize(c => c + 1)}>字体变大</button>
            {elements}
        </div>
        // </ThemeProvider>
    )
}

export default App;
