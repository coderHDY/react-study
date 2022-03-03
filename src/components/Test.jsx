import React, { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';

export default function Test() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const token = PubSub.subscribe('addOne', () => setCount(n => n + 1));
        return () => PubSub.unsubscribe(token);
    }, []);
    return (
        <>
            <div>count: {count}</div>
            <B />
        </>
    )
}

function B() {
    return (<C />)
}
function C() {
    const addOne = () => PubSub.publish('addOne');
    return (
        <>
            <button onClick={addOne}>+1</button>
        </>
    )
}
