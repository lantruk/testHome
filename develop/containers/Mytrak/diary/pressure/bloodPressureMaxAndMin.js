import React from 'react'
import {Heart} from 'components/icons/interface_icons'
import Pulse from 'components/PulsePressure'
import {PropTypes} from 'react';
//import {LineChart, Line} from 'recharts'
import Animate from 'react-smooth';

function BloodPressureMaxAndMin(props) {

    const data = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];


    const {maxPressure, minPressure} = props,

        indexMaxSistologi = maxPressure.systolicPressure.index,
        pulseMaxSistologi = maxPressure.systolicPressure.pulse,
        timeMaxSistologi = maxPressure.systolicPressure.time,
        indexMaxDiastologi = maxPressure.diastolicPressure.index,
        pulseMaxDiastologi = maxPressure.diastolicPressure.pulse,
        timeMaxDiastologi = maxPressure.diastolicPressure.time,
        indexMinSistologi = minPressure.systolicPressure.index,
        pulseMinSistologi = minPressure.systolicPressure.pulse,
        timeMinSistologi = minPressure.systolicPressure.time,
        indexMinDiastologi = minPressure.diastolicPressure.index,
        pulseMinDiastologi = minPressure.diastolicPressure.pulse,
        timeMinDiastologi = minPressure.diastolicPressure.time

    const steps = [{
        style: {
            opacity: 0,
        },
        duration: 400,
    }, {
        style: {
            opacity: 1,
            width: "0px",

            transform: 'translate(0, 0)',
        },
        duration: 1000,
    }, {
        style: {
            width: "53px",

            transform: 'translate(15px, 0)',
        },
        duration: 1200,
    }];

    return (

        <div className="maxAndMinBloodPressureWrap">

            <div className="maxBloodPressure">
                <div className="bloodPressure--wrap">
                    <div className="maxBloodPressureText">
                        <div className="maxAndMin--text">Максимальное</div>
                        <div className="miniLine">
                            <Animate steps={steps}>

                                <svg height="29" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient x1="60.847%" y1="100%" x2="60.847%" y2="-20.923%" id="maxPress">
                                            <stop stopColor="#F4ABC0" offset="0%"/>
                                            <stop stopColor="#E05F5D" offset="100%"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M-6-6h55v30H-6z"/>
                                        <path
                                            d="M15.298 22.311a1 1 0 0 0 1.365-.034l3.543-3.477 3.271 1.2a1 1 0 0 0 1.199-.418l6.47-10.611 6.014 10.6a1 1 0 0 0 .74.5l6.986.908 2.364 2.681a1 1 0 1 0 1.5-1.322l-2.613-2.963a1 1 0 0 0-.62-.33l-6.864-.894-6.605-11.645a1 1 0 0 0-1.724-.028L23.396 17.84l-3.094-1.137a1 1 0 0 0-1.045.225l-3.329 3.267-3.037-2.697a1 1 0 0 0-1.306-.018l-5.227 4.38a1 1 0 0 0 1.284 1.533l4.566-3.826 3.09 2.743z"
                                            fill="url(#maxPress)" transform="translate(-6 -6)"/>
                                    </g>
                                </svg>

                            </Animate>
                        </div>
                    </div>

                    <div className="maxBloodPressureSis">

                        <div className="arterialPressure--cont__central">
                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--time">{timeMaxSistologi}</div>
                                <div className="arterialPressure--index">{indexMaxSistologi}</div>
                            </div>

                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--text">Сист.</div>
                                <Pulse pulse={pulseMaxSistologi}/>
                            </div>
                        </div>

                    </div>


                    <div className="maxBloodPressureDias">

                        <div className="arterialPressure--cont__central">
                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--time">{timeMaxDiastologi}</div>
                                <div className="arterialPressure--index">{indexMaxDiastologi}</div>
                            </div>

                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--text">Диас.</div>
                                <Pulse pulse={pulseMaxDiastologi}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="minBloodPressure">
                <div className="bloodPressure--wrap">
                    <div className="maxBloodPressureText">
                        <div className="maxAndMin--text">Минимальное</div>
                        <div className="miniLine">
                            <Animate steps={steps}>
                                <svg height="29" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient x1="50%" y1="-21.841%" x2="50%" y2="100%" id="minPress">
                                            <stop stopColor="#5268A1" offset="0%"/>
                                            <stop stopColor="#9AC6FB" offset="100%"/>
                                        </linearGradient>
                                    </defs>
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M-1-6h55v30H-1z"/>
                                        <path
                                            d="M19.371 13.03a1 1 0 0 0 1.061.23l3.15-1.184 9.349 12.522a1 1 0 0 0 1.75-.283l4.264-12.839L43.45 8.18l4.782 2.58a1 1 0 0 0 .474.12H53a1 1 0 1 0 0-2h-4.041l-5.115-2.76a1 1 0 0 0-1.065.073l-5.273 3.858a1 1 0 0 0-.359.492l-3.76 11.323-8.653-11.59a1 1 0 0 0-1.153-.337l-3.248 1.222-3.526-3.545a1 1 0 0 0-1.382-.034l-3.36 3.056-9.891-1.743a1 1 0 1 0-.348 1.97l10.375 1.828a1 1 0 0 0 .846-.245l3.016-2.744 3.308 3.326z"
                                            fill="url(#minPress)"/>
                                    </g>
                                </svg>
                            </Animate>
                        </div>
                    </div>
                    <div className="maxBloodPressureSis">
                        <div className="arterialPressure--cont__central">
                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--time">{timeMinSistologi}</div>
                                <div className="arterialPressure--index">{indexMinSistologi}</div>
                            </div>

                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--text">Сист.</div>
                                <Pulse pulse={pulseMinSistologi}/>
                            </div>
                        </div>
                    </div>


                    <div className="maxBloodPressureDias">
                        <div className="arterialPressure--cont__central">
                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--time">{timeMinDiastologi}</div>
                                <div className="arterialPressure--index">{indexMinDiastologi}</div>
                            </div>

                            <div className="arterialPressure--cont">
                                <div className="arterialPressure--text">Диас.</div>
                                <Pulse pulse={pulseMinDiastologi}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )

}

BloodPressureMaxAndMin.propTypes = {
    maxPressure: PropTypes.shape({
        diastolicPressure: PropTypes.shape({
            index: PropTypes.number,
            pulse: PropTypes.any,
            time: PropTypes.string
        }).isRequired,
        systolicPressure: PropTypes.shape({
            index: PropTypes.number,
            pulse: PropTypes.any,
            time: PropTypes.string
        }).isRequired,
    }).isRequired,
    minPressure: PropTypes.shape({
        diastolicPressure: PropTypes.shape({
            index: PropTypes.number,
            pulse: PropTypes.any,
            time: PropTypes.string
        }).isRequired,
        systolicPressure: PropTypes.shape({
            index: PropTypes.number,
            pulse: PropTypes.any,
            time: PropTypes.string
        }).isRequired,
    }).isRequired,
}

export default BloodPressureMaxAndMin