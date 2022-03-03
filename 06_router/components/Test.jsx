import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Nav from './Nav';
import router from '../config/router';
export default function Test() {
    return (
        <>
            <Nav></Nav>
            <Routes>
                {
                    router.map(routeObj => <Route key={routeObj.path} {...routeObj} />)
                }
            </Routes>
            <div>
                <Link to="/home">home</Link>
                <Link to="/about">about</Link>
            </div>
        </>
    )
}
