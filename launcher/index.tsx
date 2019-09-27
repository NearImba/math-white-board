import * as React from 'react';

import MathRender from '../engine/index'
import Mo from '../engine/mos/mo';

import { cw } from '../engine/config'

import { MathStageEventType } from '../engine/base/types'

import './index.less'

interface MathStageProps {
    width: number;
    height: number;
    file: string;
    onEventFired?: Function;
    ref: React.RefObject<MathStage>,
    enableDrag?: boolean;
    enableScale?: boolean;
    enableFullscreen?: boolean;
    enablePicking?: boolean;
}

interface MathStageStore {
    loading: boolean;
    error: boolean;
    fullscreen: boolean;
}

export default class MathStage extends React.Component<MathStageProps, MathStageStore> {
    Canvas = React.createRef<HTMLCanvasElement>();
    MR: MathRender;
    MoArray: Array<Mo>;
    lastUpatedTime:number = 0;
    timer: number;

    static defaultProps = {
        enableDrag: true,
        enableScale: true,
        enableFullscreen: true,
        enablePicking: false,
    }

    state: MathStageStore = {
        loading: false,
        error: false,
        fullscreen: false,
    }

    componentDidMount() {
        const { width, height, file, enableDrag } = this.props;
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
            if(enableDrag) {
                this.initDragEvent()
            }
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

    initDragEvent = () => {
        const { onEventFired = () => {} } = this.props
        const Canvas = this.Canvas.current;
        let start:Vec2 = {x:0, y:0}
        let translate: Vec2 = {
            x: 0,
            y: 0
        }
        const move = (e: any) => {
            let t = {
                x: translate.x + (e.pageX - start.x) * 2 / cw,
                y: translate.y - (e.pageY - start.y) * 2 / cw,
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
        if(this.timer) {
            clearTimeout(this.timer)
        }
        const t = Date.now() - this.lastUpatedTime
        const MIN = 60
        if(t >= MIN) {
            requestAnimationFrame(() => {
                this.MR.render(this.MoArray)
            })
            this.lastUpatedTime = Date.now()
        } else {
            this.timer = window.setTimeout(this.updateView, MIN - t)
        }
    }

    render() {
        const { width, height, enableFullscreen, enableScale } = this.props;
        const { loading, fullscreen, error } = this.state;
        return <div style={{width: `${width}px`, height: `${height}px`}} className="math-stage-instance">
            <div className={`loading ${loading ? '': 'hide'}`} />
            <div className={`error ${error ? '': 'hide'}`} />
            <div className="controls">
                <button className={`zoom-in ${enableScale ? '': 'hide'}`} type="button">放大</button>
                <button className={`zoom-out ${enableScale ? '': 'hide'}`} type="button">缩小</button>
                <button className={`fullscreen ${!fullscreen && enableFullscreen ? 'hide': ''}`} type="button">全屏</button>
                <button className={`unfullscreen ${fullscreen && enableFullscreen ? 'hide': ''}`} type="button">取消全屏</button>
            </div>
            <canvas ref={this.Canvas} width={width} height={height} />
        </div>
    }
}