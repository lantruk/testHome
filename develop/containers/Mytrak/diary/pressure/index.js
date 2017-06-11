import React, {PropTypes, Component} from 'react';
import {dateToUrl, getISODate, formatTime} from 'utils'
import Smile from "components/Smile";
import {
    Download_Icon,
    Adding,
    BloodPressureStatLeg1,
    BloodPressureStatLeg2,
    BloodPressureStatLeg3,
    BloodPressureStatLeg4
} from 'components/icons/interface_icons'
import {connect} from 'react-redux'
import Average from './headerAndAddPressure'
import {PresureIcon} from 'components/icons/metric_icons';
import pressureObj from './reduxDataModel'
import BloodPressureMaxAndMin from './bloodPressureMaxAndMin';
import Measurements from './presureMeasurements';
import PopUpFirstEnter from './popUpFirstEnter';
import AddPressurePopUp from './addPressurePopUp';
import EditPressurePopUp from './editPressurePopUp';
import PopUpInform_Error_10minInterval from "./addPressure__TimeError";
import PopUpInform_SavePreviousDay from "./addPressure__InformDay";
import SaveAs_pdf_xlsx from './SaveAs_pdf_xlsx'
import {pushPressure, closeAddPopUp} from 'AC/pressure'
import Chart from 'components/Chart'
//import NewChart from 'components/newChart'

class Pressure extends Component {

    static propTypes = {
        pressure: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        isEnter: PropTypes.bool.isRequired,
        age: PropTypes.number
    }

    componentDidMount() {
        //идет проверка, есть ли эта дата в сторе, если нет, мы ее качаем с серевера
        this.props.pushPressure(this.props.date, this.props.pressure.data)
        // если зашли через открытый поп ап, почитстим стор от недоразумений
        this.props.isOpenAddPopUp ? this.props.closeAddPopUp() : null
    }


