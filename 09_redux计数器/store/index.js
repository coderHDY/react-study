import { createStore } from 'redux';

const ADD_ONE = '+1';
const DEL_ONE = '-1';

const incre = (num = 1) => ({ type: ADD_ONE, num })
const decre = (num = 1) => ({ type: DEL_ONE, num })

function countReducer(state = 0, action) {
    const { type, num } = action;
    switch (type) {
        case ADD_ONE: return state + num ?? 1;
        case DEL_ONE: return state - num ?? 1;
        default: return state
    }
}
const store = createStore(countReducer);

export {
    incre,
    decre
}

export default store;
