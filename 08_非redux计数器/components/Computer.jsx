import React, { useState, useEffect } from 'react';

export default function Test() {
    const {
        count,
        oddAdd,
        addSync,
    } = useCount();
    const {
        n,
        nChange,
    } = useAdder();
    return (
        <>
            <div>{count}</div>
            <select value={n} onChange={nChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <button onClick={() => oddAdd(n)}>increment if odd</button>
            <button onClick={() => addSync(n)}>increment async</button>
        </>
    )
}

function useCount() {
    const [count, setCount] = useState(1);
    const add = (n) => setCount(c => c + n);
    const oddAdd = (n) => setCount(c => c % 2 === 0 ? c : c + n)
    const addSync = (n) => setTimeout(() => add(n), 1000)
    return {
        count,
        oddAdd,
        addSync,
    }
}

function useAdder() {
    const [n, setN] = useState(1);
    const nChange = e => { setN(+e.target.value) };
    return {
        n,
        nChange,
    }
}
