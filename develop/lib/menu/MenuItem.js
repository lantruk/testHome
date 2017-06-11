import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
//import {themr} from 'react-css-themr';
//import {MENU} from '../identifiers.js';
import FontIcon from '../font_icon/FontIcon.js';

import rippleFactory from '../ripple/Ripple.js';

const factory = (ripple) => {
    class MenuItem extends Component {
        static propTypes = {
            caption: PropTypes.string,
            children: PropTypes.any,
            className: PropTypes.string,
            disabled: PropTypes.bool,
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            onClick: PropTypes.func,
            selected: PropTypes.bool,
            shortcut: PropTypes.string,

        };

        static defaultProps = {
            className: '',
            disabled: false,
            selected: false
        };

        handleClick = (event) => {
            if (this.props.onClick && !this.props.disabled) {
                this.props.onClick(event, this);
            }
        };

        render() {
            const {icon, caption, children, shortcut, selected, disabled, ...others} = this.props;
            const themee = {
                active: "menu__active",
                bottomLeft: "menu__bottomLeft",
                bottomRight: "menu__bottomRight",
                caption: "menu__caption",
                disabled: "menu__disabled",
                icon: "menu__icon",
                iconMenu: "menu__iconMenu",
                menu: "menu__menu",
                menuDivider: "menu__menuDivider",
                menuInner: "menu__menuInner",
                menuItem: "menu__menuItem",
                outline: "menu__outline",
                ripple: "ripple__ripple menu__ripple",
                rippleActive: "ripple__rippleActive",
                rippleRestarting: "ripple__rippleRestarting",
                rippleWrapper: "ripple__rippleWrapper",
                rippled: "menu__rippled",
                selected: "menu__selected",
                shortcut: "menu__shortcut",
                static: "menu__static",
                toggle: "menu__toggle",
                topLeft: "menu__topLeft",
                topRight: "menu__topRight"
            }

            const className = classnames(themee.menuItem, {
                [themee.selected]: selected,
                [themee.disabled]: disabled
            }, this.props.className);

           // debugger
            return (

                <li {...others} data-react-toolbox='menu-item' className={className} onClick={this.handleClick}>
                    {icon ? <FontIcon value={icon} className={themee.icon}/> : null}
                    <span className={themee.caption}>{caption}</span>
                    {shortcut ? <small className={themee.shortcut}>{shortcut}</small> : null}
                    {children}
                </li>
            );
        }
    }

    return ripple(MenuItem);
};

const MenuItem = factory(rippleFactory({}));
//export default themr(MENU)(MenuItem);
export {factory as menuItemFactory};
export {MenuItem};
