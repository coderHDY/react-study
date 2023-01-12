import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import {
    BrowserRouter,
    // HashRouter
} from 'react-router-dom';
import { AliveScope } from 'react-activation'


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <AliveScope>
            <App />
        </AliveScope>
    </BrowserRouter>
);
