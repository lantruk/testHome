import React, {PropTypes, Component} from 'react';
import Button from '../../components/Buttons/index'
import {connect} from 'react-redux'


class NoDeviceBracelets extends Component {

    static propTypes = {
        // support_data: PropTypes.object.isRequired
    }


    getPrice = (num) => {
        let price = '';

        const {support_data} = this.props
        support_data.device_prices.forEach((obj)=> {
            if (obj.device_type_id == num) price = obj.unit_price
        })

        return price.split('.')[0] + ' ₽'
    }


    goTo = (where) => () => {
        switch (where) {
            case 'Shop':
                return window.location = "/shop/";
            case 'AppStore':
                return window.location = "https://itunes.apple.com/ru/app/onetrak/id897447836?mt=8";
            case 'PlayMarket':
                return window.location = "https://play.google.com/store/apps/details?id=com.stardreams.onetracklife&hl=ru";
            case 'YandexMarket':
                return window.location = "https://store.yandex.ru/";
        }
    }

    render() {

        return (
            <div>
                <div className="notDevicesInfo"> Если у вас есть устройство – перейдите в мобильное приложение и
                    подключите устройство, чтобы оно отображалось в веб-приложении и обновите страницу. Или начните
                    пользоваться устройством ONETRAK, приобретя его в нашем интернет-магазине.
                </div>
                <div className="notDevicesWrap">
                    <div className="devicePackagingWrapper devicePackagingWrapper__notDevices">
                        <div
                            className="devicePackaging--image notDevices--image devicePackaging--image__SPORT"></div>
                        <div className="smartBraceletInfo">
                            <p className="smartBraceletInfo--name">Умный&#160;браслет ONETRAK&#160;Sport</p>
                            <p className="smartBraceletInfo--cost">{ this.getPrice(1)}</p>
                        </div>
                    </div>
                    <div className="devicePackagingWrapper devicePackagingWrapper__notDevices">
                        <div
                            className="devicePackaging--image notDevices--image devicePackaging--image__LIFE"></div>
                        <div className="smartBraceletInfo">
                            <p className="smartBraceletInfo--name">Умный&#160;браслет ONETRAK&#160;Life</p>
                            <p className="smartBraceletInfo--cost">{ this.getPrice(2)}</p>
                        </div>
                    </div>
                    <div className="devicePackagingWrapper devicePackagingWrapper__notDevices">
                        <div
                            className="devicePackaging--image notDevices--image devicePackaging--image__LIFE05"></div>
                        <div className="smartBraceletInfo">
                            <p className="smartBraceletInfo--name">Умный&#160;браслет ONETRAK&#160;Life 05</p>
                            <p className="smartBraceletInfo--cost">{ this.getPrice(4)}</p>
                        </div>
                    </div>
                    <div className="devicePackagingWrapper devicePackagingWrapper__notDevices">
                        <div
                            className="devicePackaging--image notDevices--image devicePackaging--image__LIFE01"></div>
                        <div className="smartBraceletInfo">
                            <p className="smartBraceletInfo--name">Умный&#160;браслет ONETRAK&#160;Life 01</p>
                            <p className="smartBraceletInfo--cost">{ this.getPrice(3)}</p>
                        </div>
                    </div>
                </div>
                <div onClick={this.goTo('Shop')} className="deviceButton__notDevicesTopic">
                    <Button text="Перейти в магазин" style={{lineHeight:'47px', width:'246px', size:'18px'}}/>
                </div>
                <div className="downloadAppIconWrap">
                    <div className="downloadAppInfo">Скачать&nbsp;приложение&nbsp;ONETRAK для iOS и Android</div>
                    <div onClick={this.goTo('AppStore')}
                         className="downloadApp downloadApp__AppStoreIcon"></div>
                    <div onClick={this.goTo('PlayMarket')}
                         className="downloadApp downloadApp__PlayMarketIcon"></div>
                    <div onClick={this.goTo('YandexMarket')}
                         className="downloadApp downloadApp__YandexMarketIcon"></div>
                </div>
            </div>
        )


    }
}

export default connect(state => ({
    support_data: state.support_data.toJS()
}))(NoDeviceBracelets)