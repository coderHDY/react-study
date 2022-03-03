import React, { Component, lazy, Suspense } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';

export default class App extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
                <div>
                    <NavLink to="/home">home</NavLink>
                    <NavLink to="/about">about</NavLink>
                </div>
            </>
        )
    }
}
