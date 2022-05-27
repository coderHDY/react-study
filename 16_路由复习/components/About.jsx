import React from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
export default function About() {
    console.log(useResolvedPath('http://localhost:3000/about?id=asdf&i=aa')); // boolean
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
    return (
        <>
            <div>About</div>
            <button onClick={goHome}>点我去主页</button>
        </>
    )
}
