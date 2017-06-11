import React, {Component, PropTypes} from 'react';
import './selectType.scss';
import './DiaryCategoryChanger.scss';
import './scrollarea.scss';
import SelectTypeFactory from './selectType.js';

const themedSelectType = /*themr(SELECT_TYPE, theme)(*/SelectTypeFactory//);
const medcartSelectType = /*themr(SELECT_TYPE_MEDCART, theme2)(*/SelectTypeFactory//);
const privacySelectType = /*themr(SELECT_TYPE_MEDCART, theme3)(*/SelectTypeFactory//);
const CategoryChanger = /*themr(SELECT_TYPE_DIARY_CHANGER, theme4)(*/SelectTypeFactory//);

export default themedSelectType
export { medcartSelectType, privacySelectType, CategoryChanger }






