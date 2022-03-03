import React, { useEffect, useState } from "react"

// 函数式写法
// export default function Weather() {
//     const [list, setList] = useState([]);
//     const addList = e => {
//         if (e.keyCode === 13 && e.target.value?.trim() !== '') {
//             const val = e.target.value;
//             setList([val, ...list]);
//             e.target.value = '';
//         }
//     }
//     const len = list.length;
//     return (
//         <div>
//             <input type="text" onKeyUp={addList}/>
//             {list.map((item, idx) => {
//                 return (
//                     <div key={item}>{len - idx} - {item}</div>
//                 )
//             })}
//         </div>
//     )
// }

// 类式写法
import List from "./List"
import Add from "./Add"
import Footer from "./Footer"
import { v4 as uuid } from "uuid"
export default class TodoList extends React.Component {
    state = {
        jobs: [
            {
                id: 1,
                job: "做饭",
                done: false,
            },
        ],
    }
    addJob = job => {
        const item = {
            id: uuid(),
            done: false,
            job,
        }
        this.setState({
            jobs: [item, ...this.state.jobs],
        })
    }
    deleteJob = id => {
        const newJobs = this.state.jobs.filter(item => item.id !== id)
        this.setState({
            jobs: newJobs,
        })
    }
    toggleDone = id => {
        const newJobs = this.state.jobs.map(item => {
            if (item.id === id) {
                item.done = !item.done
            }
            return item
        })
        this.setState({ jobs: newJobs })
    }
    clear = () => this.setState({ jobs: [] })
    render() {
        const {
            state: { jobs },
            deleteJob,
            addJob,
            clear,
            toggleDone,
        } = this
        return (
            <div>
                <Add addJob={addJob} />
                <List jobs={jobs} deleteJob={deleteJob} toggleDone={toggleDone} />
                <Footer clear={clear} jobs={jobs} />
            </div>
        )
    }
}
