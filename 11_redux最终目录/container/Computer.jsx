import { connect } from 'react-redux'
import { incre, decre, increAsync } from '../store/actions/count'
import React from 'react';

const Computer = (props) => (
    <div>
        <div>{props.count}</div>
        <button onClick={() => props.decre(1)}>-1</button>
        <button onClick={() => props.incre(1)}>+1</button>
        <button onClick={() => props.increAsync(11, 1000)}>异步+11</button>
    </div>
)

export default connect(
    state => ({ count: state.count }),
    {
        incre,
        decre,
        increAsync
    }
)(Computer)
