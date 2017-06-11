import React, {PropTypes, Component} from 'react';
import Pulse from 'components/PulsePressure'
import pressureObj from './reduxDataModel'
import {connect} from 'react-redux'
import {dateToUrl} from 'utils'

import {
    Download_Icon,
    BloodPressureClock,
    BloodPressureSun,
    BloodPressureMoon,
    BloodPressurePercent,
    Adding,
    Heart,
} from 'components/icons/interface_icons'


class Average extends Component {

    static propTypes = {
        pressure: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        if_0_then_str: PropTypes.func.isRequired // возвращает {} c данными средних
    }

    render() {


        const {averageInHeader:{average24Hourse, averageDay, averageNight, percent}} = this.props.dataModel()

        return (<div className="pressure--informChackDayWrap">

                <div className="pressure--informChackDay">

                    <div className="pressure--informSection">
                        <div className="pressure--informBoard">
                            <div className="informBoard--container">
                                <div className="informBoard--icon"><BloodPressureClock /></div>
                                <div className="informBoard--indexText"> Ср. за сутки</div>
                                <div
                                    className="informBoard--indexPressure">{this.props.if_0_then_str(average24Hourse.systolicPressure)}/{this.props.if_0_then_str(average24Hourse.diastolicPressure)}
                                </div>

                                <Pulse pulse={average24Hourse.pulse}/>
                            </div>
                        </div>
                    </div>

                    <div className="pressure--informSection">
                        <div className="pressure--informBoard">
                            <div className="informBoard--container">
                                <div className="informBoard--icon"><BloodPressureSun /></div>
                                <div className="informBoard--indexText"> Ср. за день</div>
                                <div
                                    className="informBoard--indexPressure"> {this.props.if_0_then_str(averageDay.diastolicPressure)}/{this.props.if_0_then_str(averageDay.systolicPressure)}
                                </div>

                                <Pulse pulse={averageDay.pulse}/>
                            </div>
                        </div>
                    </div>

                    <div className="pressure--informSection">
                        <div className="pressure--informBoard">
                            <div className="informBoard--container">
                                <div className="informBoard--icon"><BloodPressureMoon /></div>
                                <div className="informBoard--indexText"> Ср. за ночь</div>
                                <div
                                    className="informBoard--indexPressure">{this.props.if_0_then_str(averageNight.diastolicPressure)}/{this.props.if_0_then_str(averageNight.systolicPressure)}
                                </div>
                                <Pulse pulse={averageNight.pulse}/>
                            </div>
                        </div>
                    </div>

                    <div className="pressure--informSection">
                        <div className="pressure--informBoard">
                            <div className="informBoard--container">
                                <div className="informBoard--icon"><BloodPressurePercent /></div>
                                <div className="informBoard--indexText"> Сут. индекс</div>
                                <div
                                    className="informBoard--indexPressure">{percent.diastolicPressure}/{percent.systolicPressure}
                                </div>

                            </div>
                        </div>
                    </div>

                    <div onClick={this.props.isOpenAddPopUp} className="addPressureElement">
                        <div className="addElementWrap">
                            <div className="addPressureElement--text"><p>Добавить&nbsp;давление</p></div>
                            <div className="addPressureElement--button">
                                <div className="Adding"><Adding  /></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )

    }


}


export default connect(state => ({
    pressure: state.pressure.toJS(),
    date: state.others.get('date')
}), {})(pressureObj(Average))