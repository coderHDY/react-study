import React from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import Test from './components/Test'
import About from './components/About'
import Err from './components/Err'
import Header from './components/Header'
export default function app() {
    return (
        <div>
            <Header withRouter></Header>
            <div>
                <NavLink to="/about/444">关于页面</NavLink>
                <NavLink to="/test/a/b">测试页面</NavLink>
            </div>
            <Switch>
                <Route path="/about/:id" component={About}></Route>
                <Route path="/test" component={Test}></Route>
                <Route path="/err" component={Err}></Route>
                <Redirect to='/err' />
            </Switch>
        </div>
    )
}
