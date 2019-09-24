import Mo from './mo';
import Types from '../base/types';

export default class Line extends Mo {
    data: { p1: Vec2, p2: Vec2, tag1?: string, tag2?: string };
    type: Types = Types.Line;
    tag: string;
    constructor(props: { p1: Vec2, p2: Vec2, tag1?: string, tag2?: string }) {
        super();
        this.data = props;
    }
}