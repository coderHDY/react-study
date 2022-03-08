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
                <NavLink className={computedClassName} to="/about?id=001&name=张三">About</NavLink>
            </div>
            {elements}
        </>
    )
}

const C1 = () => (<div>c1</div>)
const C2 = () => (<div>c2</div>)
