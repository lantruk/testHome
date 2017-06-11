import React, {PropTypes, Component} from 'react'
import Button from 'components/Buttons/index'
import {ModernizationArrow} from 'components/icons/interface_icons'
import {connect} from 'react-redux'
import {InputUserName} from 'components/InputUserName'
import {InputEmail} from 'components/InputEmail'
import {InputPhoneNumber} from 'components/InputPhoneNumber'
import {privacySelectType as SelectType} from 'lib/selectType';
import {startloader, stoploader, errorFromServer} from 'AC/profile'
import {acPaymentHistotry} from 'AC/devices'
import deviceMap from './deviceMap';
import createUpgradeOrder from 'middlewares/createUpgradeOrder';
import {
    FIRST_NAME,
    FIRST_NAME_ERR,
    LAST_NAME,
    LAST_NAME_ERR,
    EMAIL,
    EMAIL_ERR,
    PHONE,
    PHONE_ERR,
    DEVICES_ROUTE,
    PAYMENT_HISTORY_ROUT
} from '../../constants'


class Upgrade extends Component {

    static propTypes = {
        profile: PropTypes.object.isRequired,
        support_data: PropTypes.object.isRequired,
        devices: PropTypes.object.isRequired,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    constructor(props) {
        super()

        const {first_name, last_name, phone_number, email} = props.profile;

        const payment_types = props.support_data.payment_types

        this.payment_types = payment_types.map(pay => {
            return {
                label: pay.name,
                value: pay.id
            }
        })

        this.state = {
            [FIRST_NAME]: first_name,
            [LAST_NAME]: last_name,
            [EMAIL]: email,
            [PHONE]: phone_number,
            [FIRST_NAME_ERR]: '',
            [LAST_NAME_ERR]: '',
            [EMAIL_ERR]: '',
            [PHONE_ERR]: '',
            paymentMethod: 6

        }

    }

    setOnChangeCallback = (val, err) => (state) => {
        this.setState({
            [val]: state.value,
            [err]: state.error
        })
    }

    changePaymentMethod = (val) => {
        this.setState({
            paymentMethod: val
        })
    }


    goToPayment = () => {

        const {
            first_name, last_name, phone_number, email,
            first_name_err, last_name_err, email_err, phone_err, paymentMethod
        } = this.state;

        if (first_name_err || last_name_err || email_err || phone_err) {
            return
        }

        const updateOptions = {
            upgrade_type_id: this.props.devices.upgrade.upgradeTo.id,
            'payment_method_id': paymentMethod,
            'device_mac_address': this.props.devices.upgrade.upgradeFrom.mac,
            'user_email': email,
            'user_phone': phone_number
        }

        this.props.startloader()
        createUpgradeOrder(updateOptions, this.callbackUpgrade)
    }

    callbackUpgrade = (obj) => {
        if (obj.status == 200) {
            this.props.stoploader()
            this.props.acPaymentHistotry(obj.result.payment_history[0])
            this.context.router.push(DEVICES_ROUTE + PAYMENT_HISTORY_ROUT)
        } else {
            this.props.stoploader()
            this.props.errorFromServer(true)
        }

    }

    render() {
        const {
            first_name, last_name, phone_number, email,
            first_name_err, last_name_err, email_err, phone_err, paymentMethod
        } = this.state;

        const {to_type_id, unit_price} = this.props.devices.upgrade.upgradeTo;
        const {from_type_id} = this.props.devices.upgrade.upgradeFrom;

        return (
            <div className="deviceUpgrade">
                <div className="deviceUpgrade--Header">
                    <h2 className="deviceUpgrade--HeaderTitle">Апгрейд</h2>
                    <p className="deviceUpgrade--HeaderSign">Чтобы получить новые функции браслета — отправьте форму
                        заявки.</p>
                </div>
                <div className="deviceUpgrade-ItemRowGrow">
                    <div className="deviceUpgrade-ItemRow">
                        <h3 className="deviceUpgrade--ItemTitle">1. Условия</h3>
                        <div className="deviceUpgrade--InputWrap __deviceUpgrade--Conditions">
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--ModelTitle">Стартовая модель</div>
                                <div className="deviceUpgrade--ModelName">{deviceMap[from_type_id].name}</div>
                            </div>
                            <div className="deviceUpgrade--ModernizationArrowWrap">
                                <div className="deviceUpgrade--ModernizationArrow">
                                    <ModernizationArrow />
                                </div>
                            </div>
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--ModelTitle">Новая модель</div>
                                <div className="deviceUpgrade--ModelName">{deviceMap[to_type_id].name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="deviceUpgrade-ItemRow">
                        <h3 className="deviceUpgrade--ItemTitle">2. Данные</h3>
                        <div className="deviceUpgrade--InputWrap">
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--InputInnerWrap">
                                    <InputUserName onChange={this.setOnChangeCallback(FIRST_NAME, FIRST_NAME_ERR)}
                                                   error={first_name_err} value={first_name} firstName required/>
                                </div>
                            </div>
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--InputInnerWrap">
                                    {<InputUserName onChange={this.setOnChangeCallback(LAST_NAME, LAST_NAME_ERR)}
                                                    error={last_name_err} value={last_name} lastName required/>}
                                </div>
                            </div>
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--InputInnerWrap">
                                    {<InputEmail onChange={this.setOnChangeCallback(EMAIL, EMAIL_ERR)} error={email_err}
                                                 value={email} required/>}
                                </div>
                            </div>
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--InputInnerWrap">
                                    {<InputPhoneNumber onChange={this.setOnChangeCallback(PHONE, PHONE_ERR)}
                                                       error={phone_err} value={phone_number} required/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="deviceUpgrade-ItemRow">
                        <h3 className="deviceUpgrade--ItemTitle">3. Оплата</h3>
                        <div className="deviceUpgrade--InputWrap">
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--PaymentMethodTitle">Способ оплаты</div>
                                <div className="deviceUpgrade--PaymentMethodSelect">
                                    {<SelectType onChange={this.changePaymentMethod} source={this.payment_types}
                                                 value={paymentMethod}/>}
                                </div>
                            </div>
                            <div className="deviceUpgrade--Input">
                                <div className="deviceUpgrade--PaymentMethodDescription">К оплате принимаются банковские
                                    карты Visa и EuroCard/MasterCard. Платеж зачисляется в течение 15 минут.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deviceUpgrade-TotalScoreWrap">
                    <div className="deviceUpgrade-TotalScore">
                        <span className="deviceUpgrade-TotalScoreText">Итог</span><span
                        className="deviceUpgrade-TotalScorePrice">{unit_price}&nbsp;&#8381;</span>
                    </div>
                </div>
                <div className="deviceButton__allDevices">
                    <Button onClick={this.goToPayment} text="Создать заказ"
                            style={{lineHeight: "47px", width: "188px", fontSize: '18px' }}/>
                </div>
            </div>
        )
    }
}


export default connect(state => ({
    profile: state.profile.toJS(),
    support_data: state.support_data.toJS(),
    devices: state.devices.toJS()
}), {
    startloader,
    stoploader,
    acPaymentHistotry,
    errorFromServer
})(Upgrade)