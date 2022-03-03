import React, { useState, useEffect } from 'react';

export default function Test() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(count, 'In');
        new Promise(resolve => {
            setTimeout(resolve(), 3000)
        }).then(o => {
            console.log(count, 'Done');
        });
        return () => {
            console.log(count, 'out');
        };
    }, [count]);
    return (
        <>
            <button onClick={() => setCount(c => c + 1)}>+1</button>
        </>
    )
}
