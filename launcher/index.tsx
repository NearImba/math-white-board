import * as React from 'react';

import MathRender from '../engine/index'
import Mo from '../engine/mos/mo';

interface MathStageProps {
    width: number;
    height: number;
    file: string;
}

export default class MathStage extends React.PureComponent<MathStageProps> {
    Canvas = React.createRef<HTMLCanvasElement>();
    MR: MathRender;
    MoArray: Array<Mo>;
    componentDidMount() {
        const { width, height, file } = this.props;
        this.MR = new MathRender({
            Canvas: this.Canvas.current,
            iWidth: width,
            iHeight: height,
        })
        this.loadData(file).then(data => {
            this.MoArray = MathRender.loadData(data as string)
            this.MR.render(this.MoArray)
        }).catch(err => {
            console.log(err)
            console.log('加载失败')
        })
    }

    loadData = (url: string): Promise<string|{errMsg: string}> => {
        const { file } = this.props;
        return new Promise((resolve, reject) => {
            if(Math.random() > 0.07) {
                resolve(file);
            } else {
                reject('文件加载失败')
            }
        })
    }
    render() {
        const { width, height } = this.props;
        return <canvas ref={this.Canvas} width={width} height={height} />
    }
}