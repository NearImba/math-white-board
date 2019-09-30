import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MathStage from '../launcher/index'

// {"type": "Stepper", "data": {"min": 0.1, "max": 1, "value": 0.5, "step": 0.1, "name": "a"}}
const file = 'https://web-data.zmlearn.com/doc/4zFzFDQRr8PSE69gS66Zh3/courseware-1.txt'

class Index extends React.Component {

    render() {
        return <div>
            <MathStage width={900} height={420} file={file}/>
        </div>
    }
}

ReactDOM.render(<Index />, document.querySelector('#app'))