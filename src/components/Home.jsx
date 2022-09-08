import React, { useEffect, useRef } from 'react';
export default function Home() {
    const videoRef = useRef();
    // 取
    useEffect(() => {
        videoRef.current.addEventListener("loadstart", () => {

            // localStorage模拟网络请求数据
            const t = +localStorage.getItem("time");
            videoRef.current.currentTime = t ?? 0;
        });
    }, []);
    // 存
    useEffect(() => {
        let time = 0;
        const interval = setInterval(() => {
            const t = videoRef.current?.currentTime;
            if (t) time = t;
        }, 500);
        return () => {
            console.log(time);
            localStorage.setItem("time", time);
            clearInterval(interval)
        }
    }, []);
    return (
        <>
            <video src="/v1.mp4" controls ref={videoRef} autoPlay></video>
        </>
    )
}
