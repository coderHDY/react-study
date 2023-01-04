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
const useLocalStorage = (k) => {
    const localData = getLocalStorage(k);
    const [val, setVal] = useState(localData);
    const removeData = useCallback(() => removeLocalStorage(k), [k]);
    const setData = useCallback((val) => setLocalStorage(k, val), [k]);

    /**
     * 需不需要以传入的为准还是以既存的为准？
     * 以 localStorage 既存的为准
     */
    // 初始化
    useEffect(() => {
        if (localData !== val) {
            setVal(localData);
        }
    }, [setVal, localData, val]);

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
