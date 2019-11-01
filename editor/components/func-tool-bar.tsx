import React, { useContext } from 'react';
import { editorContext } from '../hooks/index'

export default function FuncToolBar() {
    const { state } = useContext(editorContext)
    return <div>
        {state.mode}
    </div>
}
