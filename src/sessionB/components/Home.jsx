import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom"
export default function SessionBHome() {
    useEffect(() => {
        console.log("B 的 Home组件mount")
        return () => {
            console.log("B 的 Home组件卸载")
        };
    }, []);
    return (
        <>
            <div>SessionBHome</div>
            <NavLink to={"about"}>去我的about</NavLink>
        </>
    )
}
