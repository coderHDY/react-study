import { incre, decre, increAsync } from "../store";
import { connect } from 'react-redux';

// UI组件
let TestUI = (props) => (
    <>
        <div>{props.count}</div>
        <button onClick={props.decre}>-1</button>
        <button onClick={props.incre}>+1</button>
        <button onClick={props.increAsync}>异步+100</button>
    </>
)

// store 里面的 state 映射成容器组件的 props
const mapStateToProps = state => ({
    count: state
})

// 将dispatch映射成容器组件的props
const mapDispatchToProps = dispatch => ({
    incre: () => dispatch(incre()),
    decre: () => dispatch(decre()),
    increAsync: () => dispatch(increAsync(100, 1000)),
})

// 用UI组件以及store的规则创建《容器组件》
const Test = connect(mapStateToProps, mapDispatchToProps)(TestUI)

export default Test;
