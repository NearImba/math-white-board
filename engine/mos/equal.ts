import Mo from './mo';
import Types from '../base/types';

export default class Equal extends Mo {
    data: string;
    constructor(props: string) {
        super();
        this.data = props;
        this.type = Types.Equal;
    }
}