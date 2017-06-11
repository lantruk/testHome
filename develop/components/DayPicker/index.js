import React, {Component, PropTypes} from 'react';
import Events from '../../lib/utils/events'
import './_datepicker.scss'

import {DayPicker_Icon} from 'components/icons/interface_icons'
import DayPicker, {DateUtils} from 'react-day-picker';


const weekdaysLong = {
    // Make sure you start with the right day of the week!
    ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
const weekdaysShort = {
    // Idem
    ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
};
const months = {
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
const firstDayOfWeek = {
    ru: 1,
    en: 0
};

const localeUtils = {
    formatDay: (d, locale = 'en') =>
        `${weekdaysLong[locale][d.getDay()]}, ${d.getDate()} ${months[locale][d.getMonth()]} ${d.getFullYear()}`,
    formatWeekdayShort: (index, locale = 'en') => weekdaysShort[locale][index],
    formatWeekdayLong: (index, locale = 'en') => weekdaysLong[locale][index],
    getFirstDayOfWeek: (locale) => firstDayOfWeek[locale],
    getMonths: (locale) => months[locale],
    formatMonthTitle: (d, locale) => `${months[locale][d.getMonth()]} ${d.getFullYear()}`
};


class DateChanger extends Component {

    static propTypes = {
        onChangeDay: PropTypes.func
    }

    state = {
        isActive: false,
        //dedicatedDate: new Date(),
        locale: 'ru',
        from: null,
        to: null,
        selectedDay: this.props.day,//new Date(),
        hover: false
    }

    componentWillUnmount() {
        Events.addEventsToDocument({touchstart: this.closeDayPicker, click: this.closeDayPicker});
    }


    componentWillUpdate(nextProps, nextState) {
        if (!this.state.isActive && nextState.isActive) {
            Events.addEventsToDocument({touchstart: this.closeDayPicker, click: this.closeDayPicker});
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isActive && !this.state.isActive) {
            Events.removeEventsFromDocument({touchstart: this.closeDayPicker, click: this.closeDayPicker});
        }
    }

    handleDayClick = (e, day, {selected, disabled}) => {
        e.nativeEvent.needStopped = true

        if (disabled) {
            return;
        }
        if (selected) {
            this.setState({
                isActive: false
            })
        } else {
            this.setState({
                selectedDay: day,
                isActive: false
            });

            this.props.onChangeDay && this.props.onChangeDay(day)
        }
    }

    closeDayPicker = (e) => {

        if (e.needStopped) return

        if (this.state.isActive) {
            const isClickOnDayPicker = Events.targetIsDescendant(e, this.refs.parent);

            if (!isClickOnDayPicker) {
                this.setState({
                    isActive: false
                })

            }

        }
    }

    toggleDatPicker = (e) => {
        this.setState({
            isActive: !this.state.isActive
        })

    }

    formatDateFun = (a) => {
        return a.toLocaleString("ru", {month: 'long', day: 'numeric'})
    }

    period_backward = () => {
        const changedDate = this.state.selectedDay.setDate(this.state.selectedDay.getDate() - 1);
        const newDate = new Date(changedDate);

        this.setState({
            selectedDay: newDate
        });

        this.props.onChangeDay && this.props.onChangeDay(newDate)
    }

    period_forward = () => {
        const changedDate = this.state.selectedDay.setDate(this.state.selectedDay.getDate() + 1);
        const newDate = new Date(changedDate);

        this.setState({
            selectedDay: newDate
        });

        this.props.onChangeDay && this.props.onChangeDay(newDate)
    }

    render() {
        const {isActive, locale, selectedDay, from, to} = this.state;

        return (
            <div ref="parent" className="dateChanger">
                <div className={"DayPickerWrap" + (isActive ? ' DayPickerWrap__active' : '')}>
                    <DayPicker
                        locale={ locale }
                        localeUtils={ localeUtils }
                        modifiers={ { sunday: day => day.getDay() === 0 } }
                        enableOutsideDays
                        fixedWeeks
                        initialMonth={selectedDay}
                        onDayClick={ this.handleDayClick }
                        selectedDays={ day => DateUtils.isSameDay(day, selectedDay) }
                    />
                </div>


                <div className="dateChanger--arrowBox" onClick={this.period_backward}>
                    <div className="dateChanger--arrow dateChanger--arrow__left"></div>
                </div>
                <div className="dateChanger--DayPickerWrap" onClick={this.toggleDatPicker}>
                    <div className="dateChanger--date">{this.formatDateFun(selectedDay)}</div>
                    <div className="dateChanger--DayPickerIcon"><DayPicker_Icon /></div>
                </div>
                <div className="dateChanger--arrowBox" onClick={this.period_forward}>
                    <div className="dateChanger--arrow dateChanger--arrow__right"></div>
                </div>

            </div>
        )
    }
}

export default DateChanger