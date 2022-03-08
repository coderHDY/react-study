import React from 'react'

export default function About(props) {
    const goTest = (id, name) => () => props.history.replace("/test/c2", { name, id })
    return (
        <>
            <div>About</div>
            <button onClick={goTest(999, '张三')}>去test</button>
        </>
    )
}
