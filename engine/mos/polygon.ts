import Mo from './mo';
import Types from '../base/types';

export default class Polygon extends Mo {
    data: Array<Vec2>;
    tag: string;
    constructor(props: Array<Vec2>) {
        super();
        this.data = props;
        this.type = Types.Polygon;
    }
}