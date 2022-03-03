import React, { useEffect, useState } from "react"

// 函数式写法

// 类式写法
import List from "./List"
import Add from "./Add"
import Footer from "./Footer"
import { v4 as uuid } from "uuid"
export default function TodoList() {
    const { jobs, addJob, deleteJob, toggleDone, clear } = useJobs()
    return (
        <div>
            <Add addJob={addJob} />
            <List jobs={jobs} deleteJob={deleteJob} toggleDone={toggleDone} />
            <Footer clear={clear} jobs={jobs} />
        </div>
    )
}

function useJobs() {
    const [jobs, setJobs] = useState([])
    const addJob = job => {
        const item = {
            id: uuid(),
            done: false,
            job,
        }
        setJobs([item, ...jobs])
    }
    const deleteJob = id => {
        const newJobs = jobs.filter(item => item.id !== id)
        setJobs(newJobs)
    }
    const toggleDone = id => {
        const newJobs = jobs.map(item => {
            if (item.id === id) {
                item.done = !item.done
            }
            return item
        })
        setJobs(newJobs)
    }
    const clear = () => setJobs([])
    return {
        jobs,
        addJob,
        deleteJob,
        toggleDone,
        clear,
    }
}

// 类式写法
// import List from './List';
// import Add from './Add';
// import Footer from './Footer';
// import {v4 as uuid} from 'uuid';
// export default class TodoList extends React.Component {
//     state = {
//         jobs: [
//             {
//                 id: 1,
//                 job: '做饭',
//                 done: false,
//             }
//         ]
//     }
//     addJob = (job) => {
//         const item = {
//             id: uuid(),
//             done: false,
//             job
//         }
//         this.setState({
//             jobs: [item, ...this.state.jobs],
//         })
//     }
//     deleteJob = (id) => {
//         const newJobs = this.state.jobs.filter(item => item.id !== id);
//         this.setState({
//             jobs: newJobs
//         })
//     }
//     toggleDone = (id) => {
//         const newJobs = this.state.jobs.map(item => {
//             if (item.id === id) {
//                 item.done = !item.done;
//             }
//             return item;
//         })
//         this.setState({ jobs: newJobs });
//     }
//     clear = () => this.setState({jobs: []});
//     render() {
//         const { state: { jobs }, deleteJob, addJob, clear, toggleDone } = this;
//         return (
//             <div>
//                 <Add addJob={addJob} />
//                 <List jobs={jobs} deleteJob={deleteJob} toggleDone={toggleDone}/>
//                 <Footer clear={clear} jobs={jobs}/>
//             </div>
//         )
//     }
// }
