import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MathStage from '../launcher/index'

// {"type": "Stepper", "data": {"min": 0.1, "max": 1, "value": 0.5, "step": 0.1, "name": "a"}}
const file = 'https://web-data.zmlearn.com/doc/4zFzFDQRr8PSE69gS66Zh3/courseware-1.txt'

const file1 = 'https://web-data.zmlearn.com/doc/4zFzFDQRr8PSE69gS66Zh3/courseware-1.txt'

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