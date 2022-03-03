import React from "react"
import Item from "./Item"
export default function List(props) {
    const { jobs, deleteJob, toggleDone } = props
    return (
        <div>
            {jobs.map(item => (
                <Item key={item.id} item={item} deleteJob={deleteJob} toggleDone={toggleDone} />
            ))}
        </div>
    )
}
