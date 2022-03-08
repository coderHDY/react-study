import React, { Component } from 'react'

export default class Err extends Component {
    componentDidMount() {
        console.log(this.props.history)
    }
    render() {
        return (
            <div>Err</div>
        )
    }
}
