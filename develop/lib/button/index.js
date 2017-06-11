/*

import { buttonFactory } from './Button.js';
import { iconButtonFactory } from './IconButton.js';
import FontIcon from '../font_icon/FontIcon.js';
import themedRippleFactory from '../ripple';

const Button = buttonFactory(themedRippleFactory({ centered: false }), FontIcon);
const IconButton = iconButtonFactory(themedRippleFactory({centered: true}), FontIcon);


export default Button

export Button
export IconButton
*/

import { BUTTON } from '../identifiers.js';
//import { themr } from 'react-css-themr';
import { buttonFactory } from './Button.js';
import { iconButtonFactory } from './IconButton.js';
import FontIcon from '../font_icon/FontIcon.js';
import themedRippleFactory from '../ripple';
import './button.scss';

const Button = buttonFactory(themedRippleFactory({ centered: false }), FontIcon);
const IconButton = iconButtonFactory(themedRippleFactory({centered: true}), FontIcon);
const ThemedButton = ()=>{BUTTON(Button)}//themr(BUTTON, theme)(Button);
const ThemedIconButton = ()=>{BUTTON(IconButton)} //themr(BUTTON, theme)(IconButton);

export default ThemedButton;
export { ThemedButton as Button };
export { ThemedIconButton as IconButton };

