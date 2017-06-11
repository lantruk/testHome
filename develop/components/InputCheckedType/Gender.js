import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
//import { themr } from 'react-css-themr';
//import { INPUTS_CHECKED_AND_SELECT } from 'identifiers.js'
import  '../InputSelectType/SelectAndCheckedInputType.scss'
//import { profile } from 'identifiers';
import {MALE, FEMALE} from '../../constants'
import Check from '../../lib/checkedType/check.js'
//const { MALE, FEMALE } = profile;

class Gender extends Component {

    static propTypes = {
        gender: PropTypes.oneOf([MALE, FEMALE]).isRequired,
        onChange: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            active: PropTypes.string,
            bodyItem: PropTypes.string,
            bodyItem__spacer: PropTypes.string,
            checked: PropTypes.string,
            checkedType: PropTypes.string,
            item: PropTypes.string,
            roundedItem: PropTypes.string,
            scrollContainer: PropTypes.string,
            selectTypeContainer: PropTypes.string,
            selectTypeValues: PropTypes.string
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.gender !== nextProps.gender) {
            return true
        } else return false
    }

    setGender = (gender) => {
        this.props.onChange(gender)
    }

    render() {
        const {/*theme,*/ gender} = this.props;

        const theme = {
            active: "SelectAndCheckedInputType__active",
            bodyItem: "SelectAndCheckedInputType__bodyItem",
            bodyItem__spacer: "SelectAndCheckedInputType__bodyItem__spacer",
            checked: "SelectAndCheckedInputType__checked",
            checkedType: "SelectAndCheckedInputType__checkedType",
            item: "SelectAndCheckedInputType__item",
            roundedItem: "SelectAndCheckedInputType__roundedItem",
            scrollContainer: "SelectAndCheckedInputType__scrollContainer",
            selectTypeContainer: "SelectAndCheckedInputType__selectTypeContainer",
            selectTypeValues: "SelectAndCheckedInputType__selectTypeValues"
        }
        return (
            <div className={theme.item}>
                <div onClick={this.setGender.bind(this, MALE)}>
                    <div
                        className={classnames(theme.bodyItem, theme.selectTypeContainer,{[theme.checked]: gender == MALE || false})}>
                        <Check theme={theme} checked={gender == MALE || false}/>
                    </div>
                    <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                    <div className={theme.bodyItem}>Мужской</div>
                </div>
                <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                <div onClick={this.setGender.bind(this, FEMALE)}>
                    <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                    <div
                        className={classnames(theme.bodyItem, theme.selectTypeContainer, {[theme.checked]: gender == FEMALE || false})}>
                        <Check theme={theme} checked={gender == FEMALE || false}/>
                    </div>
                    <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                    <div className={theme.bodyItem}>Женский</div>
                </div>
            </div>
        )

    }
}

function GenderOnlyRead(props) {
    const {gender, theme} = props;


    return (
        <div className={theme.item}>

            <div className={theme.bodyItem}>{gender == 1 ? 'Мужской' : gender == 2 ? 'Женский' : 'Не указано'}</div>

        </div>
    )

}

const ThemedGenderOnlyRead = /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/GenderOnlyRead//);

export default /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/Gender//);
export {ThemedGenderOnlyRead as GenderOnlyRead}
export {Gender}

