import { steps } from '../config'
const renderSafeSpacing = [180, 260];

export default class Store {
    /**
     *
     * x 横坐标最大长度
     * @type {number}
     * @memberof Store
     */
    private xMax: number = 5;

    private stepIndex: number = 2;

    private n: number = 0; // 最多多少根线

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
    private uniforms: { [key: string]: number } = {
        a: 1,
        b: 1,
        c: 1,
        d: 1,
        m: 1,
        n: 1,
        p: 1,
        q: 1,
        r: 1,
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
    private translate: Vec2 = {
        x: 0.0,
        y: 0,
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

    N: number;

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

        Object.defineProperty(this, 'N', {
            set: warn,
            get: () => {
                return this.n;
            }
        })
    }

    setSize(size: { width?: number, height?: number }) {
        if (size.width) {
            this.size.width = size.width
        }

        if (size.height) {
            this.size.height = size.height
        }

        // 高比宽，以宽为基准，跟普通的aspect不一样
        this.aspect = this.size.height / this.size.width;
        this.n = Math.floor(this.size.width / renderSafeSpacing[this.stepIndex % 2]);
        this.xMax = this.size.width * 0.5 / renderSafeSpacing[this.stepIndex % 2] * steps[this.stepIndex];
    }

    setZoomIndex(n: number) {
        if(steps[n]) {
            this.stepIndex = n;
            this.n = Math.floor(this.size.width / renderSafeSpacing[this.stepIndex % 2]);
            this.xMax = this.size.width * 0.5 / renderSafeSpacing[this.stepIndex % 2] * steps[this.stepIndex];
        } else {
            console.error('zoom index out of range')
        }
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

    setTranslate(xy: Vec2) {
        this.translate.x = xy.x;
        this.translate.y = xy.y;
    }

    getTranslate(): Vec2 {
        return {
            x: this.translate.x,
            y: this.translate.y,
        }
    }

    setUniforms(data: { [key: string]: number }) {
        for (let k in data) {
            if (Object.prototype.hasOwnProperty.call(this.uniforms, k)) {
                this.uniforms[k] = data[k]
            }
        }
    }

    getUniforms() {
        return this.uniforms;
    }
}