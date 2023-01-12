import React from 'react';
import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <>
            <div>Home</div>
            <NavLink to="/sessionA" >去sessionA</NavLink>
            <hr />
            <NavLink to="/sessionB" >去sessionB</NavLink>
        </>
    )
}
