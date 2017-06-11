import React from 'react';

import SelectType from 'lib/selectType/selectType';
import './SelectTypeMedcart.scss';


const theme = {
    active: "SelectTypeMedcart__active",
    checked: "SelectTypeMedcart__checked",
    dropArrow: "SelectTypeMedcart__dropArrow",
    scrollContainer: "SelectTypeMedcart__scrollContainer",
    selectType: "SelectTypeMedcart__selectType",
    selectTypeContainer: "SelectTypeMedcart__selectTypeContainer",
    selectTypeValue: "SelectTypeMedcart__selectTypeValue",
    selectTypeValues: "SelectTypeMedcart__selectTypeValues",
    selectTypeValues__withScroll: "SelectTypeMedcart__selectTypeValues__withScroll",
    selected: "SelectTypeMedcart__selected"
}

const my_scroll = {
    area: "scrollBarSelectType__area"
}

export default function privacySelectType(props) {
    return <SelectType my_scroll={my_scroll} scrollBarSelectType__area="scrollBarSelectType__area"
                       theme={theme} {...props}/>
}





