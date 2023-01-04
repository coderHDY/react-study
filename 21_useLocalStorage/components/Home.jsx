import React, { useEffect, useRef } from 'react';
import useLocalStorage from '../utils/useLocalStorage';

export default function Home() {
    const videoRef = useRef();
    const [time, { setData: setTime }] = useLocalStorage("time")
    // 取
    const initTime = () => {
        const t = +time;
        videoRef.current.currentTime = t ?? 0;
    }
    // 存
    useEffect(() => {
        let time = 0;
        const interval = setInterval(() => {
            const t = videoRef.current?.currentTime;
            if (t) time = t;
        }, 500);
        return () => {
            setTime(time);
            clearInterval(interval);
        }
    }, [setTime]);
    return (
        <>
            <video src="/v1.mp4" controls ref={videoRef} onLoadStart={initTime} autoPlay></video>
        </>
    )
}
