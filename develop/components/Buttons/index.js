import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
import Ink from 'react-ink'


class Button extends Component {

    static propTypes = {
        text: PropTypes.string, // Сохранить
        type: PropTypes.oneOf(['grey']), // Цвет Злолото (по умолчанию) или Серый
        style: PropTypes.object,
        onClick: PropTypes.func // Переход в ...
       /* height: PropTypes.string, // height кнопки: 50px (можно em, ex, rem, px ...и др)
        width: PropTypes.string, // width кнопки: 150px (можно em, ex, rem, px ...и др)
        size: PropTypes.string // font-size текста: 50px (можно em, ex, rem, px ...и др)*/
    }

    static defaultProps = {
        style: {
            'padding': '14px 28px'
        }
    };

    onClickHandler = (e) => {
        if (this.props.onClick) this.props.onClick(e)
    }

    render() {
        const {text, type, style, children } = this.props;

        return (
            <div className="coreButton">
                <div onClick={this.onClickHandler}
                     style={style}
                     className={ classnames("coreButton--body", {['coreButton--body coreButton--body__grey']: type == 'grey'}) }>
                    { children }
                     {text}
                    <Ink background={false}/>
                </div>
            </div>
        )
    }

}


export default Button

