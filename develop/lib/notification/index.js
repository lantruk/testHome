import { Component, PropTypes } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames'
import theme from './notification.scss';
import { NOTIFICATION } from '../identifiers.js';


const SHOWING_TIME = 2000;
const ANIM_TIME = 1000;//Должно быть как в CSS duration

class Notification extends Component {

    static propTypes = {
        startAnim: PropTypes.bool.isRequired,//Моммент начала анимации
        onStart: PropTypes.func.isRequired,//После старта нужнор делать startAnim = false
        onEnd: PropTypes.func.isRequired//момент удаления из DOM
    }

    componentWillReceiveProps(next) {
        if (next.startAnim) {
            this.reset()
        }
    }

    componentDidMount() {
        if(this.props.startAnim) this.start()
    }

    componentWillUnmount(){
        window.removeEventListener('mousedown', this.close)

        this.closeTimeout && clearTimeout(this.closeTimeout)
        this.removeTimeout && clearTimeout(this.removeTimeout)
    }

    start = () => {
        this.refs.container.classList.add(this.props.theme.fadeOutDown)

        //В onStart необходимо сбросить startAnim = false чтобы при следующим срабатываении перезапустить анимацию
        this.props.onStart && this.props.onStart()

        this.closeTimeout = setTimeout(this.close, SHOWING_TIME)

        window.addEventListener('mousedown', this.close)

    }

    reset = () => {
        window.removeEventListener('mousedown', this.close)

        const {fadeOutDown, fadeOutUp} = this.props.theme;

        this.refs.container.classList.remove(fadeOutDown)
        this.refs.container.classList.remove(fadeOutUp)

        this.closeTimeout && clearTimeout(this.closeTimeout)
        this.removeTimeout && clearTimeout(this.removeTimeout)


        this.start()
    }

    close = () => {
        this.closeTimeout && clearTimeout(this.closeTimeout)

        const {fadeOutDown, fadeOutUp} = this.props.theme;
        this.refs.container.classList.add(fadeOutUp)
        this.refs.container.classList.remove(fadeOutDown)

        window.removeEventListener('mousedown', this.close)
        this.removeTimeout = setTimeout(this.props.onEnd, ANIM_TIME)
    }

    render() {
        const { theme, text, type } = this.props;

        return (
            <div ref="container" className={classnames(theme.container, {[theme.success]: type == 'success'},  {[theme.error]: type == 'error'})}>
                <h3 className={theme.header}>{text}</h3>
            </div>
        )
    }

}


const themedNotification = themr(NOTIFICATION, theme)(Notification);

export default themedNotification
