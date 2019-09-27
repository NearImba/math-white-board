import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MathStage from '../launcher/index'

// {"type": "Stepper", "data": {"min": 0.1, "max": 1, "value": 0.5, "step": 0.1, "name": "a"}}
const file = '[{"type": "Equal", "data": "y * y / a + x * x / (b * b)  = 1"},{"type":"Point","data":{"xy":{"x": 0, "y": 0}}}, {"type":"Point","data":{"xy":{"x": -3, "y": 2}}}, {"type":"Line","data":{"p1":{"x": -5.5, "y": 0},  "tag1": "B22", "p2":{"x": 1.3, "y": 0.3},"tag2": "C4"}}, {"type":"Line","data":{"p1":{"x": -0.5, "y": 0},  "tag1": "B3", "p2":{"x": 1, "y": 3.3},"tag2": "C6"}}, {"type": "Polygon", "data": [{"x": -3.3, "y": -1.2}, {"x": 2, "y": 3}, {"x": 1.6, "y": -0.5 }]}, {"type": "Stepper", "data": {"min": 0.1, "max": 1, "value": 0.5, "step": 0.1, "name": "a"}}]'

const file1 = '[{"type": "Equal", "data": "y * y / 4 + x * x /9  = 1"},{"type":"Equal","data":"y = a * x"}, {"type":"Point","data":{"xy":{"x": 3, "y": 2}}}, {"type":"Line","data":{"p1":{"x": 5.5, "y": 0},  "tag1": "B22", "p2":{"x": 1.3, "y": 0.3},"tag2": "C4"}}, {"type":"Line","data":{"p1":{"x": 0.5, "y": 0},  "tag1": "B3", "p2":{"x": 1, "y": 3.3},"tag2": "C6"}}, {"type": "Polygon", "data": [{"x": 3.3, "y": 1.2}, {"x": 2, "y": 3}, {"x": 1.6, "y": 0.5 }]}, {"type": "Stepper", "data": {"min": 0.1, "max": 1, "value": 0.5, "step": 0.1, "name": "a"}}]'

class Index extends React.Component {
    A = React.createRef<MathStage>()
    B = React.createRef<MathStage>()
    onAChange = (event: MathStageEvent) => {
        this.B.current.onReceiveEvent(event)
    }
    render() {
        return <div>
            <MathStage ref={this.A} onEventFired={this.onAChange} width={900} height={420} file={file}/>
            <MathStage ref={this.B} enableFullscreen={false} width={1280} height={420} file={file1}/>
        </div>
    }
}

ReactDOM.render(<Index />, document.querySelector('#app'))