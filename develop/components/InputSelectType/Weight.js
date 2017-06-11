import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
//import theme from './SelectAndCheckedInputType.scss'
import './SelectAndCheckedInputType.scss'
//import { themr } from 'react-css-themr';
//import { INPUTS_CHECKED_AND_SELECT } from 'identifiers.js'
//import { medcartSelectType as SelectType } from 'selectType';
import SelectType from '../../lib/selectType/selectType_medcart';


class Weight extends Component {

    static propTypes = {
        weight: PropTypes.string.isRequired,
        sourceInt: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })).isRequired,
        sourcePart: PropTypes.arrayOf(PropTypes.shape({
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

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.weight !== nextProps.weight){
            return true
        } else return false
    }

    splitWeigth() {
        //ФОрмат веса 82.6 однако на всяки переводим из 82.55 если попадется
        const weight = Math.smartRound(this.props.weight, 1) + '';


        let [ int, part ] = weight.split('.');

        return [int ? +int : 0, part ? +part : 0]
    }


    setWeight = (type, value) => {
        let [ int, part ] = this.splitWeigth();

        if (type == 'int') {
            int = value
        }
        if (type == 'part') {
            part = value
        }

        //Нельзя утснавливать дробную часть если максимальный вес
        if(int == 200){
            part = 0
        }

        this.props.onChange(int + '.' + part)

    }


    render() {
        const { sourceInt, sourcePart/*, theme*/ } = this.props;
        const [ int, part ] = this.splitWeigth();

        const disabledPart = int === 200 ? true : false;

        return (
            <div className='SelectAndCheckedInputType__item'>
                <div className='SelectAndCheckedInputType__bodyItem'>
                    <SelectType scroll onChange={this.setWeight.bind(this, 'int')} source={sourceInt} value={int}/>
                </div>
                <div className='SelectAndCheckedInputType__bodyItem SelectAndCheckedInputType__bodyItem__spacer'>,</div>
                <div className='SelectAndCheckedInputType__bodyItem'>
                    <SelectType scroll disabled={disabledPart} onChange={this.setWeight.bind(this, 'part')} source={sourcePart} value={part}/>
                </div>
                <div className='SelectAndCheckedInputType__bodyItem SelectAndCheckedInputType__bodyItem__spacer'></div>
                <div className='SelectAndCheckedInputType__bodyItem'>кг</div>
            </div>
        )

    }

}

class WeightOnlyRead extends Component {
    render() {

        const {theme, weight} = this.props;

        return (

            <div className={theme.item}>
                <div className={theme.bodyItem}>
                    <div className={theme.roundedItem}>
                        {Math.smartRound(+weight,1)}
                    </div>
                </div>
                <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                <div className={theme.bodyItem}>кг</div>
            </div>
        )
    }

}

const ThemedWeightOnlyRead = /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/WeightOnlyRead//);

export default /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/Weight//);
export { ThemedWeightOnlyRead as WeightOnlyRead }
export { Weight }

