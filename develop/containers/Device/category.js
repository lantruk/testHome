import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import Device from "./device.js";
import Button from "../../components/Buttons/index";
import {DEVICES_ROUTE, BRACLETS_ROUT, TONOMETRS_ROUT} from '../../constants';
import NoBracelet from './noDeviceBracelets';
import {IconMenu, MenuItem/*, MenuDivider*/} from 'lib/menu';
import {IconMenu_icon} from 'components/icons/interface_icons';
import PopUp_changeStatus from './popUp_changeStatus';
import deviceMap, {STATUS_ACTIVE, STATUS_LOST, STATUS_NOTACTIVE, STATUS_GIVE} from './deviceMap';
//import editDeviceStatus from 'middlewares/editDeviceStatus';
import PopUp_activeStatus from './popUp_activeStatus';

import {acChangeStatus} from 'AC/devices';
import {checkFullFunctionality} from 'AC/profile';
import {startloader, stoploader} from 'AC/others';


class Category extends Component {

    static propTypes = {
        devices: PropTypes.object.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired
    };

    state = {
        isOpenPopUp: false, //поп ап для изменения статуса
        isActiveStatus: false, //поп ап если есть активный статус
        status: 'status',
        mac: 'mac',
        device: 'braceletes'
    };


    setNaviHandler = (goTo) => () => {
        if (!this.props.devices.tonometrs.length) {
            return
        }
        this.context.router.push(DEVICES_ROUTE + goTo)
    };


    goToShop() {
        window.location = "/shop/"
    };


    getDevicesFromType(model) {
        const allDevices = model;
        switch (this.context.router.params.category) {
            case BRACLETS_ROUT:
                return allDevices.bracelets;
            case TONOMETRS_ROUT:
                return allDevices.tonometrs;
            default:
                return []
        }
    };

    togglePopUp = (status, mac) => () => {
        if (status === STATUS_ACTIVE && this.props.devices[this.context.router.params.category].some((bracelet)=> bracelet.state === STATUS_ACTIVE)) {
            this.setState({
                isActiveStatus: !this.state.isActiveStatus
            })
        } else {
            this.setState({
                isOpenPopUp: !this.state.isOpenPopUp,
                status: status,
                mac: mac,
                device: this.context.router.params.category
            })
        }
    };

    toggleActiveStatus = ()=> {
        this.setState({
            isActiveStatus: !this.state.isActiveStatus
        })
    };

    changeStatus = () => {
        this.setState({
            isOpenPopUp: !this.state.isOpenPopUp,
            isLoading: true
        });

        this.props.startloader()
        this.props.acChangeStatus({state: this.state.status, mac: this.state.mac}, {
            onSuccess: (res) => {
                this.props.checkFullFunctionality()
            }

        })

        //

    };

    renderDevices(model) {
        const activeDevice = this.getDevicesFromType(model);
        const deviceStatusActive = activeDevice.filter((device)=> {
            return device.state == STATUS_ACTIVE
        });
        const otherDevicesArr = activeDevice.filter((device)=> {
            return device.state != STATUS_ACTIVE
        });

        if (activeDevice.length) { //если есть браслеты
            return (
                // отображение активного браслета, списка не активных и кнопок между ними
                <div>
                    {deviceStatusActive.length ?
                        <div><Device
                            device={deviceStatusActive[0]}
                            togglePopUp={this.togglePopUp}
                            payment_history={model.payment_history}
                        />
                            < div className="deviceButton__allDevices">
                                < Button onClick={this.goToShop}
                                         text="Смотреть все модели" type='grey'
                                         style={{lineHeight: '47px', padding: "0 45px"}}/>
                            </div>
                        </div> : null}
                    {otherDevicesArr.length ? this.otherDevices(otherDevicesArr) : null}
                    {deviceStatusActive.length ? null : < div className="deviceButton__allDevices">
                        < Button onClick={this.goToShop} text="Смотреть все модели" type='grey'
                                 style={{lineHeight: '47px', padding: "0 45px"}}/>
                    </div>}
                </div>
            )
        } else {
            switch (this.context.router.params.category) {
                case BRACLETS_ROUT:
                    //Когда заходим в браслеты и их нет, или последний убираем отразим страничку NoBracelet
                    return <NoBracelet />;
                case TONOMETRS_ROUT:
                    //Когда последнему тонометру ставить статус подарен, переходим на DEVICES_ROUTE
                    //Timeout нужен что-бы успел отработать popUp
                    setTimeout(()=> {
                        this.context.router.push(DEVICES_ROUTE)
                    }, 600);
                    return <div></div>
            }
        }
    }


