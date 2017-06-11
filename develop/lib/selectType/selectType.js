import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import events from '../utils/events.js';
import Scroll from 'lib/cunstomScrollBar';

class SelectType extends Component {
    static propTypes = {
        allowBlank: PropTypes.bool,
        auto: PropTypes.bool,
        scroll: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        error: PropTypes.string,
        label: PropTypes.string,
        name: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        source: PropTypes.array.isRequired,
         theme: PropTypes.shape({
         selectTypeContainer: PropTypes.string,
         selectType: PropTypes.string,
         scrollContainer: PropTypes.string,
         selectTypeValues: PropTypes.string,
         selectTypeValue: PropTypes.string,
         dropArrow: PropTypes.string,
         selected: PropTypes.string,
         active: PropTypes.string
         }).isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    static defaultProps = {
        auto: true,
        className: '',
        allowBlank: true,
        disabled: false
    };

    state = {
        active: false,
        up: false
    };

    componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
            events.addEventsToDocument({touchstart: this.handleDocumentClick, mousedown: this.handleDocumentClick});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
            events.removeEventsFromDocument({
                touchstart: this.handleDocumentClick,
                mousedown: this.handleDocumentClick
            });
        }
    }

    componentWillUnmount() {
        if (this.state.active) {
            events.removeEventsFromDocument({
                touchstart: this.handleDocumentClick,
                mousedown: this.handleDocumentClick
            });
        }
    }

    close = () => {
        if (this.state.active) {
            this.setState({active: false});
        }
    }

    handleDocumentClick = (event) => {
        if (this.state.active && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
            this.setState({active: false});
        }
    };

    handleMouseDown = (event) => {
        events.pauseEvent(event);

        if (this.props.disabled) return;

        const client = event.target.getBoundingClientRect();
        const screen_height = window.innerHeight || document.documentElement.offsetHeight;
        const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
        if (this.props.onFocus) this.props.onFocus(event);
        this.setState({active: true, up});
    };

    handleSelect = (item, event) => {

        if (this.props.onBlur) this.props.onBlur(event);

        if (!this.props.disabled && this.props.onChange) {
            if (this.props.name) {
                event.target.name = this.props.name;
            }
            this.props.onChange(item, event);
            this.setState({active: false});
        }
    };

    getSelectedItem = () => {
        for (const item of this.props.source) {
            if (item.value === this.props.value) return item;
        }
        if (!this.props.allowBlank) {
            return this.props.source[0];
        }
    };


    renderValue(item, idx) {
         const {theme} = this.props;

        const isSelected = item.value === this.props.value;
        const className = classnames(theme.selectTypeValue, {[theme.selected]: isSelected});
        const ref = isSelected ? 'selectedValue' : null;

        const Label = item.label;
        //debugger
        return (
            <li key={idx} className={className} ref={ref} onMouseDown={this.handleSelect.bind(this, item.value)}>
                {typeof (item.label) === 'function' ? <Label /> : Label}
            </li>
        );
    }

    getScrollTopPosition() {
        const {values, selectedValue} = this.refs;

        const res = selectedValue ? selectedValue.offsetTop : 0;

        return res
    }


    renderValues(theme, source, scroll) {

        const values =
            <ul className={classnames(
            {[theme.selectTypeValues]: !scroll}, 
            {[theme.selectTypeValues__withScroll]: scroll })
            } ref='values'>
                {source.map(this.renderValue.bind(this))}
            </ul>;

        if (scroll) {
            const topPosition = this.getScrollTopPosition();

            return (
                <div className={classnames(theme.scrollContainer,{[theme.active]: this.state.active})}>
                    <Scroll theme={this.props.my_scroll } active={this.state.active} topPosition={topPosition}>
                        {values}
                    </Scroll>
                </div>
            )

        } else {
            return values
        }
    }

    render() {

        const {theme, source, scroll} = this.props;

        const selected = this.getSelectedItem();
        const className = classnames(theme.selectTypeContainer, {
            [theme.up]: this.state.up,
            [theme.active]: this.state.active,
            [theme.disabled]: this.props.disabled
        }, this.props.className);


        const Label = selected && selected.label;

        return (
            <div className={className}>
                <div className={theme.selectType} onMouseDown={this.handleMouseDown}>
                    <span>{selected && selected.label ? typeof selected.label === 'function' ?
                        <Label /> : Label : ''}</span><span className={theme.dropArrow}></span>
                </div>
                {this.renderValues(theme, source, scroll)}
            </div>
        );
    }
}

export default SelectType;


