import { useState, useEffect, useCallback } from "react";

const CHANGE_STORAGE_EVENT = "changeLocalStorage";

/* 修改原生 setStorage */
(() => {
    const oritinSetItem = localStorage.setItem;
    window.localStorage.setItem = (key, val) => {

        // customEvent默认不冒泡
        const setItemEvent = new CustomEvent(CHANGE_STORAGE_EVENT, { detail: { key, val }, bubbles: true });
        dispatchEvent(setItemEvent);
        oritinSetItem.call(window.localStorage, key, val)
    }

    const oritinRemoveItem = localStorage.removeItem;
    window.localStorage.removeItem = (key) => {
        const setItemEvent = new CustomEvent(CHANGE_STORAGE_EVENT, { detail: { key, val: null }, bubbles: true });
        dispatchEvent(setItemEvent);
        oritinRemoveItem.call(window.localStorage, key)
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
const useLocalStorage = (k, defaultVal) => {
    const [val, setVal] = useState(defaultVal);
    const remove = useCallback(() => {
        setVal(null);
        removeLocalStorage(k)
    }, [k]);
    const set = useCallback((val) => setLocalStorage(k, val), [k]);

    // 初始化
    useEffect(() => {
        const localData = getLocalStorage(k);
        if (localData !== defaultVal) {
            setVal(localData);
        }
    }, [k, setVal, defaultVal])

    // 改变
    const listener = useCallback(e => {
        const { key, val } = e.detail;
        if (k === key) {
            setVal(val);
        }
        return true;
    }, [k, setVal]);

    useEffect(() => {
        window.addEventListener(CHANGE_STORAGE_EVENT, listener);
        return () => window.removeEventListener(CHANGE_STORAGE_EVENT, listener);
    }, [listener]);

    return [
        val,
        {
            set,
            remove,
        }
    ];
}

export default useLocalStorage;
