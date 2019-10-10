import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MathStage from '../launcher/index'

const file = 'https://web-data.zmlearn.com/doc/4zFzFDQRr8PSE69gS66Zh3/courseware-1.txt'

function Index() {
    return <div>
        <MathStage width={900} height={420} file={file}/>
    </div>
}

ReactDOM.render(<Index />, document.querySelector('#app'))