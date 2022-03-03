import React, { Component } from "react"
import Item from "./Item"
export default class List extends Component {
    render() {
        const { jobs, deleteJob, toggleDone } = this.props
        return (
            <div>
                {jobs.map(item => (
                    <Item key={item.id} item={item} deleteJob={deleteJob} toggleDone={toggleDone} />
                ))}
            </div>
        )
    }
}
