import React, {Component} from 'react'
//import { INPUT } from '../identifiers.js'; //'RTButton'
//import { themr } from 'react-css-themr';
import { inputFactory } from './Input.js';
import FontIcon from '../font_icon/FontIcon.js';
//import theme from './inputTextType.scss';

/*
const Input = inputFactory(FontIcon);
const ThemedInput = themr(INPUT, theme)(Input);

export default ThemedInput;
export { ThemedInput as Input };
*/



const inputClassic = (InputClassic) => class InputSelectClassic extends Component {
    render(){
        return(
            <InputClassic {...this.props} theme={{
                bar: "inputTextType__bar",
                counter: "inputTextType__counter",
                disabled: "inputTextType__disabled",
                error: "inputTextType__error",
                errored: "inputTextType__errored",
                filled: "inputTextType__filled",
                fixed: "inputTextType__fixed",
                hidden: "inputTextType__hidden",
                hint: "inputTextType__hint",
                icon: "inputTextType__icon",
                input: "inputTextType__input",
                inputElement: "inputTextType__inputElement",
                label: "inputTextType__label",
                link: "inputTextType__link",
                required: "inputTextType__required",
                withIcon: "inputTextType__withIcon"
            }}/>
        )
    }
}

const ThemedInput = inputClassic(inputFactory(FontIcon))
export default ThemedInput;