import React, { useState } from "react"

export default function Item(props) {
    const {
        item: { id, job, done },
        deleteJob,
        toggleDone,
    } = props
    let [showBtn, setShowBtn] = useState(false)
    return (
        <div>
            <div onMouseEnter={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
                <input type="checkbox" defaultChecked={done} onChange={() => toggleDone(id)} />
                {job}
                <button onClick={() => deleteJob(id)} style={{ visibility: showBtn ? "" : "hidden" }}>
                    删除
                </button>
            </div>
        </div>
    )
}
