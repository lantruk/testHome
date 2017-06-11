import React, {PropTypes, Component} from 'react'
import OrderBlank from './orderBlank'
import {connect} from 'react-redux'


class History extends Component {

    static propTypes = {
        devices: PropTypes.object.isRequired
    }

    render() {
        const orders = this.props.devices.payment_history.map(order =>
            <div key={order.order_no} className="deviceUpgrade--modernizationWrap"><OrderBlank {...order}  /></div>)
        { /*<div key={order.order_no} className="deviceUpgrade--modernizationWrap"><OrderBlank {...order}  toggleLoader={this.props.toggleLoader}/></div>)*/
        }
        return (
            <div className="deviceUpgrade">
                {orders}
            </div>
        )
    }
}

export default connect(state => ({
    devices: state.devices.toJS()
}))(History) 