declare interface MStore {
    /**
     *
     * x 横坐标最大长度
     * @type {number}
     * @memberof Store
     */
    xMax?: number;

    /**
     * 
     * x 坐标步长
     * @type {number}
     * @memberof Store
     */
    xStep?: number;

    /**
     *
     * y 坐标步长
     * @type {number}
     * @memberof Store
     */
    yStep?: number;

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
    uniforms?: {
        a: number,
        b: number,
        c: number,
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
    translate?: {
        x: number,
        y: number,
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
    size?: {
        width: number,
        height: number,
    };
}