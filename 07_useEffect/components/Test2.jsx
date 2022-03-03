import React, { useState, useEffect } from 'react'

export default function Test2() {
    const [count, setCount] = useState(0);
    const addOne = () => setCount(p => p + 1);
    const reset = () => setCount(0);
    useEffect(() => {
        console.log('mount');
    }, []);
    useEffect(() => {
        console.log('update');
    }, [count]);
    useEffect(() => () => {
        console.log('unMount');
    }, []);

    return (
        <div>
            <div>a:{count}</div>
            <button onClick={addOne}>+1</button>
            <button onClick={reset}>reset</button>
        </div>
    )
}
