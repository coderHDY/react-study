import { useRef, useState, useEffect } from "react";
import { useKeyPress, useKeyPressEvent, useRaf } from "react-use";
import useKeyboardJs from "react-use/lib/useKeyboardJs";

// const useRaf = (waitTime) => {
//     const [v, setV] = useState(0);
//     const addV = () => {
//         if (v === 1 - 0.001) return;
//         setV(c => Math.floor(c * 1000 + 1) / 1000);
//         requestAnimationFrame(addV);
//     };
//     useEffect(() => {
//         setTimeout(() => {
//             addV();
//         }, waitTime);
//     }, []);
//     return v;
// };

const Demo = () => {
    const elapsed = useRaf(5000, 3000);

    return <div>Elapsed: {elapsed}</div>;
};
export default Demo;
