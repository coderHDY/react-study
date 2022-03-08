import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyNavLink(props) {
    const { children } = props;
    return (
        <NavLink activeClassName='haha' className="nav-class" {...props}>{children}</NavLink>
    )
}
