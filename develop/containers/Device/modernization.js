import React, {PropTypes, Component} from 'react';
import deviceMap, {STATUS_ACTIVE, STATUS_LOST, STATUS_NOTACTIVE, STATUS_GIVE} from './deviceMap'
import PriceButton from 'components/Buttons/priceButton';
import Button from 'components/Buttons';
import {connect} from 'react-redux'
import {
    DEVICES_ROUTE,
    UPGRADE_ROUT,
    PAYMENT_HISTORY_ROUT,
    DEVICE_STATUS_LOST,
    DEVICE_STATUS_BROKEN
} from '../../constants';
import {acUpgradeDevice} from 'AC/devices'


class Modernization extends Component {

    static propTypes = {
      devices : PropTypes.object.isRequired,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    naviToUpgrade = (hasPayment,from_type_id, mac, updateDevice) => (e) => {

        if (hasPayment) {
            this.context.router.push(DEVICES_ROUTE + PAYMENT_HISTORY_ROUT)
        } else {
            this.props.acUpgradeDevice({from_type_id, mac, updateDevice})
            this.context.router.push(DEVICES_ROUTE + UPGRADE_ROUT + '/' + this.props.mac)
        }
    }

    checkIsPaid() {

        const payments = this.props.payment_history

        const {mac, from_type_id, updateDevice} = this.props;

        return payments.some(payment => payment.device_mac_address === mac && payment.from_type_id === from_type_id && payment.to_type_id === updateDevice.to_type_id)

    }

    render() {

        const updateDevice = this.props.updateDevice;
        const {unit_price, description, new_features} = updateDevice;
        const functionsToColumns = this.props.splitFunctionsToColumns(new_features);
        const imageClassName = deviceMap[updateDevice.to_type_id].className;
        const name = deviceMap[updateDevice.to_type_id].name;
        const hasPaid = this.checkIsPaid();

        return (<div className="UpgradeWrap">
                <div className="devicePackagingWrapper">
                    <div className={`devicePackaging--image ${imageClassName}`}></div>
                    <div className="deviceInfo">
                        <div className="deviceInfo--row deviceInfo--row__upgrade">
                            <span className="deviceInfo--name">{ name }</span>
                            <div onClick={this.naviToUpgrade(hasPaid,this.props.from_type_id, this.props.mac, updateDevice)} className="deviceButton__upgrade">
                                {hasPaid ?
                                    <Button style={{lineHeight:'42px', padding: '0 28px', fontSize: '14px'}}
                                            text="В корзине"/> :
                                    <PriceButton price={unit_price.split('.')[0]}/>}
                            </div>
                        </div>
                        <div className="deviceInfo--row deviceInfo--optionsWrapper ">
                            <p className="deviceInfo--optionsInformation deviceInfo--optionsInformation__upgrade">{ description }</p>
                            <p className="deviceInfo--UpgradeTitle">Функции, которые вы получите после апгрейда:</p>
                            <div
                                className='deviceInfo--optionsLeftColumn deviceInfo--optionsLeftColumn__upgrade'>{ functionsToColumns }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    devices: state.devices.toJS()
}),{
    acUpgradeDevice
})(Modernization)