import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
//import theme from './SelectAndCheckedInputType.scss'
import './SelectAndCheckedInputType.scss'
//import { themr } from 'react-css-themr';
//import { INPUTS_CHECKED_AND_SELECT } from 'identifiers.js'
//import { medcartSelectType as SelectType } from 'selectType';
import SelectType from '../../lib/selectType/selectType_medcart';


class Height extends Component {

    static propTypes = {
        height: PropTypes.number.isRequired,
        source: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })).isRequired,
        onChange: PropTypes.func.isRequired,
        theme: PropTypes.shape({
            item: PropTypes.string,
            bodyItem: PropTypes.string,
            bodyItem__spacer: PropTypes.string
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.height !== nextProps.height) {
            return true
        } else return false
    }

    setHeight = (value) => {
        this.props.onChange && this.props.onChange(value + '')
    }


    render() {

        const {source, height/*, theme*/} = this.props;

        return (
            <div className='SelectAndCheckedInputType__item'>
                <div className='SelectAndCheckedInputType__bodyItem'>
                    <SelectType scroll onChange={this.setHeight} source={source} value={height}/>
                </div>
                <div className='SelectAndCheckedInputType__bodyItem SelectAndCheckedInputType__bodyItem__spacer'></div>
                <div className='SelectAndCheckedInputType__bodyItem'>см</div>
            </div>
        )

    }

}

class HeightOnlyRead extends Component {
    render() {

        const {/*theme,*/ height} = this.props;

        return (

            <div className='SelectAndCheckedInputType__item'>
                <div className='SelectAndCheckedInputType__bodyItem'>
                    <div className='SelectTypeMedcart__selectType'>
                        {Math.round(height)}
                    </div>
                </div>
                <div className='SelectAndCheckedInputType__bodyItem SelectAndCheckedInputType__bodyItem__spacer'></div>
                <div className='SelectAndCheckedInputType__bodyItem'>см</div>
            </div>
        )
    }

}

const ThemedHeightOnlyRead = /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/HeightOnlyRead//);

export default/* themr(INPUTS_CHECKED_AND_SELECT, theme)(*/Height//);
export {ThemedHeightOnlyRead as HeightOnlyRead}
export {Height}
