export default class Store implements MStore {
    /**
     *
     * x 横坐标最大长度
     * @type {number}
     * @memberof Store
     */
    xMax: number = 8.2;

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
    uniforms: {
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
    translate: {
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
    size: {
        width: number,
        height: number,
    } = {
            width: 600,
            height: 400,
        };

    setSize(size: { width?: number, height?: number }) {
        if (size.width) {
            this.size.width = size.width
        }

        if (size.height) {
            this.size.height = size.height
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