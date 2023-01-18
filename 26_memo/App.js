//Logger
import React, { useState, memo } from 'react';

const App = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <button onClick={increment}>The count is {count}</button>

      {/* 每次刷新重新渲染 */}
      {/* <Logger  label="counter"/> */}


      {/* 缓存不动到这个组件就不刷新 */}
      <MemoLogger label="counter" />
    </div>
  )
}

function Logger(props) {
  console.log(`${props.label} rendered`)
  return (<></>)
}

const MemoLogger = memo(Logger);

export default  App;