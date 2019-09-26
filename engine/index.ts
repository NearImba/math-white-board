import Store from './store/index'

import Mo from './mos/mo'
import Point from './mos/point'
import Equal from './mos/equal'
import Line from './mos/line'

import Types from './base/types'
import { initializePrograms, setGlobalUniforms } from './render/programOperation'

import { getTextTexturePosition, tags, ww, hh, createWebGLProgram, createVertexShader, createFragmentShader } from './render/utils'

import renderPoints from './render/pass/point'
import renderPointTexts from './render/pass/pText'
import renderEquals from './render/pass/equal'
import renderLines from './render/pass/line'
import renderPolygon from './render/pass/polygon'

import Polygon from './mos/polygon'

const SIZE = Float32Array.BYTES_PER_ELEMENT;

export default class MathRender {
    /**
     *
     * 绘图上下文
     * @type {WebGLRenderingContext}
     * @memberof MathRender
     */
    gl: WebGLRenderingContext;

    currentProgram: WebGLProgram;

    MathObjects: Array<Mo> = [];

    store: Store;

    tagIndex: number = -1;

    background: Types = Types.Coordinate;

    map: Map<string, WebGLProgram> = new Map();

    /**
     *
     * 需要刷新
     * @type {boolean}
     * @memberof MathRender
     */
    needUpdated: boolean = false;

    constructor(props: { Canvas: HTMLCanvasElement, iWidth?: number, iHeight?: number }) {
        const { Canvas, iWidth, iHeight } = props;
        this.store = new Store();
        if(iWidth && iHeight) {
            this.store.setSize({
                width: iWidth,
                height: iHeight,
            })
        }

        const { width, height } = this.store.getSize()
        Canvas.width = width;
        Canvas.height = height;

        const gl = Canvas.getContext('webgl');

        initializePrograms(gl, this.map);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        this.gl = gl;
    }

    /**
     *
     * 从字符串中恢复数据
     * @param {string} file
     * @memberof MathRender
     */
    static loadData(file: string): Array<Mo> {
        const result: Array<Mo> = [];
        try {
            const arr = JSON.parse(file);
            arr.forEach((item: { type: Types; data: any }) => {
                switch (item.type) {
                    case Types.Point:
                        result.push(new Point({ ...item.data }))
                        break;
                    case Types.Equal:
                        result.push(new Equal(item.data))
                        break;
                    case Types.Line:
                        result.push(new Line(item.data))
                        break;
                    case Types.Polygon:
                        result.push(new Polygon(item.data))
                        break
                    default:
                        console.warn(`${item.type} is not supported yet`)
                        break;
                }
            })
        } catch (e) {
            console.error(e)
            console.info('file broken')
        }
        return result;
    }

