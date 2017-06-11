import React, {PropTypes, Component} from 'react';
import {IconInButtonUpgrade} from 'components/icons/interface_icons'
import Button from './index';

class PriceButton extends Component {

    static propTypes = {
        price: PropTypes.string
    }

    render() {

        const {price} = this.props
        return (
            <div className="upgradeButton" >
                <Button  style={{padding: '11px 28px', fontSize: '14px', display: 'table'}}>
                    <span className="upgradeButton--priceNamber">{price}&#160;₽</span>
                    <div className="upgradeButton--price">
                        <IconInButtonUpgrade />
                    </div>
                </Button>
            </div>
        )
    }
}


export default PriceButton

