import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
    const computedClassName = ({ isActive }) => isActive ? 'active' : ''
    return (
        <div>
            <NavLink className={computedClassName} end to="/home">Home</NavLink>
            <NavLink className={computedClassName} to="/about">About</NavLink>
        </div>
    )
}
