import React, { Component } from "react"

export default class Footer extends Component {
    render() {
        const {
            props: { jobs, clear },
        } = this
        const doneNum = jobs.reduce((pre, item) => (pre += item.done ? 1 : 0), 0)
        const jobsNum = jobs.length
        return (
            <div>
                总任务：{doneNum}/{jobsNum}
                <button onClick={clear}>清空任务</button>
            </div>
        )
    }
}
