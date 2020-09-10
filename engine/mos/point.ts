import Mo from './mo';
import Types from '../base/types';

export default class Point extends Mo {
    data: { xy: Vec2, tag : string };
    tag: string;
    constructor(props: { xy: Vec2, tag : string }) {
        super();
        this.data = props;
        this.type = Types.Point;
        this.tag = props.tag;
    }
}