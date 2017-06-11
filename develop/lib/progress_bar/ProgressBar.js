import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
//import { themr } from 'react-css-themr';
//import { PROGRESS_BAR } from '../identifiers.js';
import prefixer from '../utils/prefixer.js';

class ProgressBar extends Component {
    static propTypes = {
        buffer: PropTypes.number,
        className: PropTypes.string,
        max: PropTypes.number,
        min: PropTypes.number,
        mode: PropTypes.oneOf(['determinate', 'indeterminate']),
        multicolor: PropTypes.bool,
        color: PropTypes.string,
        theme: PropTypes.shape({
            buffer: PropTypes.string,
            circle: PropTypes.string,
            circular: PropTypes.string,
            indeterminate: PropTypes.string,
            linear: PropTypes.string,
            multicolor: PropTypes.string,
            path: PropTypes.string,
            value: PropTypes.string,
            onStartAnim: PropTypes.string
        }),
        type: PropTypes.oneOf(['linear', 'circular']),
        value: PropTypes.number
    };

    static defaultProps = {
        buffer: 0,
        className: '',
        max: 100,
        min: 0,
        mode: 'indeterminate',
        multicolor: false,
        type: 'linear',
        value: 0
    };

    state = {
        startAnim: false
    }

    componentDidMount(){
        setTimeout(()=>{ this.setState({startAnim: true}) }, 0)
    }

    calculateRatio(value) {
        if (value < this.props.min) return 0;
        if (value > this.props.max) return 1;
        return (value - this.props.min) / (this.props.max - this.props.min);
    }

    circularStyle() {
        if (this.props.mode !== 'indeterminate') {
            return {strokeDasharray: `${2 * Math.PI * 25 * this.calculateRatio(this.props.value)}, 400`};
        }
    }

    linearStyle() {

        if (this.props.mode !== 'indeterminate') {


            return {
                buffer: prefixer({width: this.state.startAnim ? `${this.props.buffer}%` : '0'}),
                //buffer: prefixer({transform: `scaleX(${this.calculateRatio(this.props.buffer)})`}),
                value: prefixer({
                    width: this.state.startAnim ? `${this.props.value}%` : '0',
                    backgroundColor: this.props.color || ''
                })
                //value: prefixer({transform: `scaleX(${this.calculateRatio(this.props.value)})`})
            };
        } else {
            return {};
        }
    }

    renderCircular() {
        return (
            <svg className={this.props.theme.circle}>
                <circle className={this.props.theme.path} style={this.circularStyle()} cx='15' cy='15' r='12'/>
            </svg>
        );
    }

    renderLinear() {
        const {buffer, value} = this.linearStyle();
        return (
            <div>
                <span ref='buffer' data-ref='buffer' className={this.props.theme.buffer} style={buffer}></span>
                <span ref='value' data-ref='value' className={this.props.theme.value} style={value}></span>
            </div>
        );
    }

    render() {
        const { className, max, min, mode, multicolor, type, theme, value } = this.props;
        const _className = classnames(theme[type], {
            [theme[mode]]: mode,
            [theme.multicolor]: multicolor
        }, className);

        return (
            <div
                data-react-toolbox='progress-bar'
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                className={_className}
                >
                {type === 'circular' ? this.renderCircular() : this.renderLinear()}
            </div>
        );
    }
}

export default /*themr(PROGRESS_BAR)(*/ProgressBar//);
export { ProgressBar };
