import * as React from 'react';

import MathRender from '../engine/index'
import Mo from '../engine/mos/mo';

import { cw } from '../engine/config'

import { MathStageEventType } from '../engine/base/types'

interface MathStageProps {
    width: number;
    height: number;
    file: string;
    onEventFired?: Function;
    ref: React.RefObject<MathStage>,
}

interface MathStageStore {
    loading: boolean;
    error: boolean;
    onReceive: Function;
}

export default class MathStage extends React.Component<MathStageProps, MathStageStore> {
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
        this.setState({
            loading: true,
        })
        this.loadData(file).then(data => {
            this.MoArray = MathRender.loadData(data as string)
            this.MR.render(this.MoArray)
            this.initMoveEvent()
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    loadData = (url: string): Promise<string | { errMsg: string }> => {
        const { file } = this.props;
        return new Promise((resolve, reject) => {
            if (Math.random() > 0.07) {
                resolve(file);
            } else {
                reject('文件加载失败')
            }
        })
    }

    initMoveEvent = () => {
        const { onEventFired = () => {} } = this.props
        const Canvas = this.Canvas.current;
        let start:Vec2 = {x:0, y:0}
        let translate: Vec2 = {
            x: 0,
            y: 0
        }
        const move = (e: any) => {
            let t = {
                x: translate.x + (e.pageX - start.x) / cw,
                y: translate.y - (e.pageY - start.y) / cw,
            }
        
            this.MR.store.setTranslate(t)
            onEventFired({
                type: MathStageEventType.Translate,
                data: t,
            })
            this.updateView()
        }
        const cancel = () => {
            Canvas.removeEventListener('mousemove', move)
            Canvas.removeEventListener('mouseup', cancel)
        }
        Canvas.addEventListener('mousedown', (e) => {
            start = {
                x: e.pageX,
                y: e.pageY,
            }
            const t = this.MR.store.getTranslate()
            translate = {
                x: t.x,
                y: t.y,
            }
            Canvas.addEventListener('mousemove', move)
            Canvas.addEventListener('mouseup', cancel)
        })
    }

    onReceiveEvent = (event: MathStageEvent) => {
        switch(event.type) {
            case MathStageEventType.Translate:
                this.MR.store.setTranslate(event.data)
                this.updateView()
                break;
        }
    }

    updateView = () => {
        requestAnimationFrame(() => {
            this.MR.render(this.MoArray)
        })
    }

    render() {
        const { width, height } = this.props;
        return <div className="math-stage-instance">
            <div className="loading" />
            <div className="error" />
            <canvas ref={this.Canvas} width={width} height={height} />
        </div>
    }
}