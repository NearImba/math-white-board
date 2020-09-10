import React, { useReducer, useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom'

import MathRender from '../engine/index'

import Header from './components/header'
import FuncToolBar from './components/func-tool-bar'
import MathObjList from './components/obj-list'
import AddStepper from './components/add-stepper'

import Stepper from '../rc/stepper'

import Types from '../engine/base/types'

import './editor.less'

import { editorContext, editorData, reducer } from './hooks/index'

const width = 600;
const height = 540;
let MR: MathRender = null

function Editor() {
    const [state, dispatch] = useReducer(reducer, editorData);
    const Canvas = useRef(null)
    useEffect(() => {
        if (!MR) {
            MR = new MathRender({
                Canvas: Canvas.current,
                iWidth: width,
                iHeight: height,
            })
        }
        MR.render(state.mathObjCollections)
    }, [state.mode, state.mathObjCollections])

    const steppers = state.mathObjCollections.filter(item => item.type === Types.Stepper).map(item => {
        return {
            name: item.data.name,
            max: item.data.max,
            min: item.data.min,
            value: item.data.value,
            step: item.data.step,
            top: item.data.top ? item.data.top : '0',
            left: item.data.left ? item.data.left : '0',
        }
    })

    function onStepperChange() {

    }

    return (<editorContext.Provider value={{ state, dispatch }}>
        <div className="editor-container">
            <Header />
            <FuncToolBar />
            <MathObjList />
            <AddStepper />
            <canvas ref={Canvas} width={width} height={height} />
            {steppers.map(st => <Stepper key={st.name} onChange={onStepperChange} {...st} />)}
        </div>
    </editorContext.Provider>)
}

ReactDOM.render(<Editor />, document.querySelector('#app'))

