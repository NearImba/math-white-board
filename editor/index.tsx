import React, { useReducer, useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom'

import MathRender from '../engine/index'

import Header from './components/header'
import FuncToolBar from './components/func-tool-bar'
import MathObjList from './components/obj-list'
import AddStepper from './components/add-stepper'
import './editor.less'

import { editorContext, editorData, reducer } from './hooks/index'

const width = 600;
const height = 540;
let MR: MathRender = null

function Editor() {
    const [state, dispatch] = useReducer(reducer, editorData);
    const Canvas = useRef(null)
    useEffect(() => {
        console.log('mode change:' + state.mode)
        if (!MR) {
            MR = new MathRender({
                Canvas: Canvas.current,
                iWidth: width,
                iHeight: height,
            })
        }
        MR.render(state.mathObjCollections)
    }, [state.mode, state.mathObjCollections])
    return (<editorContext.Provider value={{ state, dispatch }}>
        <div className="editor-container">
            <Header />
            <FuncToolBar />
            <MathObjList />
            <AddStepper />
            <canvas ref={Canvas} width={width} height={height} />
        </div>
    </editorContext.Provider>)
}

ReactDOM.render(<Editor />, document.querySelector('#app'))

