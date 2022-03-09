import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import Header from './components/Header'
import routerMap from './router'
export default function App() {
    const computedClassName = ({ isActive }) => isActive ? 'haha' : ''
    const elements = useRoutes(routerMap)
    return (
        <>
            <Header withRouter></Header>
            <div>
                <NavLink className={computedClassName} end to="/home">Home</NavLink>
                <NavLink className={computedClassName} to="/about" state={{ name: '溜溜', id: 3 }}>About</NavLink>
            </div>
            {elements}
        </>
    )
}

