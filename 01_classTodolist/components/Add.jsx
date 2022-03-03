import React, { Component } from "react"

export default class Add extends Component {
    enter = e => {
        if (e.keyCode === 13 && e.target.value?.trim() !== "") {
            const val = e.target.value
            const { addJob } = this.props
            addJob(val)
            e.target.value = ""
        }
    }
    render() {
        const { enter } = this
        return (
            <div>
                <input type="text" onKeyUp={enter} />
            </div>
        )
    }
}
