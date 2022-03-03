import React from "react"
import { useState } from "react/cjs/react.development"
import PubSub from "pubsub-js";
// api: 'https://api.github.com/search/users?q=coderhdy'
export default function Search(props) {
    const [tip, setTip] = useState("");
    const searchTip = () => PubSub.publish('searchData', tip);
    const inputTip = e => e.keyCode === 13 ? PubSub.publish('searchData', tip) : setTip(e.target.value);
    return (
        <div>
            <input type="text" value={tip} onChange={inputTip} onKeyUp={inputTip} />
            <button onClick={searchTip}>搜索</button>
        </div>
    )
}
