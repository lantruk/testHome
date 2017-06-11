import { themr } from 'react-css-themr';
import { DROPDOWN } from '../identifiers.js';
import { dropdownFactory } from './Dropdown.js';
//import { Input } from '../input';
//import { Input } from '../input/inputSelectType.js';
import theme from './Dropdown.scss';

//const Dropdown = dropdownFactory(Input);
const Dropdown = dropdownFactory();
const ThemedDropdown = themr(DROPDOWN, theme)(Dropdown);

export default ThemedDropdown;
export { ThemedDropdown as Dropdown };
