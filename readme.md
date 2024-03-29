# Math-Stage-Pro

数学教具加载器

![demo](demo.png)

### 代码示例

```
import MathStage from 'math-stage-pro';

ReactDOM.render(<MathStage ref={this.B} width={900} enableFullscreen={false} height={420} file={file} />, document.querySelector('#app'))
```

### 数据通信示例

代码示例

```
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MathStage from '../launcher/index'

const file = '/courseware-1.txt'

class Index extends React.Component {
    A = React.createRef<MathStage>()
    B = React.createRef<MathStage>()
    onAChange = (event: MathStageEvent) => {
        this.B.current.onReceiveEvent(event)
    }
    render() {
        return <div>
            <MathStage ref={this.A} onEventFired={this.onAChange} width={900} height={420} file={file}/>
            <MathStage ref={this.B} enableFullscreen={false} width={1280} height={420} file={file}/>
        </div>
    }
}

ReactDOM.render(<Index />, document.querySelector('#app'))
```
