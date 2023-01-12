import React from 'react'
import { Route } from 'react-router-dom';
import SessionAHome from '../components/Home'
import SessionAAbout from '../components/About'

const SessionA = (
    <Route path="/SessionA">
        <Route path="about" element={<SessionAAbout />}></Route>
        <Route path="" element={<SessionAHome />}></Route>
    </Route>
);
export default SessionA
