import React, { useState, useEffect } from 'react';

function People() {
    const [info, setInfo] = useState({
        name: 'hdy',
        age: 18,
        sex: '男'
    });
    const changeVal = type => e => {
        setInfo({
            ...info,
            [type]: e.target.value
        })
    }
    return (
        <div>
            <div>姓名：<input value={info.name} onChange={changeVal('name')} /></div>
            <div>年龄：<input value={info.age} onChange={changeVal('age')} /></div>
            <div>性别：<input value={info.sex} onChange={changeVal('sex')} /></div>
            <div>姓名：{info.name}</div>
            <div>年龄：{info.age}</div>
            <div>性别：{info.sex}</div>
        </div>
    )
}

export default function App() {
    return (
        <><People /></>
    )
}
