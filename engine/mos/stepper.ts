// 步进器
import Types from '../base/types'
import Mo from './mo'

interface StepperData {
    name: string,
    max: number,
    min: number,
    value: number,
    step: number,
}

export default class Stepper extends Mo {
    type: Types = Types.Stepper
    data: StepperData
    constructor(props: StepperData) {
        super()
        this.data = props
    }
}