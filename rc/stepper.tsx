import * as React from 'react'

interface StepperProps {
    name: string,
    value: number,
    max: number,
    min: number,
    top?: number,
    left?: number,
    right?: number,
    bottom?: number,
    onChange?: Function,
    step: number,
}

export default class Stepper extends React.Component<StepperProps> {
    state = {
        value: this.props.value,
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if(value) {
            this.setState({
                value,
            }, () => {
                if(this.props.onChange) {
                    this.props.onChange(this.props.name, value)
                }
            })
        }
        
    }

    render() {
        const { max, min, step, name } = this.props
        const { value } = this.state
        return <div className="stepper">
            <p>
                {name} = {value}
            </p>
            <input type="range" onChange={this.onInputChange} min={min} max={max} value={value} step={step} />
        </div>
    }
} 