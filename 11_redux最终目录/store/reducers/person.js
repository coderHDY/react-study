import { ADD_PERSON } from '../constants';

const initState = [
    {
        name: '张三',
        age: 18
    },
    {
        name: '赵四',
        age: 19
    }
]

export default function personReducer(state = initState, action) {
    const { type, person } = action;
    switch (type) {
        case ADD_PERSON: return [person, ...state];
        default: return state;
    }
}
