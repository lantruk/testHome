import React, {Component, PropTypes} from 'react'
import ScrollBox from '../../../develop/components/scrollBox/ScrollBox'
import Tooltip from 'rc-tooltip';

import './statistics.scss'

class Chart extends Component {

    static propTypes = {
        pressureData: PropTypes.array,

        pressureNightNormSis: PropTypes.number,
        pressureDayNormSis: PropTypes.number,
        pressureDayNormDias: PropTypes.number,
        pressureNightNormDias: PropTypes.number,
        pressureBackground: PropTypes.bool,
        pressureSisAndDias: PropTypes.bool,
        pressurePulse: PropTypes.bool
    }

    state = {
        pressure: this.props.pressure //для кнопки
    }

    render() {

        return (


            <div className="megaChart">

                <ScrollBox style={{height: '340px'}}>
                    <div className="scroll-box__handle scroll-box__handle--x scroll-box__trak--dragged">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1682" height="340"
                            
                             xmlnsXlink="http://www.w3.org/1999/xlink">

                            {background()}

                            { this.props.pressureBackground && pressureBackground(this.props) }
                            { this.props.lineBezie && lineBezie(this.props) }
                            { this.props.pressurePulse && pressurePulse(this.props)}
                            { this.props.pressureSisAndDias && pressureSisAndDias(this.props) }

                        </svg>

                    </div>
                </ScrollBox>
            </div>


        )
    }

}


export default Chart

/*
 *  расчет у координат
 *  на вход 'number'
 * */
function y_pressure(myValue) {
    return Math.round((210 - myValue) * 1.42380)
}

/*
 *  расчет х координат
 *  на вход "2017-02-21T22:01:00+03:00"
 * */
let x_pressure = (timeZone) => {
    const colomnWidth = 70
    let x = 0;
    const hours = +timeZone.slice(11, 13)
    const minets = +timeZone.slice(14, 16)
    if ((hours * colomnWidth) + (minets * (colomnWidth / 60)) < ( colomnWidth * 7 )) {
        x = (hours * colomnWidth) + (minets * (colomnWidth / 60)) + ( colomnWidth * 17 )
    } else {
        x = (hours * colomnWidth) + (minets * (colomnWidth / 60)) - ( colomnWidth * 7 )
    }
    return x
}

/*
 *  расчет х координат для ночной границы
 *  на вход "2017-02-21T22:01:00+03:00"
 * */
function nightLine(time) { //22
    if (time < 7) {
        return ((time + 17) * 70)
    } else {
        return ((time - 7) * 70)
    }
}

/*
 *  точки для давления (от времени меняются диапазоны нормы)
 * */
