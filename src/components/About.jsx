import React from 'react';
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
    const [time] = useLocalStorage("time");
    return (
        <>
            <div>About</div>
            <div>{`${parseInt(time / 60)}: ${parseInt(time % 60)}`}</div>
            <div>{time}</div>
            <button onClick={goHome}>点我去主页</button>
        </>
    )
}
