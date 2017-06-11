import {PropTypes, Component} from 'react';
import classnames from 'classnames';
//import {themr} from 'react-css-themr';
//import {INPUTS_CHECKED_SURROUNDED} from 'identifiers.js'
//import theme from './surroundedCheck.scss'
//import './surroundedCheck.scss'
//import './checkBox.scss'

function SurroundedCheck(props) {
    const {checked, /*theme ,*/ title, sign, onClick} = props;
    const theme = {
        __surroundedChecked: "surroundedCheck____surroundedChecked",
        surroundedCheck: "surroundedCheck__surroundedCheck",
        surroundedCheck_Sign: "surroundedCheck__surroundedCheck_Sign",
        surroundedCheck_Text: "surroundedCheck__surroundedCheck_Text",
        surroundedCheck_Title: "surroundedCheck__surroundedCheck_Title",

    }

    return (
        <div onClick={onClick} className={classnames(theme.surroundedCheck, {[theme.__surroundedChecked]: checked})}>
            <div className={theme.surroundedCheck_Text}>
                <h4 className={theme.surroundedCheck_Title}>{title}</h4>
                <p className={theme.surroundedCheck_Sign}>{sign}</p>
            </div>
        </div>
    )
}

SurroundedCheck.propTypes = {
    checked: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onClick: PropTypes.func,
    sign: PropTypes.string,
    theme: PropTypes.shape({
        __surroundedChecked: PropTypes.string,
        surroundedCheck: PropTypes.string,
        surroundedCheck_Text: PropTypes.string,
        surroundedCheck_Title: PropTypes.string,
        surroundedCheck_Sign: PropTypes.string
    })
}

export default /*themr(INPUTS_CHECKED_SURROUNDED, theme)(*/SurroundedCheck//)
