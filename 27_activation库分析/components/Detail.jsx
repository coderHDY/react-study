import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Detail() {
    const nav = useNavigate();
    const location = useLocation();
    const i = location.state.key;
    const back = () => nav(-1);
    return (
        <>
            <button onClick={back}>返回</button>
            <div>编辑第{i}个元素</div>
        </>
    )
}
