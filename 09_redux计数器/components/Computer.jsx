import store, { incre, decre } from "../store";

let Test = () => (
    <>
        <div>{store.getState()}</div>
        <button onClick={() => decre(10)}>-1</button>
        <button onClick={() => incre(99)}>+1</button>
    </>
)

export default Test;
