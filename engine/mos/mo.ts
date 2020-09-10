let c = 1;
/**
 * 数学基类
 *
 * @class Mo
 */
export default class Mo {
    id: string;
    type: Types;
    isSelected: boolean = false;
    specifiedColor: Vec3;
    data: any;
    constructor() {
        this.id = (Date.now() * Math.random()).toFixed(0);
        this.specifiedColor = {
            x: Math.floor(c / (65025)) % 255,
            y: Math.floor(c / 255) % 255,
            z: c % 255,
        }
        c += 100;
    }
}