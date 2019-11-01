import React, { useContext, useMemo, useState } from 'react'
import { editorContext } from '../hooks/index'
import Pop from './pop'

import Stepper from '../../engine/mos/stepper'

import { MODE } from '../typing'

export default function AddStepper() {
    const { state, dispatch } = useContext(editorContext);
    const [name, setName ] = useState('a')
    const [min, setMin] = useState(0.1)
    const [max, setMax] = useState(0.1)
    const [step, setStep] = useState(0.1)
    const [show, setShow] = useState(false)

    function onClick() {
        setShow(true)
    }

    function onChange(f: Function) {
        return (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
            f(e.target.value)
        }
    }

    function addStepper() {
        dispatch({
            type: 'ADD',
            data: new Stepper({
                name: 'a',
                min,
                max,
                step,
                value: Math.floor((min + max) / 2),
            })
        })
    }

    switch (state.mode) {
        case MODE.func:
            return <div className="tool-item">
                <button type="button" onClick={onClick}>添加步进器</button>
                <Pop show={show}>
                    <select value={name} onChange={onChange(setName)}>
                        <option value="a">a</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                        <option value="d">d</option>
                        <option value="e">e</option>
                    </select>
                    <input placeholder="最小值" onChange={onChange(setMin)} type="text" value={min} />
                    <input placeholder="最大值" onChange={onChange(setMax)} type="text" value={max} />
                    <input placeholder="步进" onChange={onChange(setStep)} type="text" value={step} />
                    <button type="button" onClick={addStepper}>添加</button>
                </Pop>
            </div>
        default:
            return null
    }
}