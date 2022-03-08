import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function Home() {
    const computedClassName = ({ isActive }) => isActive ? 'haha' : ''
    return (
        <>
            <div>
                <NavLink to="c1" className={computedClassName}>子链1</NavLink>
                <NavLink to="c2" className={computedClassName}>子链2</NavLink>
            </div>
            <Outlet />
        </>
    )
}

export const C1 = () => (<div>c1</div>)
export const C2 = () => (<div>c2</div>)