function pressureSisAndDias(props) {

    const {pressureDayNormSis, pressureNightNormSis, pressureDayNormDias, pressureNightNormDias, pressureData, nightTime} = props

    const mapPressure = {
        sisDayMax: pressureDayNormSis, //135
        sisDayMin: pressureDayNormSis - 35, //100,
        diasDayMax: pressureDayNormDias, //85
        diasDayMin: pressureDayNormDias - 20, //65,

        sisNightMax: pressureNightNormSis, //120
        sisNightMin: pressureNightNormSis - 30, //90,
        diasNightMax: pressureNightNormDias, //70
        diasNightMin: pressureNightNormDias - 20//50
    }

    const sisArr = pressureData.map((obj)=> {

        const sisMax = +obj.metric_time.slice(11, 13) < nightTime ? mapPressure.sisDayMax : mapPressure.sisNightMax
        const sisMin = +obj.metric_time.slice(11, 13) < nightTime ? mapPressure.sisDayMin : mapPressure.sisNightMin

        return (
            <g className="sisCircle" key={Math.random() * 1000000}>
                {obj.upper_level < sisMin || obj.upper_level > sisMax ?
                    <Tooltip placement="right"
                             overlay={<div><div><span>Систолическое:</span><span>{obj.upper_level}</span></div><div><span>Время:</span><span>{' ' + obj.metric_time.slice(11,16)}</span></div></div>}>
                        <circle id="SvgjsCircle1183" r="8" cx={x_pressure(obj.metric_time)}
                                cy={y_pressure(obj.upper_level)} ry="2"
                                stroke={obj.upper_level < sisMin ? '#d1d6ee' : '#f1cdcb'} strokeWidth="4"
                                fill={obj.upper_level < sisMin ? '#d1d6ee' : '#f1cdcb'}
                                className="isNormalCircle"></circle>
                    </Tooltip>
                    : null}
                <Tooltip placement="right"
                         overlay={<div><div><span>Систолическое:</span><span>{obj.upper_level}</span></div><div><span>Время:</span><span>{' ' + obj.metric_time.slice(11,16)}</span></div></div>}>
                    <circle id="SvgjsCircle1184" r="5" cx={x_pressure(obj.metric_time)}
                            cy={y_pressure(obj.upper_level)} ry="2" stroke="#df5f5d" strokeWidth="4"
                            fill="#ffffff" className="sisPressures"></circle>
                </Tooltip>
            </g>
        )
    })
    const diasArr = pressureData.map((obj)=> {

        const diasMax = +obj.metric_time.slice(11, 13) < nightTime ? mapPressure.diasDayMax : mapPressure.diasNightMax
        const diasMin = +obj.metric_time.slice(11, 13) < nightTime ? mapPressure.diasDayMin : mapPressure.diasNightMin

        return (
            <g className="diasCircle" key={Math.random() * 1000000}>
                {obj.lower_level < diasMin || obj.lower_level > diasMax ?
                    <Tooltip placement="right"
                             overlay={<div><div><span>Диастолическое:</span><span>{obj.lower_level}</span></div><div><span>Время:</span><span>{' ' + obj.metric_time.slice(11,16)}</span></div></div>}>
                        <circle id="SvgjsCircle1183" r="8" cx={x_pressure(obj.metric_time)}
                                cy={y_pressure(obj.lower_level)} ry="2"
                                stroke={obj.lower_level < diasMin ? '#d1d6ee' : '#f1cdcb'} strokeWidth="4"
                                fill={obj.lower_level < diasMin ? '#d1d6ee' : '#f1cdcb'}
                                className="isNormalCircle"></circle>
                    </Tooltip>
                    : null}
                <Tooltip placement="right"
                         overlay={<div><div><span>Диастолическое:</span><span>{obj.lower_level}</span></div><div><span>Время:</span><span>{' ' + obj.metric_time.slice(11,16)}</span></div></div>}>
                    <circle id="SvgjsCircle1184" r="5" cx={x_pressure(obj.metric_time)}
                            cy={y_pressure(obj.lower_level)} ry="2" stroke="#7a96de" strokeWidth="4"
                            fill="#ffffff" className="sisPressures"></circle>
                </Tooltip>
            </g>
        )
    })
    const sisDiasLineArr = pressureData.map((obj)=> {
        return (
            <g className="verticalLine" key={Math.random() * 1000000}>

                <rect xmlns="http://www.w3.org/2000/svg" width="2"
                      height={ y_pressure(obj.lower_level) - y_pressure(obj.upper_level)}
                      x={x_pressure(obj.metric_time) - 1} y={y_pressure(obj.upper_level)}
                      fill="url(#m)"/>
            </g>
        )
    })

    return (
        <g className="pressure">
            <defs>
                <linearGradient id="m" x1="50%" x2="50%" y1="0%" y2="100%">
                    <stop stopColor="#E15E5A" offset="0%"/>
                    <stop stopColor="#F5AAC0" offset="49.408%"/>
                    <stop stopColor="#7994E1" offset="100%"/>
                </linearGradient>
            </defs>
            {sisDiasLineArr}
            {sisArr}
            {diasArr}
        </g>
    )
}

/*
 *  точки пульса
 * */
function pressurePulse(props) {

    const {pressureData} = props

    const pulseArr = pressureData.map((obj)=> {
        return (
            <g key={Math.random() * 1000000}>
                <Tooltip placement="right"
                         overlay={<div><div><span>Пульс: </span><span>{obj.pulse}</span></div><div><span>Время:</span><span>{' ' + obj.metric_time.slice(11,16)}</span></div></div>}>
                    <circle id="SvgjsCircle1929" r="5" cx={x_pressure(obj.metric_time) } cy={y_pressure(obj.pulse)}
                            stroke="#ed998e" fill="#ed998e" className="pulsePressures"></circle>
                </Tooltip>
            </g>
        )
    })

    return (
        <g className="pulseCircle">
            {pulseArr}
        </g>
    )
}

/*
 *  столбцы и подпись времени
 * */
function background() {
    let arr = [],
        x = 0, // начиная с 0, дальше прибовляем по 70
        xText = 35, //отступ для времени от начала
        time = 7; //время начинается с 7 утра

    for (let i = 0; i < 24; i++) {
        let color = i % 2 ? "#FFFFFF" : "#FAFAFA"

        arr.push(
            <rect key={Math.random(i) * 10000000 } width="70" height="299" x={x} fill={color}/>
        )
        arr.push(
            <text key={Math.random(i) * 10000000} id="SvgjsText1017" fontFamily="Roboto-Light" fontSize="12"
                  textAnchor="middle" fill="#4e5768"
                  x={xText} y="320">
                <tspan id="SvgjsTspan1018">{time < 10 ? '0' + time + ':00' : time + ':00'}</tspan>
            </text>)
        x += 70
        xText += 70
        time += 1
        time == 24 ? time = 0 : null
    }

    return (
        <g className="backdropChart">
            {arr}
        </g>
    )
}

/*
 *  линии для давления (меняется от props)
 * */
