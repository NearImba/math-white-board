import React, { useReducer, useContext, useEffect } from 'react'
import Mo from '../../engine/mos/mo'
enum MODE {
    func = 'func', // 函数模式
    graph = 'graph', // 图形模式
    distribution = 'distribution' // 正太分布
}

interface editorDataType {
    mode: MODE,
    mathObjCollections: Array<Mo>,
}

export const editorData: editorDataType = {
    mode: MODE.func,
    mathObjCollections: [],
}

export const editorContext = React.createContext(null)

export const reducer = (state: editorDataType, action : { type: string, data: any}) => {
    switch(action.type) {
        case 'CHANGE_MODE':
            return Object.assign({}, state, { mode: action.data})
        case 'ADD':
            return {...state, mathObjCollections: [...state.mathObjCollections, action.data] }
        case 'DELETE':
            let arr = state.mathObjCollections;
            for(let n = 0; n < arr.length; n++) {
                if(action.data === arr[n].id) {
                    arr.splice(n, 1);
                    break;
                }
            }
            return {...state, mathObjCollections: [...arr]}
        default:
            console.error(`${action.type} can't be accepted`)
            return state;
    }
}