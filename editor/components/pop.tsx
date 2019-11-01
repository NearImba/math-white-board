import React, { ReactElement } from 'react';

export default function Pop(props: { show: boolean, children: ReactElement[]} ) {
    const { show, children } = props;
    if(show) {
        return <div className="math-stage-pop">
            {children}
        </div>
    } else {
        return null
    }

}