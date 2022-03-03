import React from "react"
import { useState } from "react/cjs/react.development"
// api: 'https://api.github.com/search/users?q=coderhdy'
export default function Search(props) {
    const { searchData } = props
    const [tip, setTip] = useState("")
    const searchTip = () => searchData(tip)
    const inputTip = e => (e.keyCode === 13 ? searchTip() : setTip(e.target.value))
    return (
        <div>
            <input type="text" value={tip} onChange={inputTip} onKeyUp={inputTip} />
            <button onClick={searchTip}>搜索</button>
        </div>
    )
}
