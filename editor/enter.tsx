import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MathStage from '../launcher/index'

const file = '[{"type": "Equal", "data": "y * y / 4 + x * x /9  = 1"},{"type":"Point","data":{"xy":{"x": 0, "y": 0}}}, {"type":"Point","data":{"xy":{"x": -3, "y": 2}}}, {"type":"Line","data":{"p1":{"x": -5.5, "y": 0},  "tag1": "B22", "p2":{"x": 1.3, "y": 0.3},"tag2": "C4"}}, {"type":"Line","data":{"p1":{"x": -0.5, "y": 0},  "tag1": "B3", "p2":{"x": 1, "y": 3.3},"tag2": "C6"}}, {"type": "Polygon", "data": [{"x": -3.3, "y": -1.2}, {"x": 2, "y": 3}, {"x": 1.6, "y": -0.5 }]}]'

class Index extends React.Component {
    render() {
        return <MathStage width={640} height={320} file={file}/>
    }
}
ReactDOM.render(<Index />, document.querySelector('#app'))