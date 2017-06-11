import React, {Component}from 'react'
//import { themr } from 'react-css-themr';
//import {PROGRESS_BAR} from '../identifiers.js';
import ProgressBar from './ProgressBar.js';
//import theme from './theme.scss';
//import './theme.scss';

const themeWater = (WaterProgresBaf) => class Water extends Component {

    render() {
        return (
            <WaterProgresBaf {...this.props} theme={{
        'buffer': "water__buffer",
        'circle': "water__circle",
        'circular': "water__circular",
        'circular-indeterminate-bar-dash': "water__circular-indeterminate-bar-dash",
        'circular-indeterminate-bar-rotate': "water__circular-indeterminate-bar-rotate",
        'colors': "water__colors",
        'indeterminate': "water__indeterminate",
        'linear': "water__linear",
        'linear-indeterminate-bar': "water__linear-indeterminate-bar",
        'multicolor': "water__multicolor",
        'path': "water__path",
        'value': "water__value"
   } }/>
        )
    }

}

const ThemedProgressBar = themeWater(ProgressBar)

export default ThemedProgressBar;
export {ThemedProgressBar as ProgressBar};


