import React, {PropTypes, Component} from 'react';
import classnames from 'classnames';
//import { themr } from 'react-css-themr';
//import { INPUTS_CHECKED_AND_SELECT } from 'identifiers.js'
import SelectType from '../../lib/selectType/selectType_medcart';
//import theme from './SelectAndCheckedInputType.scss';
import './SelectAndCheckedInputType.scss';
import {lang, getISODate, toPaddedString} from '../../utils'

const DAY = 'day',
    MONTH = 'month',
    YEAR = 'year';

class BirthDay extends Component {

    static propTypes = {
        birthday: PropTypes.object.isRequired,
        months: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
        })).isRequired,
        years: PropTypes.arrayOf(PropTypes.shape({
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
        if (getISODate(this.props.birthday) !== getISODate(nextProps.birthday)) {
            return true
        } else return false
    }

    
    setDate = (type, value) => {
        let newdate = new Date(this.props.birthday);
        //let newdate = utils.safulyNewDateFromStr(this.props.birthday);

        if (type == DAY) {
            newdate.setDate(value)
        } else {
            newdate.setDate(1)

            if (type == MONTH) newdate.setMonth(value)
            if (type == YEAR)  newdate.setFullYear(value)

            const lastday = newdate.daysInMonth();

            //Корректная установка последнего дня при смене месяца или года
            if (this.props.birthday.getDate() > lastday) {
                newdate.setDate(lastday)
            } else newdate.setDate(this.props.birthday.getDate())
        }


        this.props.onChange(newdate)
    };


    getSourcesForSelectType() {
        let sources = {
            days: [],
            months: this.props.months,
            years: this.props.years
        };

        const { birthday } = this.props,
            dayInMonth = birthday.daysInMonth();

        for (let i = 1; i <= dayInMonth; i++) {
            sources.days.push({value: i, label: toPaddedString(i, 2)})
        }

        return sources

    }

    render() {
        const {birthday, /*theme,*/ disabled} = this.props;
        const day = birthday.getDate();
        const month = birthday.getMonth();
        const year = birthday.getFullYear();

        const {days, months, years} = this.getSourcesForSelectType()


        return (
            <div className='SelectAndCheckedInputType__item'>
                <div className='SelectAndCheckedInputType__bodyItem'>
                    <SelectType scroll onChange={this.setDate.bind(this, DAY)} disabled={disabled} source={days} value={day}/>
                </div>

                <div className={'SelectAndCheckedInputType__bodyItem SelectAndCheckedInputType__bodyItem__spacer'}></div>

                <div className='SelectAndCheckedInputType__bodyItem'>
                    <SelectType scroll onChange={this.setDate.bind(this, MONTH)} disabled={disabled} source={months} value={month}/>
                </div>

                <div className={'SelectAndCheckedInputType__bodyItem SelectAndCheckedInputType__bodyItem__spacer'}></div>

                <div className='SelectAndCheckedInputType__bodyItem'>
                    <SelectType scroll onChange={this.setDate.bind(this, YEAR)} disabled={disabled} source={years} value={year}/>
                </div>
            </div>

        )
    }

}

class BirthDayOnlyRead extends Component {
    render() {

        const {theme, birthday} = this.props;

        const day = birthday.getDate();
        const month = lang.shot_months.ru[birthday.getMonth()];
        const year = birthday.getFullYear();

        return (
            <div className={theme.item}>
                <div className={theme.bodyItem}>
                    <div className={theme.roundedItem}>
                        {day}
                    </div>
                </div>
                <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                <div className={theme.bodyItem}>
                    <div className={theme.roundedItem}>
                        {month}
                    </div>
                </div>
                <div className={classnames(theme.bodyItem, theme.bodyItem__spacer)}></div>
                <div className={theme.bodyItem}>
                    <div className={theme.roundedItem}>
                        {year}
                    </div>
                </div>
            </div>
        )
    }

}



const ThemedBirthDayOnlyRead = /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/BirthDayOnlyRead//);

export default /*themr(INPUTS_CHECKED_AND_SELECT, theme)(*/BirthDay//);
export {ThemedBirthDayOnlyRead as BirthDayOnlyRead}
export { BirthDay }