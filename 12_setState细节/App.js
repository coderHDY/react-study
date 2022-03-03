import React, { Component } from 'react'

export default class App extends Component {
    state = {
        count: 0
    }
    add = () => {
        setTimeout(() => {
            this.setState(
                state => ({ count: state.count + 1 })
            ); // 1 2 3
            console.log(this.state.count)
        })
    }
    addThree = () => {
        this.add();
        this.add();
        this.add();
    }
    render() {
        const {
            state: { count },
            addThree,
        } = this;
        return (
            <>
                <div>count: {count}</div>
                <button onClick={addThree}>+1</button>
            </>
        )
    }
}
