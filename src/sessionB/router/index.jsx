import React from 'react'
import SessionBHome from '../components/Home'
import SessionBAbout from '../components/About'
import { Route } from 'react-router-dom';
import KeepAlive from 'react-activation';

const matchSessionB = () => window.location.pathname.startsWith("/sessionB");

const SessionB = (
    <Route path="/sessionB">
        <Route path="" element={<KeepAlive when={matchSessionB} cacheKey="SessionBHome" ><SessionBHome /></KeepAlive>}></Route>
        <Route path="about" element={<SessionBAbout />}></Route>
    </Route>
);
export default SessionB;
