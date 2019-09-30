import * as React from 'react';

import MathRender from '../engine/index'
import Mo from '../engine/mos/mo';

import Stepper from '../rc/stepper'
import Latex from '../rc/latex'

import Types from '../engine/base/types'

import { MathStageEventType } from '../engine/base/types'

import { steps } from '../engine/config'

import './index.less'

enum QualityLeveL {
    high = 'high',
    normal = 'normal',
    low = 'low',
}

interface MathStageProps {
    width: number;
    height: number;
    file: string;
    onEventFired?: Function;
    ref?: React.RefObject<MathStage>,
    enableDrag?: boolean;
    enableScale?: boolean;
    enableFullscreen?: boolean;
    enablePicking?: boolean;
    quality?: QualityLeveL
}

interface MathStageStore {
    loading: boolean;
    error: boolean;
    fullscreen: boolean;
    steppers: Array<{ name: string, max: number, min: number, value: number, step: number }>,
    latexs: Array<{ text: string, }>,
    zoomIndex: number,
}

export default class MathStage extends React.Component<MathStageProps, MathStageStore> {
    Canvas = React.createRef<HTMLCanvasElement>();
    Container = React.createRef<HTMLDivElement>();
    MR: MathRender;
    MoArray: Array<Mo>;
    lastUpatedTime: number = 0;
    timer: number;

    static defaultProps = {
        enableDrag: true,
        enableScale: true,
        enableFullscreen: true,
        enablePicking: false,
        quality: 'normal',
        onEventFired: function () { }
    }

    state: MathStageStore = {
        loading: false,
        error: false,
        fullscreen: false,
        steppers: [],
        latexs: [],
        zoomIndex: 2,
    }

    componentDidMount() {
        const { width, height, file, enableDrag, enableFullscreen } = this.props;
        this.MR = new MathRender({
            Canvas: this.Canvas.current,
            iWidth: width,
            iHeight: height,
        })
        this.setState({
            loading: true,
        })
        this.loadData(file).then(data => {
            this.MoArray = MathRender.loadData(data.elements)
            this.setState({
                steppers: this.MoArray.filter(item => item.type === Types.Stepper).map(item => {
                    return {
                        name: item.data.name,
                        max: item.data.max,
                        min: item.data.min,
                        value: item.data.value,
                        step: item.data.step,
                        top: item.data.top ? item.data.top : '0',
                        left: item.data.left ? item.data.left : '0',
                    }
                })
            })
            this.setState({
                latexs: this.MoArray.filter(item => item.type === Types.Latex).map(item => {
                    return {
                        text: item.data.text,
                        top: item.data.top ? item.data.top : '0',
                        left: item.data.left ? item.data.left : '0',
                    }
                })
            })
            this.MR.render(this.MoArray)
            console.log(this.MoArray)
            if (enableDrag) {
                this.initDragEvent()
            }
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            this.setState({
                loading: false
            })
        })

        if (enableFullscreen) {
            this.Container.current.addEventListener('fullscreenchange', (event: Event) => {
                if (document.fullscreenElement) {
                    const { width, height } = window.screen
                    this.resize(width, height)
                } else {
                    const { width, height } = this.props
                    this.resize(width, height)
                    this.doUnfullscreen()
                }
            })
        }
    }

    loadData = (url: string): Promise<{elements: Array<{data: any, type: Types}>}> => {
        return fetch(url).then(res => res.text()).then(str => {
            return JSON.parse(decodeURIComponent(atob(str)))
        }).catch(err => {
            throw err
        })

    }

