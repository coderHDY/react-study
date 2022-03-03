import { INCRE, DECRE } from '../constants';

const incre = val => ({ type: INCRE, val })
const decre = val => ({ type: DECRE, val })
const increAsync = (val, timer) => dixpatch =>
    setTimeout(() => dixpatch({ type: INCRE, val }), timer);

export {
    incre,
    decre,
    increAsync,
}
