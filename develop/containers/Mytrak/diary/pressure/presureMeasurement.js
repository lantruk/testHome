import {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import Pulse from 'components/PulsePressure';
import Smile from 'components/Smile';
import {getTimeAtString, getColorAndStatusFromSisPressure, getColorFromDiasPressure} from 'utils';
import pressureObj from './reduxDataModel'
import {IconMenu, MenuItem/*, MenuDivider*/} from 'lib/menu';
import {deletePressure} from 'AC/pressure'
import InspectionError from "./decoratorAddPopUp.js";
import {
    IconMenu_icon,
    BloodPressureMiniMoon,
    BloodPressureMiniSun,
    PressureDrugsIcon,
    PressureNoteIcon
} from 'components/icons/interface_icons';
import Tooltip from 'rc-tooltip';

class PressureMeasurement extends Component {

    static propTypes = {
        isEdit: PropTypes.func.isRequired,
        date: PropTypes.object.isRequired,
        pressure: PropTypes.object.isRequired

    }

    getDayOrNightIcon(time) {
        if (!time) {
            return
        }
        let hours = +time.slice(0, 2)
        if (hours <= 21 && hours > 6) {
            return <div className="opacity0 miniSun"><BloodPressureMiniSun /></div>
        } else {
            return <div className="miniMoon"><BloodPressureMiniMoon /></div>
        }
    }

    delete = (data) => () => {
           
        this.props.deletePressure(this.props.date, data)
        }

    render() {
        const data = this.props.data;
        const {metric_time} = data;
        const time = getTimeAtString(metric_time);
        const upper = getColorAndStatusFromSisPressure(data.upper_level, +time.slice(0, 2))
        const lower = getColorFromDiasPressure(data.lower_level, +time.slice(0, 2))

        return (

            <div className="dayPressure--dataOverTime">
                <div className="dayPressure--time">{time}{this.getDayOrNightIcon(time)}</div>
                <div className="dayPressure--pressure">
                    <div
                        className='dayPressure--pressureIndex'>
                            <span
                                className={upper.className}>{data.upper_level}</span>
                        <span>/</span>
                            <span
                                className={lower.className}>{data.lower_level}</span>
                    </div>
                    <div className="">мм рт.ст.</div>
                    <div
                        className={`dayPressure--pressureLine ${upper.level > lower.level ? upper.className: lower.className }`}>
                        {upper.level > lower.level ? upper.status : lower.status}
                    </div>
                </div>
                <div className="dayPressure--pulse">
                    <Pulse pulse={data.pulse}/>
                </div>
                <div className="dayPressure--smile">
                    <div className="indexesPressure--smileWrap"><Smile id={data.mood_id?data.mood_id: 0}/></div>
                </div>
                {/* <div className="dayPressure--medicine dayPressure--medicine__mobile">
                 <div className="dayPressure--medicineText">{data.medicine}
                 </div>
                 </div>*/}
                <div className="dayPressure--notes dayPressure--notes__mobile">
                    <div className="dayPressure--notesText">{data.note ? data.note :
                        <div className="opacity0">NO NOTES</div>}
                    </div>
                </div>
                <div className="dayPressure--mobileIcon">
                    <div className="dayPressure--PressureNoteIcon">{data.note ?
                         <Tooltip placement="top"
                             overlay={<div><span>{'Заметка: '}</span><span>{data.note}</span></div>}>
                        <div style={{height: '24px', width: '24px', marginTop: '8px'}}><PressureNoteIcon /></div></Tooltip>

                        :
                        <div className="opacity0"><PressureNoteIcon /></div>
                    }</div>
                    {/*<div className="dayPressure--PressureDrugsIcon"><PressureDrugsIcon /></div>*/}
                </div>
                <div className="dayPressure--editMenuWrap">
                    <IconMenu icon={<IconMenu_icon />} className__Icon="editMenuWrap" position='topRight' menuRipple>
                        <MenuItem onClick={this.props.isEdit(data)} value='' caption='Редактировать'/>
                        <MenuItem onClick={this.delete(data)} value='' caption='Убрать из дневника'/>
                    </IconMenu>
                </div>
            </div>

        )
    }
}

export default connect(state => ({
        pressure: state.pressure.toJS(),
        date: state.others.get('date')
    }), {
        deletePressure
    }
)(pressureObj(InspectionError(PressureMeasurement)))






