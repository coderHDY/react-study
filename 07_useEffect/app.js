import { useState, useRef, useEffect } from "react/cjs/react.development";
import Test2 from './components/Test2';
function App() {
    const [showTest, change] = useState(true);
    const toggle = () => change(pre => !pre)
    return (
        <>
            <button onClick={toggle}>变</button>
            {showTest ? <Test2></Test2> : ''}
        </>
    )
}
export default App
