import React from 'react'
// import qs from 'querystring-es3';
import qs from 'querystring'
import { Link, Route, Switch, Redirect } from 'react-router-dom'

export default function Test(props) {
    const c1 = {
        id: 111,
        name: '张三'
    }
    const c2 = {
        id: 222,
        name: '李四'
    }
    console.log(props);
    const goAbout = (id) => () => props.history.push(`/about/${id}`)
    return (
        <>
            <div>
                <Link to={{ pathname: "/test/c1", state: { name: c1.name, id: c1.id } }}>C1</Link>
                <Link to={{ pathname: "/test/c2", state: { name: c2.name, id: c2.id } }}>C2</Link>
                <button onClick={goAbout(12345)}>去about</button>
            </div>
            <Switch>
                <Route path="/test/c1" component={C1}></Route>
                <Route path="/test/c2" component={C2}></Route>
            </Switch>
        </>
    )
}

const C1 = ({ location }) => (<div>C1:{location.state.id}-{location.state.name}</div>)
const C2 = ({ location }) => (<div>C2:{location.state.id}-{location.state.name}</div>)
