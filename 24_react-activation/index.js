import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
    BrowserRouter,
    // HashRouter
} from 'react-router-dom';
import './css/index.css'
import { AliveScope } from 'react-activation'

ReactDOM.render(
    <BrowserRouter>
        <AliveScope>
            <App />
        </AliveScope>
    </BrowserRouter>
    , document.getElementById('root'));