    state = {
        upper_level: 120,
        lower_level: 80,
        id: 1,
        pulse: 70,
        metric_time: new Date(Date.now()).getFullYear() + '-' + (new Date(Date.now()).getMonth() + 1) + '-' + new Date(Date.now()).getDate() + 'T' + utils.formatTime(new Date(Date.now()).getHours() * 60 + new Date(Date.now()).getMinutes()) + ':00+03:00',
        datetime_ms_id: Date.now(),
        note: '',
        mood_id: 3,
        activeSmile: 3,
        is_manually: true,

        timeNow: dateToUrl(new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), new Date().getHours(), new Date().getMinutes())),
        editDate: 'string',

        closePopUp: true,
        isOpenAddPopUp: this.props.isOpenAddPopUp ? this.props.isOpenAddPopUp : false,
        informDay: false,
        errorPopUp: false,
        isEditPopUp: false
    }

    isOpenTimeErrorPopUp = () => {
        this.setState({
            errorPopUp: !this.state.errorPopUp
        })
    }

    isOpenDayInformDay = () => {
        this.setState({
            informDay: !this.state.informDay
        })
    }

    popUpFirstEnter = () => {
        this.setState({
            closePopUp: false
        })
    }

    isOpenAddPopUp = () => {

        if (!this.state.isOpenAddPopUp) {
            this.setState({
                datetime_ms_id: Date.now(),
                id: Date.now(),
                activeSmile: 3,
                mood_id: 3,
                errorPopUp: false,
                upper_level: 120,
                lower_level: 80,
                pulse: 70,
                note: '',
                is_manually: true,
                metric_time: getISODate(this.props.date) + 'T' + formatTime(new Date(Date.now()).getHours() * 60 + new Date(Date.now()).getMinutes()) + ':00+03:00',
                timeNow: getISODate(this.props.date) + 'T' + formatTime(new Date(Date.now()).getHours() * 60 + new Date(Date.now()).getMinutes()) + ':00+03:00'
            })
        }

        this.setState({
            isOpenAddPopUp: !this.state.isOpenAddPopUp
        })

    }

    setNewDeteEditPopUp = (enterTime) => (e) => {

        let newEditDate = this.state.isOpenAddPopUp ? new Date(Date.parse(this.state.timeNow)) : new Date(Date.parse(this.state.editDate))


        if (enterTime == 'hours') {
            newEditDate.setHours(e)
        } else {
            newEditDate.setMinutes(e)
        }
        if (this.state.isOpenAddPopUp) {
            this.setState({
                timeNow: dateToUrl(newEditDate)
            })
        }
        if (this.state.isEditPopUp) {
            this.setState({
                editDate: dateToUrl(newEditDate)
            })
        }
    }

    addProps = () => {
        this.setState({
            addPressurePopUp: !this.state.addPressurePopUp
        })
    }

    isEditPopUpOpen = (data) => () => {
        this.setState({
            isEditPopUp: !this.state.isEditPopUp,
            upper_level: data.upper_level,
            lower_level: data.lower_level,
            id: data.id,
            pulse: data.pulse,
            editDate: data.metric_time,
            mood_id: data.mood_id,
            activeSmile: data.mood_id,
            datetime_ms_id: data.datetime_ms_id,
            note: data.note,
            is_manually: data.is_manually
        })
    }

    closeEditPopUp = () => {
        this.setState({
            isEditPopUp: !this.state.isEditPopUp
        })
    }

    changeEditPopUp = (key) => (index) => {
        let ind = index
        if (typeof (index) == 'object') {
            ind = index.value
        }
        this.setState({
            [key]: ind
        })
    }

    update = () => {
        this.forceUpdate()
    }

    smileCheck = (smile) => () => {
        switch (smile) {
            case 1:
                this.setState({
                    mood_id: 1,
                    activeSmile: 1
                });
                break;
            case 2:
                this.setState({
                    mood_id: 2,
                    activeSmile: 2
                });
                break;
            case 3:
                this.setState({
                    mood_id: 3,
                    activeSmile: 3
                });
                break;
            case 4:
                this.setState({
                    mood_id: 4,
                    activeSmile: 4
                });
                break;
            case 5:
                this.setState({
                    mood_id: 5,
                    activeSmile: 5
                });
                break;
        }
    }

    getDay = (number) => {

        const beforeDate = getISODate(new Date(this.props.date.setDate(this.props.date.getDate() - 1)))
        const afterDate = getISODate(new Date(this.props.date.setDate(this.props.date.getDate() + 2)))
        this.props.date.setDate(this.props.date.getDate() - 1)
        const chackDate = getISODate(this.props.date) //2015-07-30

        switch (number) {
            case 1:
                let a = this.props.pressure.data.filter((dayPressures)=> {
                    return dayPressures.date.slice(0, 10) == beforeDate
                })
                // console.log(a)
                return a.length ? a[0].indexs : []
                break
            case 2:
                let b = this.props.pressure.data.filter((dayPressures)=> {
                    return dayPressures.date.slice(0, 10) == chackDate
                })
                return b.length ? b[0].indexs : []
                break
            case 3:
                let c = this.props.pressure.data.filter((dayPressures)=> {
                    return dayPressures.date.slice(0, 10) == afterDate
                })
                return c.length ? c[0].indexs : []
            default:
                return []
        }


    }

    getPressureArr = () => {
        let response = this.props.pressure.data.filter((dayPressures)=> {

            return dayPressures.date == getISODate(this.props.date)
        })

        return response.length ? response[0].indexs : []
    }

    render() {

        const {timeIndeces, maxPressure, minPressure} = this.props.dataModel()

        const bloodPressureMaxAndMin = timeIndeces.length ?
            <BloodPressureMaxAndMin maxPressure={maxPressure} minPressure={minPressure}/> : null;

        return (


            <div className="pressureWrap">
                <Average isOpenAddPopUp={this.isOpenAddPopUp}/>
                <div className="maxAndMinBloodPressureWrap__mobile">
                    {bloodPressureMaxAndMin}
                </div>
                <div className="pressure--informWrap">
                    <div className="diagramInformationWrap">
                        <div className="diagramInformationBlock">
                            <div className="diagramInformation--StatisticLegend">
                                <BloodPressureStatLeg1 />
                            </div>
                            <div className="diagramInformationBlockText">Сист.</div>
                        </div>
                        <div className="diagramInformationBlock">
                            <div className="diagramInformation--StatisticLegend">
                                <BloodPressureStatLeg2 />
                            </div>
                            <div className="diagramInformationBlockText">Диаст.</div>
                        </div>
                        <div className="diagramInformationBlock">
                            <div className="diagramInformation--StatisticLegend">
                                <BloodPressureStatLeg3 />
                            </div>
                            <div className="diagramInformationBlockText">Пульс</div>
                        </div>
                        <div className="diagramInformationBlock">
                            <div className="diagramInformation--StatisticLegend__manyPoints">
                                <BloodPressureStatLeg4 />
                            </div>
                            <div className="diagramInformationBlockText">Верхний предел нормы</div>
                        </div>
                    </div>
                    <div className="pressureDiagramWrap">
                        <div className="diagramIndicationWrap">
                            <div className="diagramIndication">180</div>
                            <div className="diagramIndication">150</div>
                            <div className="diagramIndication">120</div>
                            <div className="diagramIndication">90</div>
                            <div className="diagramIndication">60</div>
                            <div className="diagramIndication">30</div>
                        </div>
                        <div className="pressureDiagram">
                            <Chart pressureBackground={true}
                                   pressureSisAndDias={true}
                                   pressurePulse={true}
                                   lineBezie={true}

                                   pressureData={this.getPressureArr()}
                                   pressureDayNormSis={135}
                                   pressureDayNormDias={85}
                                   pressureNightNormSis={120}
                                   pressureNightNormDias={70}
                                   nightTime={22}

                            /></div>
                    </div>
                    {/*<NewChart data={createNewApi()} />*/}


                    <div className="maxAndMinBloodPressureWrap__computer">
                        {bloodPressureMaxAndMin}
                    </div>
                </div>

                {timeIndeces.length ? null :
                    <div className="addPressureElement__mobile">
                        <div className="addPressureMobile--button__mobile" onClick={this.isOpenAddPopUp}>
                            <div className="addPressureElement--text"><p>Добавить&nbsp;давление</p></div>
                            <div className="addPressureElement--button">
                                <div className="Adding"><Adding  /></div>
                            </div>
                        </div>
                    </div> }
                {timeIndeces.length ?
                    <div>
                        <Measurements editPopUp_colback={this.isEditPopUpOpen}
                                      timeIndeces={timeIndeces}
                                      diaryDate={this.props.date}
                        />
                        <div className="addPressureElement__mobile">
                            <div className="addPressureMobile--button__mobile" onClick={this.isOpenAddPopUp}>
                                <div className="addPressureElement--text"><p>Добавить&nbsp;давление</p></div>
                                <div className="addPressureElement--button">
                                    <div className="Adding"><Adding  /></div>
                                </div>
                            </div>
                            <div className="dayPressure--menuDownload">
                                <div className="SaveAs--pdfXlsx__mobileWrap">
                                    <SaveAs_pdf_xlsx position='bottomRight'/>
                                </div>
                            </div>

                        </div>
                    </div> :
                    <div className="pressureDefaultInformation">
                        <div className="pressureDefaultIcon"><PresureIcon disabled/></div>
                        <div className="pressureDefaultText">У вас еще нет показателей давления. Вы можете ввести
                            показатели
                            вручную.
                        </div>
                    </div> }

                <AddPressurePopUp isOpenAddPopUp={this.isOpenAddPopUp}
                                  changeTime={this.setNewDeteEditPopUp}
                                  propsState={this.state}
                                  nowData={this.getDay(2)}
                                  beforeData={this.getDay(1)}
                                  afterDate={this.getDay(3)}
                                  active={this.state.isOpenAddPopUp}
                                  isError={this.isOpenTimeErrorPopUp}
                                  isInformDay={this.isOpenDayInformDay}
                                  changeIndex={this.changeEditPopUp}
                                  smileRow={smileRow(this.smileCheck, this.state.activeSmile, 'notActive')}
                                  arrFuncForSelectType={arrForPressurePicker}
                />
                {<EditPressurePopUp propsState={this.state}
                                    diaryDate={this.props.date}
                                    close={this.closeEditPopUp}
                                    active={this.state.isEditPopUp}
                                    changeIndex={this.changeEditPopUp}
                                    changeTime={this.setNewDeteEditPopUp}
                                    smileRow={smileRow(this.smileCheck, this.state.activeSmile, 'disable')}
                                    arrFuncForSelectType={arrForPressurePicker}
                                    nowData={this.getDay(2)}
                                    beforeData={this.getDay(1)}
                                    afterDate={this.getDay(3)}
                                    isError={this.isOpenTimeErrorPopUp}
                                    isInformDay={this.isOpenDayInformDay}
                                    age={this.props.age}
                />}
                <PopUpInform_Error_10minInterval active={this.state.errorPopUp} close={this.isOpenTimeErrorPopUp}/>
                <PopUpInform_SavePreviousDay active={this.state.informDay} close={this.isOpenDayInformDay}/>
                <PopUpFirstEnter active={!this.props.isEnter && this.state.closePopUp}
                                 closePopUp={this.popUpFirstEnter}/>
                <div id="fromPDF" className="opacity0"/>

            </div>
        )
    }

}

export default connect(state => ({
        pressure: state.pressure.toJS(),
        isOpenAddPopUp: state.pressure.get('isOpenAddPopUp'),
        data: state.pressure.get('data').toJS(),
        date: state.others.get('date'),
        isEnter: state.pressure.get('isEnter'),
        age: state.profile.get('age')
    }), {
        pushPressure,
        closeAddPopUp
    }
)(pressureObj(Pressure))


function smileRow(smileCheck, activeSmile, status) {
// формируем элемент из смайлов
    let smileRow = []

    for (let i = 1; i < 6; i++) {
        smileRow.push(< Smile status={i == activeSmile ? null : status} id={i}/>)
    }
    return smileRow.map((item, i)=> {
        return (
            <div key={i + 1} onClick={smileCheck(i + 1)} className="popUpPressure--smile">{smileRow[i]}</div>)
    })
}


function arrForPressurePicker(arrStart, arrEnd) {
    //arrLength - длина массива arr = [{label:"0",value: 0},{...},{{label:"200",value: 200}}]}
    let arr = []
    for (let i = arrStart; i < arrEnd; i++) {
        arr.push({
            label: "" + i,
            value: i
        })
    }

    return arr
}
