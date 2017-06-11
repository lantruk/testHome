//import { AUTOCOMPLETE } from '../identifiers.js';
//import { themr } from 'react-css-themr';
import {autocompleteFactory} from './Autocomplete.js';
import React, {Component}from 'react'
import Chip from '../chip';
import Input from '../input';
//import theme from './autocomplete.scss';
import './autocomplete.scss';
const Autocomplete = autocompleteFactory(Chip, Input);

const theme = {
    __inScroll: "autocomplete____inScroll",
    active: "autocomplete__active",
    autocomplete: "autocomplete__autocomplete",
    focus: "autocomplete__focus",
    input: "autocomplete__input",
    label: "autocomplete__label",
    scrollContainer: "autocomplete__scrollContainer",
    suggestion: "autocomplete__suggestion",
    suggestions: "autocomplete__suggestions",
    up: "autocomplete__up",
    value: "autocomplete__value",
    values: "autocomplete__values"

}
//area: "scrollBarAutocomlete__area"


const TAutocomplete = (Profautocomp)=> class Kasldkjs extends Component {

    render() {
        return (
            <Profautocomp {...this.props} theme={theme}/>
        )
    }
}


//const ThemedAutocomplete = themr(AUTOCOMPLETE, theme)(Autocomplete);
const ThemedAutocomplete = TAutocomplete(Autocomplete);

export default ThemedAutocomplete;
export {ThemedAutocomplete as Autocomplete};
