import React, { useContext, useMemo, useState } from 'react'
import { editorContext } from '../hooks/index'
import Equal from '../../engine/mos/equal';

import { MODE } from '../typing'

export default function AddEqualButton() {
    const { state, dispatch } = useContext(editorContext);
    const [equal, setEqual] = useState('y = sin(x)')
    function onClick() {
        dispatch({
            type: 'ADD',
            data: new Equal(equal)
        })
    }

    function inputEqual(e: React.ChangeEvent<HTMLInputElement>) {
        setEqual(e.target.value)
    }

    switch (state.mode) {
        case MODE.func:
            return useMemo(() => <div className="tool-item">
                <input type="text" value={equal} onChange={inputEqual} />
                <button type="button" onClick={onClick}>添加函数</button>
            </div>, [state.mode, equal])
        default:
            return null
    }
}