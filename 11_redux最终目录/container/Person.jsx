import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react/cjs/react.development'
import { addPerson } from '../store/actions/person';


function Person(props) {
    const [info, setInfo] = useState({
        name: '',
        age: ''
    });
    const changeInfo = (type) => e => setInfo({ ...info, [type]: e.target.value })
    const add = () => {
        props.addPerson({ ...info });
        setInfo(Object.fromEntries(Object.keys(info).map(key => [key, ''])));
    };
    return (
        <div>
            <div>
                <input value={info.name} onChange={changeInfo('name')} />
                <input value={info.age} onChange={changeInfo('age')} />
                <button onClick={add}>添加</button>
            </div>
            <ul>
                {
                    props.person.map(item => (
                        <li key={item.name}>{item.name}-{item.age}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default connect(
    state => ({ person: state.person }),
    {
        addPerson
    }
)(Person)
