import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SessionA from "../../sessionA/router";
import SessionB from "../../sessionB/router";
import Home from "../components/Home";
export default function baseRouter() {
    return (
        <Routes>
            {SessionA}
            {SessionB}
            <Route replace path="/" element={<Home />}></Route>
        </Routes>
    )
}
