import React, { Component } from "react"

export default class Item extends Component {
    state = {
        showBtn: false,
    }
    toggleBtn = bool => () => {
        this.setState({ showBtn: bool })
    }
    render() {
        const {
            item: { id, job, done },
            deleteJob,
            toggleDone,
        } = this.props
        const {
            state: { showBtn },
            toggleBtn,
        } = this
        return (
            <div>
                <div onMouseEnter={toggleBtn(true)} onMouseLeave={toggleBtn(false)}>
                    <input type="checkbox" defaultChecked={done} onChange={() => toggleDone(id)} />
                    {job}
                    <button onClick={() => deleteJob(id)} style={{ visibility: showBtn ? "" : "hidden" }}>
                        删除
                    </button>
                </div>
            </div>
        )
    }
}
