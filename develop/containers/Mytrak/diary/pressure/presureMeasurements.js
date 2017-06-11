import {PropTypes, Component} from 'react';
import Measurement from './presureMeasurement'
import SaveAs_pdf_xlsx from './SaveAs_pdf_xlsx'


class TimeIndicesPressure extends Component {


    static propTypes = {
        timeIndeces: PropTypes.arrayOf(PropTypes.shape({
            datetime_ms_id: PropTypes.number, //1476951907441,
            id: PropTypes.number, //9619,
            lower_level: PropTypes.number, //122,
            metric_time: PropTypes.string, //"2016-10-20T22:00:48+03:00",
            mood_id: PropTypes.number, //3,
            note: PropTypes.string, //"еще одни показания",
            pulse: PropTypes.number, //53,
            upper_level: PropTypes.number, //170
        })).isRequired,
       diaryDate: PropTypes.object.isRequired

    }

    rendertimesIndices(isEdit) {

        return this.props.timeIndeces.map(data => <Measurement key={data.datetime_ms_id}
                                                               data={data}
                                                               isEdit={isEdit}
                                                              />)
    }

    render() {

        return (
            <div className="dayPressureWrap">
                <div className="dayPressureWrap--title dayPressureWrap--title__mobile">
                    <div className="dayPressure--title">
                        <div className="dayPressure--time">Время</div>
                        <div className="dayPressure--pressure">Давление</div>
                        <div className="dayPressure--pulse">Пульс</div>
                        <div className="dayPressure--smile">Самочувствие</div>
                        {/* <div className="dayPressure--medicine">Лекарство</div>*/}
                        <div id='pdf' className="dayPressure--notes">Заметка</div>
                        <div className="dayPressure--menuDownload">
                            <SaveAs_pdf_xlsx />
                        </div>
                    </div>
                </div>
                <div className="dayPressureWrap--data">
                    {this.rendertimesIndices(this.props.editPopUp_colback)}
                </div>
            </div>
        )
    }
}


export default TimeIndicesPressure