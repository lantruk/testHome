import React, {PropTypes, Component} from 'react';
import {DEVICES_ROUTE,BRACLETS_ROUT, TONOMETRS_ROUT, DEVICE_STATUS_LOST, DEVICE_STATUS_BROKEN} from '../../constants.js';
import {connect} from 'react-redux'
import { Devices_bracelet_SVG, Devices_tonometr_SVG } from 'components/icons/interface_icons'

class CategoryMenu extends Component {

    static propTypes = {
        devices: PropTypes.object.isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    getConnectText(arr) {
        const length = arr.length;

        if (length) {
            return length + (length == 1 ? ' подключен' : ' подключено' )
        } else {
            return 'не подключены'
        }
    }

    setNaviHandler = (rout) => () => {

        if (rout === TONOMETRS_ROUT && !this.props.devices.tonometrs.length) {
            return
        }

        this.context.router.push(DEVICES_ROUTE + rout)

    }

    goToShop() {
        window.open("https://onetrak.ru/shop/");
        
    }

    render() {
        const devices = this.props.devices;


        return (
            <div className="deviceContentWrapper">
                <div className="MainDevicesInfo">
                    <div className="MainDevicesInfo--textMyDevices">Мои устройства</div>
                </div>
                <div className="MainDeviceCategoryRow">
                    <div onClick={this.setNaviHandler(BRACLETS_ROUT)} id="BraceletCategory" className="MainDeviceItem">
                        <div className="MainDeviceItem--innerWrap">
                            <p>Браслеты</p>
                            <div className="MainDeviceItem--Image downloadIcon__reduxBracelet"><Devices_bracelet_SVG /></div>
                            <div
                                className="connectDevice">{this.getConnectText(devices.bracelets)}</div>
                        </div>
                    </div>
                    <div onClick={this.setNaviHandler(TONOMETRS_ROUT)} id="Tonometrs" className="MainDeviceItem ">
                        <div className="MainDeviceItem--innerWrap">
                            <p>Тонометры</p>
                            <div className="MainDeviceItem--Image downloadIcon__reduxTonometr"><Devices_tonometr_SVG /> </div>
                            <div className="connectDevice">{this.getConnectText(devices.tonometrs)}</div>
                        </div>
                    </div>
                </div>
                {!devices.bracelets.length ? <div className="scoreOneTrackTransition">
                    <div onClick={this.goToShop} className="scoreOneTrackTransition--button">
                        <p>Нет устройства ONETRAK?<span>&#8194;Купить&#160;в&#160;официальном&#160;интернет&#8209;
                            магазине</span></p>
                    </div>
                </div> : null}
            </div>

        )
    }
}

export default connect(state => ({
    devices: state.devices.toJS()
}))(CategoryMenu)
