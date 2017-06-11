import React, {PropTypes, Component} from 'react';
import smoothOpacity from '../../decorators/smoothOpacity.js'
//import Menu from './menu';
//import Category from './category';
//import Upgrade from './upgrade';
//import PaymentHistory from './paymentHistory';
//import WrapLoader from 'lib/wrapLoader'
import './device_main.scss'


class DeviceContainer extends Component {


    componentDidMount() {

        document.body.className = '';
    }


    render() {

        return (
            <div className="deviceContainer">
                {this.props.children}
            </div>)

    }
}


export default smoothOpacity(DeviceContainer)

