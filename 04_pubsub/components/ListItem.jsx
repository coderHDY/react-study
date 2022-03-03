import React from "react"
import "./css/item.css"

export default function ListItem(props) {
    const { info: {
        login,
        avatar_url,
        html_url,
    } } = props
    return (
        <a className="info-box" href={html_url} target="_blank" rel="noreferrer">
            <div className="avator">
                <img src={avatar_url} alt={login} />
            </div>
            <div className="name">{login}</div>
        </a>
    )
}