    /**
     * 清除
     *
     * @memberof MathRender
     */
    clear(): void {
        const gl: WebGLRenderingContext = <WebGLRenderingContext>this.gl;
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    mathCoordToViewCoord(xy: Vec2): Vec2 {
        const xMax = this.store.X;
        const aspect = this.store.AS;
        const yMax = xMax * aspect;
        return {
            x: xy.x / xMax,
            y: xy.y / yMax
        }
    }

    /**
     *
     *
     * @param {Array<Mo>} MoArray
     * @param {boolean} [skipClear=false]
     * @memberof MathRender
     */
    render(MoArray: Array<Mo>, isPicking: boolean = false, skipClear: boolean = false, ): void {
        if (!skipClear) {
            this.clear()
        }

        const gl = this.gl;

        const { width, height } = this.store.getSize()

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

        const indicesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);

        const size = this.store.getSize()

        // 函数 和 坐标系的 顶点数据
        const p1 = [-1, 1, -1, -1, 1, -1, 1, 1]

        // 顶点 数据
        const p2: Array<number> = []

        // 线数据
        let p3: Array<number> = []
        // 线顶点索引
        let p3Index: Array<number> = []

        // 多边形数据
        let p4: Array<number> = []
        const polygonCount: Array<number> = []

        // 顶点标示文字
        let p5: Array<number> = []

        const fa: Array<Equal> = []

        const addPointData = (mpt: Vec2, specifiedColor: Vec3, isSelected: boolean, tag: string) => {
            const pt: Vec2 = this.mathCoordToViewCoord(mpt);
            p2.push(pt.x)
            p2.push(pt.y)
            p2.push(isSelected ? 0 : 1)
            p2.push(specifiedColor.x / 255);
            p2.push(specifiedColor.y / 255);
            p2.push(specifiedColor.z / 255);

            const xy = getTextTexturePosition(tag || 'A1')
            const x = pt.x + 0.01;
            const y = pt.y - 0.01;
            const L = tags.length;

            const tw = 1 * ww / width;
            const th = 1 * hh / height;

            p5 = [...p5, ...[
                x, y, xy.x, xy.y + 0.01,
                x, y - th, xy.x, xy.y,
                x + tw, y - th, xy.x + 1 / L, xy.y,
                x + tw, y, xy.x + 1 / L, xy.y + 0.01,
            ]]
        }

        const addLineData = (mp1: Vec2, mp2: Vec2, specifiedColor: Vec3, isSelected: boolean) => {
            const p1: Vec2 = this.mathCoordToViewCoord(mp1);
            const p2: Vec2 = this.mathCoordToViewCoord(mp2);
            const m = p3.length / 9
            p3Index = [...p3Index, ...[0 + m, 1 + m, 2 + m, 0 + m, 2 + m, 3 + m]]
            for (let n = 0; n < 4; n++) {
                p3 = [...p3, ...[p1.x, p1.y, p2.x, p2.y, specifiedColor.x / 255, specifiedColor.y / 255, specifiedColor.x / 255, n, isSelected ? 1.0: 0.0]]
            }
        }

        const addPolygonData = (arr: Array<Vec2>, specifiedColor: Vec3, isSelected: boolean) => {
            if(arr.length > 2) {
                polygonCount.push(arr.length)
                const r7: Array<number> = []
                arr.forEach(item => {
                    const xy = this.mathCoordToViewCoord({
                        x: item.x,
                        y: item.y,
                    })
                    r7.push(xy.x, xy.y, specifiedColor.x/ 255, specifiedColor.y / 255, specifiedColor.z / 255, isSelected ? 1: 0)
                })
    
                p4 = [...p4, ...r7]
            }     
        }

        MoArray.forEach((item: Mo) => {
            switch (item.type) {
                case Types.Point:
                    addPointData((item as Point).data.xy, item.specifiedColor, item.isSelected, (item as Point).tag)
                    break;
                case Types.Equal:
                    fa.push((item as Equal))
                    break;
                case Types.Line:
                    addPointData((item as Line).data.p1, item.specifiedColor, item.isSelected, (item as Line).data.tag1)
                    addPointData((item as Line).data.p2, item.specifiedColor, item.isSelected, (item as Line).data.tag2)
                    addLineData((item as Line).data.p1, (item as Line).data.p2, item.specifiedColor, item.isSelected)
                    break
                case Types.Polygon:
                    const polygon = item as Polygon
                    for(let n = 0; n < polygon.data.length; n++) {
                        addPointData(polygon.data[n], polygon.specifiedColor, polygon.isSelected, '')
                        if(n < polygon.data.length - 1) {
                            addLineData(polygon.data[n], polygon.data[n + 1], polygon.specifiedColor, polygon.isSelected)
                        }
                    }
                    addLineData(polygon.data[polygon.data.length - 1], polygon.data[0], polygon.specifiedColor, polygon.isSelected)
                    addPolygonData(polygon.data, polygon.specifiedColor, polygon.isSelected,)
                    break
                default:
                    console.warn(`${item.type} is not supported yet`)
                    break;
            }
        })

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p1), gl.STATIC_DRAW);
        // 绘制背景
        switch (this.background) {
            case Types.Coordinate:
                this.switchProgram(this.map.get('coordinate'))
                const aPosition2 = gl.getAttribLocation(this.currentProgram, "a_Position");
                gl.vertexAttribPointer(aPosition2, 2, gl.FLOAT, false, SIZE * 2, 0);
                gl.enableVertexAttribArray(aPosition2)
                const resolution = gl.getUniformLocation(this.currentProgram, "u_Resolution");
                const uConfig = gl.getUniformLocation(this.currentProgram, "u_Config");
                const uTranslate = gl.getUniformLocation(this.currentProgram, 'u_Translate');
                gl.uniform2f(resolution, size.width, size.height);
                gl.uniform3f(uConfig, this.store.xStep, this.store.yStep, this.store.X);
                const translate = this.store.getTranslate();
                gl.uniform2f(uTranslate, translate.x / this.store.X, translate.y / (this.store.X * this.store.AS));
                gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
                break;
            default:
                break;
        }

        // 绘制所有函数
        renderEquals(gl, fa, this.store, isPicking)

        // 绘制所有线段
        if(p3.length > 0) {
            this.switchProgram(this.map.get('line'))
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p3), gl.STATIC_DRAW);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(p3Index), gl.STATIC_DRAW);
            setGlobalUniforms(this.gl, this.currentProgram, this.store, isPicking)
            renderLines(gl, this.currentProgram, p3Index.length)
        }

        // 绘制所有面
        if(p4.length > 0) {
            this.switchProgram(this.map.get('polygon'))
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p4), gl.STATIC_DRAW);
            setGlobalUniforms(this.gl, this.currentProgram, this.store, isPicking)
            renderPolygon(gl, this.currentProgram, polygonCount)
        }

        // 绘制所有顶点
        if(p2.length > 0) {
            this.switchProgram(this.map.get('point'))
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2), gl.STATIC_DRAW);
            setGlobalUniforms(this.gl, this.currentProgram, this.store, isPicking)
            renderPoints(gl, this.currentProgram, 0, p2.length / 6)
        }

        // 绘制顶顶点标示
        if(p5.length > 0) {
            this.switchProgram(this.map.get('ptext'))
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p5), gl.STATIC_DRAW);
            setGlobalUniforms(this.gl, this.currentProgram, this.store, isPicking)
            renderPointTexts(gl, this.currentProgram, 0, p5.length / 16)
        }
    }

    switchProgram(program: WebGLProgram) {
        if (program !== this.currentProgram) {
            this.currentProgram = program;
            this.gl.useProgram(this.currentProgram);
        }
    }
}