import * as React from 'react'

interface LatexProps {
    text: string,
    top?: number,
    left?: number,
}

export default class Latex extends React.Component<LatexProps> {
    source = React.createRef<HTMLDivElement>();
    real = React.createRef<HTMLDivElement>();

    static defaultProps = {
        top: '0',
        left: '0',
    };

    componentDidMount() {
        const { text } = this.props
        window.katex.render(text, this.source.current, {
            throwOnError: false,
        });

        this.real.current.addEventListener('x-change', (M:{[key: string]: any}) => {
            setTimeout(() => {
                const { text } = this.props;
                let t = '';
                t = text.replace('\\text{a}', M.a);
                t = t.replace('\\text{b}', M.b);
                t = t.replace('\\text{c}', M.c);

                window.katex.render(t, this.real.current, {
                    throwOnError: false,
                });
            });
        });
    };

    render() {
        const { top, left } = this.props
        return <div className="latex-shower" style={{ transform: `translate(${left}, ${top})`}}>
            <div ref={this.source}>
                
            </div>
            <div ref={this.real}>

            </div>
        </div>
    }
} 