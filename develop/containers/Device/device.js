import Modernization from './modernization'
import React, {PropTypes, Component} from 'react'
import deviceMap, {STATUS_LOST, STATUS_NOTACTIVE, STATUS_GIVE} from './deviceMap'
import {IconMenu, MenuItem/*, MenuDivider*/} from 'lib/menu';
import {IconMenu_icon} from 'components/icons/interface_icons';


class Device extends Component {

    static propTypes = {
        device: PropTypes.object.isRequired,
        payment_history: PropTypes.array.isRequired,
        togglePopUp: PropTypes.func.isRequired
    }

    splitFunctionsToColumns(str) {
        const reg = /<li>.*?<\/li>/g;
        const minItemLengthInLeftCol = 4;
        const minLength = minItemLengthInLeftCol * 2;

        const allLi = str.match(reg);

        let firstColumn, secondColumn;
        
        if (allLi == undefined) {
            return ''
        }

        if (allLi.length < minLength) {
            firstColumn = allLi.slice(0, minItemLengthInLeftCol);
            secondColumn = allLi.slice(minItemLengthInLeftCol);
        } else {
            const half = Math.ceil(allLi.length / 2);
            firstColumn = allLi.slice(0, half);
            secondColumn = allLi.slice(half);
        }


        return <div className='deviceInfo--functionWrap'>
            <ul className="deviceInfo--optionsLeftColumn">{ firstColumn.map((str, i) =>
                <li key={i}>{ str.slice(4, -5) }</li>) }</ul>
            <ul className="deviceInfo--optionsRightColumn">{ secondColumn.map((str, i) =>
                <li key={i}>{ str.slice(4, -5) }</li>)}</ul>
        </div>
    }

    renderModernizations(props) {
        let {device, payment_history} = props

        if (device.available_upgrades && device.available_upgrades.length) {

            return device.available_upgrades.map((updateDevice)=>

                <Modernization
                    //model={this.props.model}
                    splitFunctionsToColumns={this.splitFunctionsToColumns}
                    key={device.device_id + updateDevice.id}
                    //navigate={this.props.navigate}
                    from_type_id={device.device_type_id}
                    mac={device.mac}
                    payment_history={payment_history}
                    updateDevice={updateDevice}/>)


        } else return null

        return null

    }


    render() {
        const {device} = this.props;

        const imageClassName = deviceMap[device.device_type_id].className,
            name = deviceMap[device.device_type_id].name,
        //server_sync = utils.formatDate(device.server_sync),
            mac = device.mac,
            state = device.state,
            ota_version = device.ota_version,
            battery = device.battery,
            functions = this.splitFunctionsToColumns(device.functions);

        const modernizations = this.renderModernizations({device: device, payment_history: this.props.payment_history});

        return (

            <div>
                <div className="devicePackagingWrapper">
                    <div className="deviceLastSynchronization">&#160;</div>
                    <div className={`devicePackaging--image ${imageClassName}`}></div>
                    <div className="deviceInfo">
                        <div className="deviceInfo--row">
                            <span className="deviceInfo--name">{ name }</span>
                        <span
                            className="deviceInfo--rightValue deviceInfo--rightValue__IndicatorBattery">{ battery }</span>
                        </div>
                        <div className="deviceInfo--row"><span>Идентификатор</span><span
                            className="deviceInfo--rightValue">{ mac }</span></div>
                        { device.device_type_id !== 13 ?
                            <div className="deviceInfo--row">
                                <span>Версия прошивки</span><span
                                className="deviceInfo--rightValue">{ ota_version }</span>
                            </div> : null
                        }

                         <div className="deviceInfo--row__otherDevice">
                                    <span className="statusDevice--text">Статус браслета</span>
                                        <span className="deviceInfo--rightValue"><span className="statusDevice--name">{deviceMap[state] }</span>
                                            <div className="otherDevices--editMenuWrap">
                                                <IconMenu icon={<IconMenu_icon />} className__Icon="editMenuWrap"
                                                          position='topRight' menuRipple>
                                                    <MenuItem onClick={this.props.togglePopUp(STATUS_GIVE, mac )}
                                                              value=''
                                                              caption='Подарен'/>
                                                    <MenuItem onClick={this.props.togglePopUp(STATUS_LOST, mac)}
                                                              value=''
                                                              caption='Потерян'/>
                                                    <MenuItem onClick={this.props.togglePopUp(STATUS_NOTACTIVE, mac)}
                                                              value=''
                                                              style={{'width':"185px"}} caption='Неактивен'/>
                                                </IconMenu>
                                            </div>
                                        </span>
                                </div>
                        {functions? <div className="deviceInfo--row deviceInfo--optionsWrapper">
                            <p className="deviceInfo--optionsInformation">Функционал</p>
                            { functions }
                        </div> : null}
                    </div>
                </div>

                {modernizations ? <div className="modernizatonText">Доступные апгрейды</div> : null }
                { modernizations }
            </div>
        )
    }
}


export default Device