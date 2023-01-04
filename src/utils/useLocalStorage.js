import { useState, useEffect, useCallback } from "react";


/* 修改原生 setStorage */
(() => {
    const oritinItem = localStorage.setItem;
    window.localStorage.setItem = (key, val) => {

        // customEvent默认不冒泡
        const setItemEvent = new CustomEvent("setLocalStorage", { detail: { key, val }, bubbles: true });
        dispatchEvent(setItemEvent);
        oritinItem.call(window.localStorage, key, val)
    }
})();

const setLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}
const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}
const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
}
const useLocalStorage = (k, defaultVal = getLocalStorage(k)) => {
    const [val, setVal] = useState(defaultVal);
    const removeData = useCallback(() => removeLocalStorage(k), [k]);
    const setData = useCallback((val) => setLocalStorage(k, val), [k]);

    // 初始化
    useEffect(() => {
        if (defaultVal !== val) {
            setVal(defaultVal);
        }
    }, [setVal, defaultVal, val])

    // 改变
    const listener = useCallback(e => {
        const { key, val } = e.detail;
        if (k === key) {
            setVal(val);
        }
        return true;
    }, [k, setVal]);

    useEffect(() => {
        window.addEventListener("setLocalStorage", listener);
        return () => window.removeEventListener("setLocalStorage", listener);
    }, [listener]);

    return [
        val,
        {
            setData,
            removeData,
        }
    ];
}

export default useLocalStorage;
