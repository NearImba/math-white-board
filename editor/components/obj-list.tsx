import React, { useContext, useMemo, ReactElement } from 'react'
import { editorContext } from '../hooks/index'

import Mo from '../../engine/mos/mo';

function Item(props: any): ReactElement {
    const { dispatch } = useContext(editorContext);
    return useMemo(() => {
        function onClick(id: string) {
            return () => {
                dispatch({
                    type: 'DELETE',
                    data: id
                })
            }
        }
        const { item } = props;
        return (<div key={item.id}>
            {item.id}-{Math.random()}
            <span onClick={onClick(item.id)}>删除</span>
        </div>)
    }, [props.item])
}

export default function MathObjList() {
    const { state } = useContext(editorContext);
    return useMemo(() => {
        const list = state.mathObjCollections;
        return <div>
            {list.map((item: Mo) => <Item key={item.id} item={item} />)}
        </div>
    }, [state.mathObjCollections])
}