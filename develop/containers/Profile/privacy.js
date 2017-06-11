import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import classnames from 'classnames';
//import SelectType from 'selectType';
import SelectType from '../../lib/selectType/selectType_privacy';
import CheckBox from '../../lib/checkedType/checkBox.js';
import SaveButton from '../../components/Buttons/profile_save_button'
//import { profile } from 'identifiers';
//import { privacy } from 'identifiers';
//import savePrivacy from 'middlewares/savePrivacy.js';
import {ACCOUNT, MEDCART, METRICS, FRIENDS, FAMILY, COLLEAGUES} from '../../constants'
/*const { ACCOUNT, MEDCART, METRICS } = profile;
 const {  FRIENDS, FAMILY, COLLEAGUES } = privacy;*/


const source = [{
    label: 'Никто',
    value: 1
}, {
    label: 'Все друзья',
    value: 2
}, {
    label: 'Все',
    value: 3
}];


class Privacy extends Component {

    static propTypes = {
        model: React.PropTypes.object.isRequired,
        isUnfilled: React.PropTypes.bool,
        goNext: React.PropTypes.func,
        onSaveMessage: React.PropTypes.func,
        toggleLoader: React.PropTypes.func
    }


    constructor(props) {
        super()

        const access = props.model.access;

        const account_val = this.converValue(access.PROFILE.access_value);
        const medcart_val = this.converValue(access.MEDICAL_CARD.access_value);
        const metrics_val = this.converValue(access.METRICS.access_value);

        this.state = {
            [ACCOUNT]: {
                value: account_val,
                values: this.getValuesFromIds(account_val, access.PROFILE.group_ids)
            },
            [MEDCART]: {
                value: medcart_val,
                values: this.getValuesFromIds(medcart_val, access.MEDICAL_CARD.group_ids)
            },
            [METRICS]: {
                value: metrics_val,
                values: this.getValuesFromIds(metrics_val, access.METRICS.group_ids)
            }
        }
    }

    componentWillUnmount() {
        /*  this.xhr = undefined

         clearTimeout(this.mesTimer)*/
    }

    converValue(val) {
        switch (val) {
            case 'ALL' :
                return 3;
            case 'ONLY_ACCEPT':
                return 2;
            case 'NOBODY' :
                return 1
        }
    }

    getValuesFromIds(value, values) {

        if (value !== 2) {
            return {
                [FRIENDS]: true,
                [FAMILY]: true,
                [COLLEAGUES]: true
            }
        } else {
            return {
                [FRIENDS]: values.some(i => i == 1),
                [FAMILY]: values.some(i => i == 2),
                [COLLEAGUES]: values.some(i => i == 3)
            }
        }
    }

    onChangeGroup(point, checkboxType) {

        let newProp = Object.assign({}, this.state[point]),
            val = newProp.values[checkboxType];

        newProp.values[checkboxType] = !val

        this.setState({
            [point]: newProp
        })
    }

    renderCheckBox(point) {

        if (this.state[point].value == 2) {

            const groups = this.state[point].values;

            return (
                <div className="privacyPoint--CheckBox">
                    <CheckBox onMouseDown={this.onChangeGroup.bind(this, point, FAMILY)} label={'Семья'}
                              checked={groups[FAMILY]}/>
                    <CheckBox onMouseDown={this.onChangeGroup.bind(this, point, FRIENDS)} label={'Друзья'}
                              checked={groups[FRIENDS]}/>
                    <CheckBox onMouseDown={this.onChangeGroup.bind(this, point ,COLLEAGUES)} label={'Коллеги'}
                              checked={groups[COLLEAGUES]}/>
                </div>
            )
        } else return null

    }

    onChange = (point, value) => {

        let prop = Object.assign({}, this.state[point]);
         prop.value = value

         this.setState({
         [point]: prop
         })

    }

    verifyAndSave = () => {

        const callback = this.props.isUnfilled ? this.props.goNext : (...arg)=> {
            this.props.onSaveMessage(...arg)
        }

        console.info('--------сохранили')
        //savePrivacy.call(this, callback)
    }

    render() {
        const isUnfilled = this.props.isUnfilled;


        return (

            <section className={"profileContentContainer" + (isUnfilled ? ' __unfilled' : '') +  ' __flexBox'}>
                <article className="privacyPoint">
                    <div className="privacyPoint--innerWrap">
                        <h3 className="privacyPoint--header">Кто видит мой аккаунт:</h3>
                        <SelectType onChange={this.onChange.bind(this, ACCOUNT)} source={source}
                                    value={this.state[ACCOUNT].value}/>
                        {this.renderCheckBox(ACCOUNT)}
                    </div>
                </article>
                <article className="privacyPoint">
                    <div className="privacyPoint--innerWrap">
                        <h3 className="privacyPoint--header">Кто видит мою медкарту:</h3>
                        <SelectType onChange={this.onChange.bind(this, MEDCART)} source={source}
                                    value={this.state[MEDCART].value}/>
                        {this.renderCheckBox(MEDCART)}
                    </div>
                </article>
                <article className="privacyPoint __lastPrivacyPoint">
                    <div className="privacyPoint--innerWrap">
                        <h3 className="privacyPoint--header">Кто видит мои метрики:</h3>
                        <SelectType onChange={this.onChange.bind(this, METRICS)} source={source}
                                    value={this.state[METRICS].value}/>
                        {this.renderCheckBox(METRICS)}
                    </div>
                </article>
                <div className="profileSaveButtonWrap">
                    <SaveButton onClick={this.verifyAndSave} next={isUnfilled}/>
                </div>
            </section>
        )
    }

}

export default connect(state => ({
    model: state.profile.toJS(),
    isUnfilled: state.profile.getIn(['profileVerify', 'isMistake']),
}), {})(Privacy)

