import React from 'react';

import {CategoryChanger as SelectType} from 'lib/selectType';
import {CALORIES, PRESSURE, WATER} from '../../constants';
import {BalanceIcon, PresureIcon, WaterIcon} from '../../components/icons/metric_icons'
import '../../lib/selectType/DiaryCategoryChanger.scss';


function Consumed() {
    return (
        <div className="diaryCategoryChanger--item">
            <div className="diaryCategoryChanger--itemIcon"><BalanceIcon /></div>
            <div className="diaryCategoryChanger--itemText">Потребленные калории</div>
        </div>
    )
}

function Pressure() {
    return (
        <div className="diaryCategoryChanger--item">
            <div className="diaryCategoryChanger--itemIcon"><PresureIcon /></div>
            <div className="diaryCategoryChanger--itemText">Давление</div>
        </div>
    )
}

function Water() {
    return (
        <div className="diaryCategoryChanger--item">
            <div className="diaryCategoryChanger--itemIcon"><WaterIcon /></div>
            <div className="diaryCategoryChanger--itemText">Вода</div>
        </div>
    )

}

const theme = {
    active: "SelectTypeCategoryChanger__active",
    checked: "SelectTypeCategoryChanger__checked",
    dropArrow: "SelectTypeCategoryChanger__dropArrow",
    selectType: "SelectTypeCategoryChanger__selectType",
    selectTypeContainer: "SelectTypeCategoryChanger__selectTypeContainer",
    selectTypeValue: "SelectTypeCategoryChanger__selectTypeValue",
    selectTypeValues: "SelectTypeCategoryChanger__selectTypeValues",
    selectTypeValues__withScroll: "SelectTypeCategoryChanger__selectTypeValues__withScroll",
    selected: "SelectTypeCategoryChanger__selected"

}

const scroll = {
    active: "DiaryCategoryChanger__active",
    dropArrow: "DiaryCategoryChanger__dropArrow",
    selectTypeContainer: "DiaryCategoryChanger__selectTypeContainer",
    selectTypeValue: "DiaryCategoryChanger__selectTypeValue",
    selectTypeValues: "DiaryCategoryChanger__selectTypeValues"
}

const source = [{
    value: CALORIES,
    label: Consumed
}, {
    //value: CALORIES,
    value: PRESSURE,
    label: Pressure
}, {
    value: WATER,
    label: Water
}];

export default function privacySelectType(props) {
    return <SelectType source={source} my_scroll={scroll} theme={theme} {...props}/>
}

