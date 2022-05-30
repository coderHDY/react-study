import './index.css';
import { useState } from 'react';
export default function TodoList() {
    const [
        list,
        addList,
        removeItem,
        changeDone,
        clearList,
    ] = useList();
    const [inputVal, changeInput] = useState('');
    const recordList = () => {
        addList(inputVal);
        changeInput('');
    }
    return (
        <div className="todo-list-box">
            <div className="search-box">
                <input className="input-box" type="text" value={inputVal} onChange={e => changeInput(e.target.value)} onKeyUp={e => e.code === 'Enter' ? recordList() : ''} />
                <button className="add-btn" onClick={recordList}>添加</button>
            </div>
            <dl className="item-list">
                {
                    list.map((item, i) => (
                        <li key={item.name} className="list-item">
                            <input className="check-box" type="checkbox" value={!item.done} onChange={() => changeDone(i)} />
                            <span className="todo-item">{item.name}</span>
                            <button className="del-btn" onClick={() => removeItem(i)}>删除</button>
                        </li>
                    ))
                }
            </dl>
            <div className="calc-list">
                <span className="totol-font">总计：</span>
                <span className="totol-num">
                    {
                        list.filter(item => item.done === true).length
                    }/{
                        list.length
                    }
                </span>
                <button className="clear-btn" onClick={clearList}>清空</button>
            </div>
        </div>
    )
}

function useList(defaultList = []) {
    const [list, setList] = useState(defaultList);
    const addList = item => {
        const val = item.trim();
        const idx = list.findIndex(item => item.name === val);
        if (idx !== -1 || val === '') return;
        const newList = [{
            name: item,
            done: false,
        }].concat(list);
        setList(newList);
    };
    const removeItem = idx => {
        const newList = list.slice(0, idx).concat(list.slice(idx + 1));
        setList(newList);
    }
    const changeDone = idx => {
        const newList = list.slice();
        newList[idx].done = !newList[idx].done;
        setList(newList);
    }
    const clearList = () => setList([]);
    return [
        list,
        addList,
        removeItem,
        changeDone,
        clearList,
    ]
}
