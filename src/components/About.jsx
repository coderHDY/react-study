import React, { useState, useEffect } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import useLocalStorage from '../utils/useLocalStorage';

export default function About() {
    // console.log(useResolvedPath('http://localhost:3000/about?id=asdf&i=aa')); // boolean
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/home',
            {
                replace: false,
                state: {
                    id: 1,
                    name: '李四'
                }
            }
        )
    }
    const [val] = useLocalStorage("time");
    const time = val ? +val : 0;

    /*  */
    const [num, setNum] = useState(0);
    useEffect(() => {
        window.addEventListener("doing", () => {
            setNum(c => c + 1);
        })
    }, []);
    const dispatch = () => {
        const e = new CustomEvent("doing", { detail: { user: "hdy" } });
        dispatchEvent(e);
    }
    return (
        <>
            <div>About</div>
            <div>{`${parseInt(time / 60)}: ${parseInt(time % 60)}`}</div>
            <div>{time}</div>
            <button onClick={goHome}>点我去主页</button>
            <Child />
            <div>{num}</div>
            <button onClick={dispatch}>点我发射自定义事件</button>
        </>
    )
}

const Child = () => {
    const [time] = useLocalStorage("time");

    /*  */
    const [num, setNum] = useState(0);
    useEffect(() => {
        window.addEventListener("doing", () => setNum(c => c + 1));
    }, [])
    return <div>children: {num}</div>
}
