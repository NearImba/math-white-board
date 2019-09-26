import { cw } from '../config'

export default class Store {
    /**
     *
     * x 横坐标最大长度
     * @type {number}
     * @memberof Store
     */
    private xMax: number = 5;

    private aspect: number = 1; // 高比宽，以宽为基准，跟普通的aspect不一样
    /**
     * 
     * x 坐标步长
     * @type {number}
     * @memberof Store
     */
    xStep: number = 1;

    /**
     *
     * y 坐标步长
     * @type {number}
     * @memberof Store
     */
    yStep: number = 1;

    /**
     *
     * 动态参数
     * @type {{
     *         a: number,
     *         b: number,
     *         c: number,
     *     }}
     * @memberof Store
     */
    private uniforms: {
        a: number,
        b: number,
        c: number,
    } = {
            a: 0,
            b: 0,
            c: 0,
        };

    /**
     *
     * 坐标偏移
     * @type {{
     *         x: number,
     *         y: number,
     *         z: number,
     *     }}
     * @memberof Store
     */
    private translate: {
        x: number,
        y: number,
    } = {
            x: 0.3,
            y: -0.2,
        };

    /**
     *
     * 实例大小
     * @type {{
     *         width: number,
     *         height: number,
     *     }}
     * @memberof Store
     */
    private size: {
        width: number,
        height: number,
    } = {
            width: 800,
            height: 600,
        };

    X: number;

    AS: number; // 高比宽，以宽为基准，跟普通的aspect不一样

    constructor() {
        function warn() {
            console.warn('you should never set this value directly');
        }

        Object.defineProperty(this, 'X', {
            set: warn,
            get: () => {
                return this.xMax;
            }
        })

        Object.defineProperty(this, 'AS', {
            set: warn,
            get: () => {
                return this.aspect;
            }
        })
    }

    setSize(size: { width?: number, height?: number }) {
        if (size.width) {
            this.size.width = size.width
            this.xMax = parseFloat((size.width / cw).toFixed(2))
        }

        if (size.height) {
            this.size.height = size.height
        }

        // 高比宽，以宽为基准，跟普通的aspect不一样
        this.aspect = this.size.height / this.size.width;
    }

    getSize(): { width: number, height: number } {
        return this.size;
    }

    setStep(step: { x?: number, y?: number }) {
        if (step.x) {
            this.xStep = step.x;
        }

        if (step.y) {
            this.yStep = step.y;
        }
    }

    getStep(): Vec2 {
        return {
            x: this.xStep,
            y: this.yStep,
        };
    }

    setTranslate(xy: { x: number, y: number }) {
        this.translate.x = xy.x;
        this.translate.y = xy.y;
    }

    getTranslate(): Vec2 {
        return {
            x: this.translate.x,
            y: this.translate.y,
        }
    }
}