import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import store from './store';
// import { Provider } from 'react-redux'


const render = () => ReactDOM.render(
    <App />
    , document.getElementById("root"));
render();

store.subscribe(render)
