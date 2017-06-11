import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Portal from '../hoc/Portal.js';
import './owerlay.scss'

class Overlay extends Component {
    static propTypes = {
        active: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        invisible: PropTypes.bool,
        onClick: PropTypes.func,
        onEscKeyDown: PropTypes.func
    };

    static defaultProps = {
        invisible: false
    };

    componentDidMount () {
        if (this.props.active) {
            this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
            //document.body.style.overflow = 'hidden';
        }
    }

    componentWillUpdate (nextProps) {
        /* if (nextProps.active && !this.props.active) document.body.style.overflow = 'hidden';
         if (!nextProps.active && this.props.active) document.body.style.overflow = '';*/
    }

    componentDidUpdate () {
        if (this.props.active && !this.escKeyListener) {
            this.escKeyListener = document.body.addEventListener('keydown', this.handleEscKey.bind(this));
        }
    }

    componentWillUnmount () {
        document.body.style.overflow = null;
        if (this.escKeyListener) {
            document.body.removeEventListener('keydown', this.handleEscKey);
            this.escKeyListener = null;
        }
    }

    handleEscKey (e) {
        if (this.props.active && this.props.onEscKeyDown && e.which === 27) {
            this.props.onEscKeyDown(e);
        }
    }

    render () {
        const { active, className, children, invisible, onClick, type } = this.props;
        const _className = classnames('overlay', {
            ['overlay__active']: active,
            ['overlay__invisible']: invisible,
            ['overlay__light']: type == 'light'
        }, className);

        return (
            <Portal>
                <div className={_className}>
                    <div className="overlay--backdrop" onClick={onClick} />
                    {children}
                </div>
            </Portal>
        );
    }
}

export default Overlay;