function pressureBackground(props) {
    const {pressureNightNormSis, pressureDayNormSis, pressureDayNormDias, pressureNightNormDias, nightTime} = props

    return (
        <g className="pressureBackground">
            <line id="SvgjsLine1539" x1="0" y1={y_pressure(pressureDayNormSis)} x2={nightLine(nightTime)}
                  y2={y_pressure(pressureDayNormSis)}
                  stroke="#df5f5d" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="0.5, 5" className="PressuresLine"></line>
            <line id="SvgjsLine1540" x1="0" y1={y_pressure(pressureDayNormDias)} x2={nightLine(nightTime)}
                  y2={y_pressure(pressureDayNormDias)}
                  stroke="#7a96de" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="0.5, 5" className="PressuresLine"></line>
            <line id="SvgjsLine1541" x1={nightLine(nightTime)} y1={y_pressure(pressureNightNormSis)} x2="1678.5"
                  y2={y_pressure(pressureNightNormSis)} stroke="#df5f5d" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="0.5, 5" className="PressuresLine"></line>
            <line id="SvgjsLine1542" x1={nightLine(nightTime)} y1={y_pressure(pressureNightNormDias)} x2="1678.5"
                  y2={y_pressure(pressureNightNormDias)} stroke="#7a96de" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="0.5, 5" className="PressuresLine"></line>
            <line id="SvgjsLine1543" x1={nightLine(nightTime)} y1="0" x2={nightLine(nightTime)} y2="300"
                  stroke="#a5a9b4" strokeWidth="2"
                  strokeLinecap="round" strokeDasharray="0.5, 5" className="PressuresLine"></line>
            <g id="SvgjsG1595" className="sunAndMoon_icon">
                <path id="SvgjsPath1602"
                      d="M10 14.57c2.525 0 4.57-2.045 4.57-4.57 0-2.525-2.045-4.57-4.57-4.57-2.525 0-4.57 2.045-4.57 4.57 0 2.525 2.045 4.57 4.57 4.57zM9.385 2.62c0-.342.285-.62.615-.62.34 0 .615.282.615.62v1.22c0 .343-.285.622-.615.622-.34 0-.615-.283-.615-.622V2.62zm5.397 1.727c.243-.242.642-.237.875-.004.24.24.235.635-.004.875l-.862.862c-.242.242-.64.237-.874.004-.24-.24-.235-.635.004-.875l.862-.863zm2.597 5.038c.342 0 .62.285.62.615 0 .34-.282.615-.62.615h-1.22c-.343 0-.622-.285-.622-.615 0-.34.283-.615.622-.615h1.22zm-1.727 5.397c.242.243.237.642.004.875-.24.24-.635.235-.875-.004l-.862-.862c-.242-.242-.237-.64-.004-.874.24-.24.635-.235.875.004l.863.862zm-5.038 2.597c0 .342-.285.62-.615.62-.34 0-.615-.282-.615-.62v-1.22c0-.343.285-.622.615-.622.34 0 .615.283.615.622v1.22zm-5.397-1.727c-.243.242-.642.237-.875.004-.24-.24-.235-.635.004-.875l.862-.862c.242-.242.64-.237.874-.004.24.24.235.635-.004.875l-.862.863zM2.62 10.615C2.28 10.615 2 10.33 2 10c0-.34.282-.615.62-.615h1.22c.343 0 .622.285.622.615 0 .34-.283.615-.622.615H2.62zm1.727-5.397c-.242-.243-.237-.642-.004-.875.24-.24.635-.235.875.004l.862.862c.242.242.237.64.004.874-.24.24-.635.235-.875-.004l-.863-.862z"
                      fill="#a5a9b4" transform={"translate(" + (nightLine(nightTime) - 28) + ', 3)'}></path>
                <path id="SvgjsPath1603"
                      d="M11.154 16C7.754 16 5 13.314 5 10s2.755-6 6.154-6c1.455 0 2.793.492 3.846 1.315-2.2.48-3.846 2.395-3.846 4.685 0 2.29 1.645 4.205 3.846 4.685-1.053.823-2.39 1.315-3.846 1.315z"
                      fill="#a5a9b4" transform={"translate(" + (nightLine(nightTime) + 8) + ', 3)'}></path>
            </g>
        </g>
    )
}

/*
 *  кривая Безье для давления
 * */
function lineBezie(props) {

    const {pressureData} = props

    let d_string = []

    const pulseArr = pressureData.map(obj => obj.pulse)
    const coordinatPulseLine_y = pulseArr.map(number => y_pressure(number))
    const coordinatPulseLine_x = pressureData.map(obj => x_pressure(obj.metric_time))

    pulseArr.forEach((item, i, arr)=> {
        let arr_x = coordinatPulseLine_x,
            arr_y = coordinatPulseLine_y,
            myI = i,
            netI = myI + 1
        if (arr_x[netI]) {
            d_string.push('M' + arr_x[myI] + ',' + arr_y[myI] + ' ' + 'C' + ((+arr_x[myI] + +arr_x[netI]) / 2) + ',' + arr_y[myI] + ' ' + ((+arr_x[myI] + +arr_x[netI]) / 2) + ',' + arr_y[netI] + ' ' + arr_x[netI] + ',' + arr_y[netI])
        }

    })

    return (
        <g className="lineBezie">
            <path id="SvgjsPath1146"
                  d={d_string}
                  stroke="#ed998e" strokeWidth="2" fill="transparent"></path>
        </g>
    )
}


