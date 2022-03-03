import { INCRE, DECRE } from '../constants';

export default function countReducer(state = 0, action) {
    const { type, val } = action;
    switch (type) {
        case INCRE: return state + val;
        case DECRE: return state - val;
        default: return state;
    }
}
