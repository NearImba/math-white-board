import React, { useContext } from 'react';
import { editorContext } from '../hooks/index'

import AddEqualButton from '../components/add-equal'

enum MODE {
    func = 'func', // 函数模式
    graph = 'graph', // 图形模式
    distribution = 'distribution' // 正太分布
}

export default function Header() {
    const { state, dispatch } = useContext(editorContext);
    function doChangeMode(e: React.ChangeEvent<HTMLSelectElement>) {
        dispatch({
            type: 'CHANGE_MODE',
            data: e.target.value as MODE,
        })
    }
    return <div>
        <select value={state.mode} onChange={doChangeMode}>
            <option value={MODE.func as string}>函数</option>
            <option value={MODE.graph as string}>图形</option>
        </select>
        <AddEqualButton />
    </div>
}