    initDragEvent = () => {
        const { onEventFired } = this.props
        const Canvas = this.Canvas.current;
        let start: Vec2 = { x: 0, y: 0 }
        let translate: Vec2 = {
            x: 0,
            y: 0
        }
        const move = (e: any) => {
            const { width } = this.props;
            const { fullscreen } = this.state;
            const cw = (fullscreen ? window.innerWidth : width) / this.MR.store.X;
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
            Canvas.removeEventListener('mouseleave', cancel)
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
            Canvas.addEventListener('mouseleave', cancel)
        })
    }

    onReceiveEvent = (event: MathStageEvent) => {
        switch (event.type) {
            case MathStageEventType.Translate:
                this.MR.store.setTranslate(event.data)
                this.updateView()
                break;
            case MathStageEventType.Scale:
                this.MR.store.setZoomIndex(event.data)
                this.updateView()
                break;
            case MathStageEventType.Uniform:
                this.MR.store.setUniforms(event.data)
                this.updateView()
        }
    }

    updateView = () => {
        const { quality } = this.props
        if (this.timer) {
            clearTimeout(this.timer)
        }
        switch (quality) {
            case 'high':
                requestAnimationFrame(() => {
                    this.MR.render(this.MoArray)
                })
                break;
            case 'normal':
            default:
                const t = Date.now() - this.lastUpatedTime
                const MIN = 60
                if (t >= MIN) {
                    requestAnimationFrame(() => {
                        this.MR.render(this.MoArray)
                    })
                    this.lastUpatedTime = Date.now()
                } else {
                    this.timer = window.setTimeout(this.updateView, MIN - t)
                }
        }
    }

    doFullscreen = () => {
        this.setState({
            fullscreen: true,
        }, () => {
            if (!document.fullscreenElement) {
                const dom = this.Container.current;
                dom.requestFullscreen();
            }
        })
    }

    doUnfullscreen = () => {
        this.setState({
            fullscreen: false,
        }, () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        })
    }

    resize(width: number, height: number) {
        this.MR.resize(width, height)
        this.updateView()
    }

    zoomOut = () => {
        const { zoomIndex } = this.state
        if (zoomIndex < steps.length - 1) {
            const nextZoomIndex = zoomIndex + 1;
            const { onEventFired } = this.props
            onEventFired({
                type: MathStageEventType.Scale,
                data: nextZoomIndex,
            })
            this.MR.store.setZoomIndex(nextZoomIndex)
            this.updateView()
            this.setState({
                zoomIndex: nextZoomIndex
            })
        }
    }

    zoomIn = () => {
        const { zoomIndex } = this.state
        if (zoomIndex > 0) {
            const nextZoomIndex = zoomIndex - 1;
            const { onEventFired } = this.props
            onEventFired({
                type: MathStageEventType.Scale,
                data: nextZoomIndex,
            })
            this.MR.store.setZoomIndex(nextZoomIndex)
            this.updateView()
            this.setState({
                zoomIndex: nextZoomIndex
            })
        }
    }

    onStepperChange = (name: string, value: number) => {
        const { onEventFired } = this.props
        const info = { [name]: value }
        this.MR.store.setUniforms(info)
        onEventFired({
            type: MathStageEventType.Uniform,
            data: info
        })
        this.updateView()
    }

    render() {
        const { width, height, enableFullscreen, enableScale } = this.props;
        const { loading, fullscreen, error, steppers, latexs } = this.state;

        return <div ref={this.Container} style={{ width: `${width}px`, height: `${height}px` }} className="math-stage-instance">
            <canvas ref={this.Canvas} width={width} height={height} />
            <div className={`loading ${loading ? '' : 'hide'}`} />
            <div className={`error ${error ? '' : 'hide'}`} />
            <div className="controls">
                <button className={`zoom-in ${enableScale ? '' : 'hide'}`} type="button" onClick={this.zoomIn}>放大</button>
                <button className={`zoom-out ${enableScale ? '' : 'hide'}`} type="button" onClick={this.zoomOut}>缩小</button>
                <button className={`fullscreen ${!fullscreen && enableFullscreen ? '' : 'hide'}`} type="button" onClick={this.doFullscreen}>全屏</button>
                <button className={`unfullscreen ${fullscreen && enableFullscreen ? '' : 'hide'}`} type="button" onClick={this.doUnfullscreen}>取消全屏</button>
            </div>
            {steppers.map(st => <Stepper key={st.name} onChange={this.onStepperChange} {...st} />)}
            {latexs.map(st => <Latex key={st.text} {...st} />)}
        </div>
    }
}