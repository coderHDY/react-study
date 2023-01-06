import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom';
import useLocalStorage from "./utils/useLocalStorage";
import routerMap from './router'
export default function App() {
    const computedClassName = ({ isActive }) => isActive ? 'haha' : ''
    const elements = useRoutes(routerMap);
    const [val, { remove: clearTime }] = useLocalStorage("time");
    const time = val ? +val : 0;
    return (
        <>
            <div>播放时间：{`${parseInt(time / 60)}: ${parseInt(time % 60)}`}</div>
            <div>app：{val}</div>
            <div>
                <NavLink className={computedClassName} end to="/home">Home</NavLink>
                <NavLink className={computedClassName} to="/about" state={{ name: '溜溜', id: 3 }}>About</NavLink>
            </div>
            {elements}
            <button onClick={clearTime}>remove</button>
        </>
    )
}

