import React from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'querystring';
export default function About() {
    const search = useLocation().search;
    const { id, name } = qs.parse(search.slice(1));
    return (
        <>
            <div>About</div>
            <div>姓名：{name}</div>
            <div>id：{id}</div>
        </>
    )
}
