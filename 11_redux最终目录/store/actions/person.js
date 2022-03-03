import { ADD_PERSON } from '../constants';

const addPerson = person => ({ type: ADD_PERSON, person });

export {
    addPerson
}
