export default function Add(props) {
    const enter = e => {
        if (e.keyCode === 13 && e.target.value?.trim() !== "") {
            const val = e.target.value
            const { addJob } = props
            addJob(val)
            e.target.value = ""
        }
    }
    return (
        <div>
            <input type="text" onKeyUp={enter} />
        </div>
    )
}
