import React from "react";
import Search from "./Search";
import List from "./List";

import { useState } from "react/cjs/react.development";
import PubSub from "pubsub-js";

export default function Github() {
    const { data } = useData();
    const [isLoading, setIsLoading] = useState(false);
    const [isErr, setIsErr] = useState(false);
    const [isFirst, setIsFirst] = useState(true);
    PubSub.subscribe('setIsLoading', (_, state) => setIsLoading(state));
    PubSub.subscribe('setIsErr', (_, state) => setIsErr(state));
    PubSub.subscribe('setIsFirst', (_, state) => setIsFirst(state));

    const showState = () =>
        isFirst ? (<div>你好，欢迎使用github</div>) :
            isErr ? (<div>请求错误，请检查网络*_*</div>) :
                (isLoading ? (<div>加载中，请稍候...</div>) : <List data={data} />)
    return (
        <>
            <Search />
            {showState()}
        </>
    )
}


function useData() {
    const [data, setData] = useState([]);
    const searchData = (_, tip) => {
        PubSub.publish('setIsLoading', true);
        fetch(`/api/search/users?q=${tip}`)
            .then(res => res.json())
            .then(res => {
                PubSub.publish('setIsLoading', false);
                setData(res.items)
            })
            .catch(rea => PubSub.publish('setIsErr', true))
    }
    PubSub.subscribe('searchData', searchData);
    // PubSub.unsubscribe()
    return {
        data
    }
}
