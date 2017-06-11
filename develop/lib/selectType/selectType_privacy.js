import React from 'react';

import SelectType from 'lib/selectType/selectType';
import './SelectTypePrivacy.scss';


const theme = {
    active: "SelectTypePrivacy__active",
    checked: "SelectTypePrivacy__checked",
    dropArrow: "SelectTypePrivacy__dropArrow",
    scrollContainer: "SelectTypePrivacy__scrollContainer",
    selectType: "SelectTypePrivacy__selectType",
    selectTypeContainer: "SelectTypePrivacy__selectTypeContainer",
    selectTypeValue: "SelectTypePrivacy__selectTypeValue",
    selectTypeValues: "SelectTypePrivacy__selectTypeValues",
    selectTypeValues__withScroll: "SelectTypePrivacy__selectTypeValues__withScroll",
    selected: "SelectTypePrivacy__selected"
}

const my_scroll = {
    area: "scrollBarSelectType__area"
}

export default function privacySelectType(props) {
    return <SelectType my_scroll={my_scroll} scrollBarSelectType__area="scrollBarSelectType__area"
                       theme={theme} {...props}/>
}





