import React from "react"
import Search from "./Search"
import List from "./List"
import { useState } from "react/cjs/react.development"
export default function Github() {
    const {
        data,
        searchData,
        isLoading,
        isFirst,
        isErr,
    } = useGetData();
    const showState = () =>
        isFirst ? (<div>你好，欢迎使用github</div>) :
            isErr ? (<div>请求错误，请检查网络*_*</div>) :
                (isLoading ? (<div>加载中，请稍候...</div>) : <List data={data} />)
    return (
        <>
            <Search searchData={searchData} />
            {showState()}
        </>
    )
}

// https://api.github.com/search/users?q=coderhdy
function useGetData() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    const [isErr, setIsErr] = useState(false);
    const searchData = tip => {
        if (isFirst) {
            setIsFirst(false);
        }
        setIsErr(false);
        setIsLoading(true);
        fetch(`https://api.github.com/search/users?q=${tip}`)
            .then(res => res.json())
            .then(res => {
                setData(res.items)
                setIsLoading(false);
            })
            .catch(rea => setIsErr(true))
    }
    return {
        data,
        searchData,
        isLoading,
        isFirst,
        isErr,
    }
}
