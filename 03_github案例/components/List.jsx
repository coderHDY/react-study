import React from "react"
import ListItem from "./ListItem"
export default function List(props) {
    const { data } = props
    console.log(data)
    const showList = () => data.map(item => <ListItem key={item.id} info={item} />);
    return (
        <div className="infos">
            {showList()}
        </div>
    )
}