    otherDevices = (otherDevicesArr) => {

        return (<div>

            <div className="otherDevices--informText">
                Дополнительные {this.context.router.params.category == BRACLETS_ROUT ? 'браслеты' : "тонометры"},
                привязанные к
                аккаунту
            </div>

            { otherDevicesArr.map((device)=> {

                return (
                    <div key={device.device_id} className="otherDevices">
                        <div className="devicePackagingWrapper devicePackagingWrapper__otherDevices">
                            <div
                                className={`devicePackaging--image ${deviceMap[device.device_type_id].className}`}></div>
                            <div className="deviceInfo__otherDevices">
                                <div className="deviceInfo--row">
                                        <span
                                            className="deviceInfo--name">{deviceMap[device.device_type_id].name }</span>
                        <span
                            className="deviceInfo--rightValue deviceInfo--rightValue__IndicatorBattery">{device.battery}</span>
                                </div>
                                <div className="deviceInfo--row"><span>Идентификатор</span><span
                                    className="deviceInfo--rightValue">{ device.mac }</span></div>
                                <div className="deviceInfo--row__otherDevice">
                                    <span className="statusDevice--text">Статус браслета</span>
                                        <span className="deviceInfo--rightValue">
                                            <span className="statusDevice--name">{deviceMap[device.state] }</span>
                                            <div className="otherDevices--editMenuWrap">
                                                <IconMenu icon={<IconMenu_icon />} className__Icon="editMenuWrap"
                                                          position='topRight' menuRipple>
                                                <MenuItem onClick={this.togglePopUp(STATUS_ACTIVE, device.mac)}
                                                          value=''
                                                          caption={deviceMap[STATUS_ACTIVE]}/>
                                                <MenuItem
                                                    onClick={this.togglePopUp(device.state === STATUS_LOST ? STATUS_NOTACTIVE  : STATUS_LOST , device.mac)}
                                                    value=''
                                                    caption={device.state === STATUS_LOST ? deviceMap[STATUS_NOTACTIVE]  : deviceMap[STATUS_LOST] }/>
                                                <MenuItem onClick={this.togglePopUp(STATUS_GIVE, device.mac)}
                                                          value=''
                                                          caption={deviceMap[STATUS_GIVE]} style={{'width': "185px"}}/>
                                            </IconMenu>
                                            </div>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>)
    };


    render() {

        const {tonometrs, bracelets, glukomters, pulsometrs, payment_history} = this.props.devices;

        return (

            <div className="deviceContentWrapper">

                <div className="deviceHeaderRowMenu">
                    <div onClick={this.setNaviHandler(BRACLETS_ROUT)} id="BraceletCategory"
                         className={'deviceHeaderRowMenu--Tab' + (this.props.router.params.category == 'bracelets' ? ' deviceHeaderRowMenu--Tab__Active' : '') }>
                        Браслеты
                    </div>
                    <div onClick={this.setNaviHandler(TONOMETRS_ROUT)} id="Tonometrs"
                         className={classnames('deviceHeaderRowMenu--Tab',{
                         ['deviceHeaderRowMenu--Tab__Active'] : this.context.router.params.category == 'tonometrs',
                         ['deviceHeaderRowMenu--DesabledTab'] : !tonometrs.length} )}>
                        Тонометры
                    </div>
                </div>
                {this.renderDevices({
                    bracelets: bracelets,
                    glukomters: glukomters,
                    pulsometrs: pulsometrs,
                    tonometrs: tonometrs,
                    payment_history: payment_history
                })}
                < PopUp_changeStatus
                    active={this.state.isOpenPopUp}
                    status={this.state.status}
                    editStatusFun={this.changeStatus}
                    close={this.togglePopUp(this.state.status, this.state.mac)}
                    isLoading={this.state.isLoading}
                />
                < PopUp_activeStatus active={this.state.isActiveStatus}
                                     close={this.toggleActiveStatus}/>
            </div>

        )
    }
}

export default connect(state => ({
        devices: state.devices.toJS()
    }),
    {
        acChangeStatus,
        startloader,
        stoploader,
        checkFullFunctionality,

    }
)(Category)

