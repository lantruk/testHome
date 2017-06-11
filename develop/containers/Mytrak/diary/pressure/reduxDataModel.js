import React, {PropTypes, Component} from 'react';
import {getISODate, getTimeAtString} from 'utils'

export default (Decorator) => class NewFuncDecorated extends Component {

    static propTypes = {

    }



    dataModel = () => {
        let response = this.props.pressure.data.filter((dayPressures)=> {

            return dayPressures.date == getISODate(this.props.date)
        })


        let responseData = response.length? response[0].indexs : []

        let data = {
            //  firstEnter: true,
            timeIndeces: [],
            maxPressure: {
                diastolicPressure: {
                    index: 0,
                    time: '',
                    pulse: 0
                },
                systolicPressure: {
                    index: 0,
                    time: '',
                    pulse: 0
                }
            },
            minPressure: {
                diastolicPressure: {
                    index: 0,
                    time: '',
                    pulse: 0
                },
                systolicPressure: {
                    index: 0,
                    time: 0,
                    pulse: 0
                }
            },
            averageInHeader: {
                percent: {
                    diastolicPressure: '-',
                    systolicPressure: '-'
                },
                averageNight: {
                    diastolicPressure: 0,
                    systolicPressure: 0,
                    pulse: 0
                },
                averageDay: {
                    diastolicPressure: 0,
                    systolicPressure: 0,
                    pulse: 0
                },
                average24Hourse: {
                    diastolicPressure: 0,
                    systolicPressure: 0,
                    pulse: 0
                },


            }
        }


        let {average24Hourse, averageDay, averageNight, percent} = data.averageInHeader;
        let day = [], night = [];
        let minSistPressure = {upper_level: 0}, maxSistPressure = {upper_level: 0}, minDistPressure = {lower_level: 0}, maxDistPressure = {lower_level: 0};

        if (responseData.length == 0) return data

        responseData.forEach(item => {
            average24Hourse.systolicPressure += item.upper_level
            average24Hourse.diastolicPressure += item.lower_level
            average24Hourse.pulse += item.pulse


            let hours = +getTimeAtString(item.metric_time).split(':')[0];

            if (hours <= 21 && hours > 6) {
                day.push(item)
            } else {
                night.push(item)
            }

            //Считаем минималки и максималки
            if (item.upper_level > maxSistPressure.upper_level) maxSistPressure = item
            if (minSistPressure.upper_level == 0 || item.upper_level < minSistPressure.upper_level) minSistPressure = item

            if (item.lower_level > maxDistPressure.lower_level) maxDistPressure = item
            if (minDistPressure.lower_level == 0 || item.lower_level < minDistPressure.lower_level) minDistPressure = item
        })

        average24Hourse.diastolicPressure = responseData.length ? Math.round(average24Hourse.diastolicPressure / responseData.length) : 0
        average24Hourse.systolicPressure = responseData.length ? Math.round(average24Hourse.systolicPressure / responseData.length) : 0
        average24Hourse.pulse = Math.round(average24Hourse.pulse / responseData.filter(item=>item.pulse).length)

        // averageDay
        day.forEach(item => {

            averageDay.diastolicPressure += item.upper_level
            averageDay.systolicPressure += item.lower_level
            averageDay.pulse += item.pulse
        })

        averageDay.diastolicPressure = day.length ? Math.round(averageDay.diastolicPressure / day.length) : 0
        averageDay.systolicPressure = day.length ? Math.round(averageDay.systolicPressure / day.length) : 0
        averageDay.pulse = Math.round(averageDay.pulse / day.filter((item)=> {
                return item.pulse
            }).length)


        // averageNight
        night.forEach(item => {

            averageNight.diastolicPressure += item.upper_level
            averageNight.systolicPressure += item.lower_level
            averageNight.pulse += item.pulse
        })

        averageNight.systolicPressure = night.length ? Math.round(averageNight.systolicPressure / night.length) : 0
        averageNight.diastolicPressure = night.length ? Math.round(averageNight.diastolicPressure / night.length) : 0
        averageNight.pulse = Math.round(averageNight.pulse / night.filter((item)=> {
                return item.pulse
            }).length)


        // average percent

        function getPercent(day, night) {

            if (day || night) {

                if (day && night) {
                    return Math.round(((  day - night) * 100 / day) * 10) / 10
                } else {
                    return '0'
                }
            } else {
                return '-'
            }
        }


        //(ср. САДд – ср. САДн)х100% / ср.САДд
        percent.systolicPressure = getPercent(averageDay.systolicPressure, averageNight.systolicPressure)
        //(ср. ДАДд – ср. ДАДн)х100% / ср.ДАДд
        percent.diastolicPressure = getPercent(averageDay.diastolicPressure, averageNight.diastolicPressure)


        //---------- average end

        //---------- max and min Pressure start

        data.maxPressure.systolicPressure = {
            index: maxSistPressure.upper_level,
            time: getTimeAtString(maxSistPressure.metric_time),
            pulse: maxSistPressure.pulse
        };
        data.maxPressure.diastolicPressure = {
            index: maxDistPressure.lower_level,
            time: getTimeAtString(maxDistPressure.metric_time),
            pulse: maxDistPressure.pulse
        };
        data.minPressure.systolicPressure = {
            index: minSistPressure.upper_level,
            time: getTimeAtString(minSistPressure.metric_time),
            pulse: minSistPressure.pulse
        };
        data.minPressure.diastolicPressure = {
            index: minDistPressure.lower_level,
            time: getTimeAtString(minDistPressure.metric_time),
            pulse: minDistPressure.pulse
        };

        //---------- max and min Pressure end

       data.timeIndeces = responseData.sort(this.sortTime)

        return data

    }

    sortTime(firstDate, nextDate) {
        return Date.parse(firstDate.metric_datetime || firstDate.metric_time) - Date.parse(nextDate.metric_datetime || nextDate.metric_time);
    }


    if_0_then_str = (num) => {
       return num ? num : '-'
    }


    render() {
        return (
            <Decorator {...this.props} dataModel={this.dataModel}
                                       if_0_then_str={this.if_0_then_str}

            />

        )
    }
}

