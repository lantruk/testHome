import React, {PropTypes, Component} from 'react'
import deviceMap from '../deviceMap'
import orderStatusMap, {paymentTypes} from '../orderStatusMap'
import Button from 'components/Buttons/index';
import { getTimeoutForXHR } from '../../../utils'
import {connect} from 'react-redux'


class OrderBlanck extends Component {
    static propTypes = {
        //data
        cps_email: PropTypes.string, //"alfranchko@yandex.ru",
        cps_phone: PropTypes.string, //"79263753814",
        create_datetime: PropTypes.string, //"2016-10-04T14:21:42.865449+03:00",
        device_mac_address: PropTypes.string,  //"544A165EA3EB",
        from_type_id: PropTypes.number, //3,
        id: PropTypes.number,// 1
        order_no: PropTypes.number,//11174
        payment_method_y_type: PropTypes.string,//"AC" "PC"
        scid: PropTypes.number, //11174,
        shopFailURL: PropTypes.string, //"https://onetrak.ru/shop/success-payment/",
        shopId: PropTypes.number, // 21800,
        shopSuccessURL: PropTypes.string, //"https://onetrak.ru/shop/success-payment/",
        status: PropTypes.number, //10
        to_type_id: PropTypes.number,//1
        unit_price: PropTypes.string, //"5876.00",
        uu_id: PropTypes.string, //"996206a9-e351-457c-be46-ff783107c818",
        //Other
        //toggleLoader: PropTypes.func
    }

    componentWillUnmount(){
        this.timeOut && clearTimeout(this.timeOut)
    }

    goToPayment = () => {
        this.timeOut && clearTimeout(this.timeOut)

        //this.props.toggleLoader && this.props.toggleLoader(true)

        this.timeOut = setTimeout(()=>{
            this.refs.form.innerHTML = this.getPayForm()

            this.refs.form.querySelector('#yandex_form').submit()

        }, getTimeoutForXHR(Date.now()))
    }

    getPayForm(data) {

        const {payment_method_y_type, cps_email, cps_phone, order_no, uu_id,
            shopId, scid, unit_price, shopFailURL, shopSuccessURL} = this.props;


        const form = `<form id="yandex_form" method="POST" action="https://money.yandex.ru/eshop.xml" hidden="">
                    <input id="id_paymentType" name="paymentType" value="${payment_method_y_type}" /><!-- payment_method_y_type -->
                    <input id="id_cps_email" name="cps_email" type="email" value="${cps_email}"/><!-- email -->
                    <input id="id_cps_phone" maxlength="15" name="cps_phone" type="text" value="${cps_phone}"/><!-- phone -->
                    <input id="id_orderNumber" name="orderNumber" type="hidden" value="${order_no}"/><!-- order no -->
                    <input id="id_customerNumber" name="customerNumber" type="hidden" value="${uu_id}"/><!-- ui id -->
                    <input id="id_shopId" name="shopId" type="hidden" value="${shopId}"/><!-- shop id -->
                    <input id="id_scid" name="scid" type="hidden" value="${scid}"/><!-- cs id -->
                    <input id="id_sum" name="sum" type="hidden" value="${unit_price}"/><!-- unit_price -->
                    <input id="id_shopFailURL" name="shopFailURL" type="hidden" value="${shopFailURL}"/><!-- shopFailURLe -->
                    <input id="id_shopSuccessURL" name="shopSuccessURL" type="hidden" value="${shopSuccessURL}"/><!-- shopSuccessURL -->
        </form>`;


        return form

    }

    render() {
        const { status, to_type_id, from_type_id,order_no,unit_price,create_datetime,payment_method_y_type} = this.props;



        return (
            <div className="modernizationOrder">
                <h2 className="modernizationOrder--Title">Заказ на апгрейд до модели {deviceMap[to_type_id].name}</h2>
                <div className="modernizationOrder--Blank">
                    <div className="modernizationOrder--BlankItems">
                        <span>Номер заказа:</span>
                        <span>Дата заказа:</span>
                        <span>Способ оплаты:</span>
                        <span>Статус:</span>
                        <span>Сумма заказа:</span>
                    </div>
                    <div className="modernizationOrder--BlankItemsValue">
                        <span>{order_no}</span>
                        <span>{create_datetime.substr(0,10)}</span>
                        <span>{paymentTypes[payment_method_y_type]}</span>
                        <span>{orderStatusMap.get(status)}</span>
                        <span>{unit_price}&nbsp;&#8381;</span>
                    </div>
                </div>
                <h3 className="modernizationOrder--Details">Детали заказа</h3>
                <div className="modernizationOrder--DetailsItem">
                    <span className="modernizationOrder--DetailsItemText">{`Апгрейд ${deviceMap[from_type_id].name} до ${deviceMap[to_type_id].name}`}</span>
                    <span className="modernizationOrder--DetailsItemPrice">{unit_price}&nbsp;&#8381;</span>
                </div>
                { status == 10 ? <div className="modernizationOrder--PayButton">
                    <Button onClick={this.goToPayment} text="Оплатить" style={{ lineHeight: '47px', width: '188px'}}/></div> :
                    <div className="modernizationOrder--Mes">Для завершения апгрейда вам необходимо следовать инструкциям в мобильном приложении.</div> }
                <div ref="form"></div>
            </div>
        )
    }
}
export default connect(state => ({
    devices: state.devices.toJS()
}))(OrderBlanck)
//export default OrderBlanck