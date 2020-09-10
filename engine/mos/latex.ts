// 步进器
import Types from '../base/types'
import Mo from './mo'

interface LatexData {
    text: string,
    top?: string,
    left?: string,
}

export default class Latex extends Mo {
    type: Types = Types.Latex
    data: LatexData
    constructor(props: LatexData) {
        super()
        this.data = props
    }
}