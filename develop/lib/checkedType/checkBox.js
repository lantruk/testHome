import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
//import {themr} from 'react-css-themr';
//import {CHECKBOX} from 'identifiers.js'
//import theme from './checkBox.scss'
import Check from './check.js'
import './profilePrivacy.scss'

class CheckedBox extends Component {


    render() {
        const {label, checked, disabled,/* theme,*/ onMouseDown} = this.props;
        const theme = {
            box: "checkBox__box",
            check: "checkBox__check",
            checked: "checkBox__checked",
            disabled: "checkBox__disabled",
            label: "checkBox__label"
        }
        return (
            <div onTouchStart={onMouseDown} onMouseDown={onMouseDown}
                 className={classnames(theme.box, {[theme.disabled]: disabled})}>
                <div className={theme.label}>{label || ''}</div>
                <Check theme={theme} checked={checked}/>
            </div>
        )

    }
}

export default /*themr(CHECKBOX, theme)(*/CheckedBox//)