import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import Dialog from '../../../../lib/dialog' //lib/dialog'
import {addPressure} from 'AC/pressure'
//import savePressureIndexes from 'middlewares/savePressureIndexes'
import SelectType  from  '../../../../lib/selectType/selectType_medcart';
import {InputNote} from 'components/InputNote'
import {PresureIcon} from 'components/icons/metric_icons'
import Button from "components/Buttons/index"
import InspectionError from "./decoratorAddPopUp.js"



class AddPressurePopUp extends Component {

    static propTypes = {
        isOpenAddPopUp: PropTypes.func.isRequired,
        changeTime: PropTypes.func.isRequired,
        chart: PropTypes.object,
        propsState: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
        nowData: PropTypes.array.isRequired,
        beforeData: PropTypes.array.isRequired,
        afterDate: PropTypes.array.isRequired,
        active: PropTypes.bool,
        isError: PropTypes.func.isRequired,
        isInformDay: PropTypes.func.isRequired,
        changeIndex: PropTypes.func.isRequired,
        smileRow: PropTypes.array.isRequired,
        arrFuncForSelectType: PropTypes.func.isRequired
    }

    savePressure = () => {
        switch (true) {
            case this.props.propsState.upper_level <= this.props.propsState.lower_level:
                break
            case this.props.InspectionTimeInterval():
                this.props.isError()
                break
            case this.props.InspectionDayBefore():
                this.props.isInformDay()
                    //savePressureIndexes(this.props.options())
                this.props.isOpenAddPopUp()
                this.props.addPressure(this.props.date, this.props.options())
                this.noteRefresh()
                break
            case !this.props.InspectionDayBefore():
                this.props.isOpenAddPopUp()
                //savePressureIndexes(this.props.options())
                 this.props.addPressure(this.props.date, this.props.options())
                this.noteRefresh()
                break
        }
    }

    state = {
        value: ''
    }

    saveNote = () => {
        this.props.changeIndex('note')(this.state.value)

    }

    changeNote = (e) => {
        this.setState({
            value: e.value
        })
    }

    noteRefresh = ()=> {
        this.setState({
            value: ''
        })
    }

    cancelFunc = () => {
        this.props.isOpenAddPopUp()
        this.setState({
            value: ''
        })
    }

    render() {


        return (
            <div>
                < Dialog active={this.props.active}
                         type="addPressurePopUp"
                         light
                         onEscKeyDown={this.props.isOpenAddPopUp}
                         onOverlayClick={this.props.isOpenAddPopUp}
                >
                    {<div className="addPressurePopUpWindow">
                         <div className="addPressure--headerWrap">
                                <div className="addPressure--IconContainer">
                                    <div className="addPressure--icon"><PresureIcon /></div>
                                    <p> Давление </p>
                                </div>

                                <div className="addPressure--headerDateWrap">
                                    <div
                                        className="addPressure--headerDate">{new Date(this.props.date).toLocaleString("ru", {
                                        month: 'long',
                                        day: 'numeric'
                                    }) + ' ' + new Date(this.props.date).getFullYear() + ", вручную"}</div>
                                </div>
                            </div>
                        <div className="addPressurePopUpWindow2">

                            <div className="addPressure--InputTypeWrap">

                                <div className="addPressure--InputTypePressureIndexWrap">
                                    <div>
                                        <div className="addPressure--InputType__text">
                                            <p>Сист.</p>
                                            <p>мм рт.ст.</p>
                                        </div>
                                        <div className="">
                                            <div className="AddPressureInputType__item">
                                                {<SelectType scroll disabled={false}
                                                             onChange={this.props.changeIndex('upper_level')}
                                                             source={this.props.arrFuncForSelectType(0,200)}
                                                             value={this.props.propsState.upper_level}/>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="addPressure--InputTypeSlash addPressure--InputTypeSlash__mobile">/
                                    </div>
                                    <div>
                                        <div className="addPressure--InputType__text">
                                            <p>Диас.</p>
                                            <p>мм рт.ст.</p>
                                        </div>
                                        <div className="AddPressureInputType__item">
                                            {<SelectType scroll disabled={false}
                                                         onChange={this.props.changeIndex('lower_level')}
                                                         source={this.props.arrFuncForSelectType(0,200)}
                                                         value={this.props.propsState.lower_level}/>}
                                        </div>
                                    </div>
                                </div>

                                <div className="addPressure--InputTypePressureIndexWrap">
                                    <div>
                                        <div className="addPressure--InputType__text">
                                            <p>Пульс</p>
                                            <p>ударов/мин</p>
                                        </div>
                                        <div className="AddPressureInputType__item">
                                            { <SelectType scroll disabled={false}
                                                          onChange={this.props.changeIndex('pulse')}
                                                          source={this.props.arrFuncForSelectType(10,200)}
                                                          value={this.props.propsState.pulse}/>}
                                        </div>
                                    </div>
                                </div>
                                <div className="addPressure--InputTypePressureIndexWrap">
                                    <div>
                                        <div className="addPressure--InputTypeTimeText">
                                            <p>Время</p>
                                        </div>
                                        <div className="AddPressureInputType__item">
                                            {<SelectType scroll disabled={false}
                                                         onChange={this.props.changeTime('hours')}
                                                         source={this.props.arrFuncForSelectType(0,24)}
                                                         value={new Date(this.props.propsState.timeNow).getHours()}/>}
                                        </div>
                                    </div>
                                    <div className="addPressure--InputTypeColon">:</div>
                                    <div className="addPressure--InputTypeTime__minutes">
                                        <div className="AddPressureInputType__item">
                                            {<SelectType scroll disabled={false} onChange={this.props.changeTime('min')}
                                                         source={this.props.arrFuncForSelectType(0,60)}
                                                         value={new Date(this.props.propsState.timeNow).getMinutes()}/>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {this.props.propsState.upper_level <= this.props.propsState.lower_level ?
                                <div className="sis_dias_Error">* ошибка в воде данных</div> :
                                <div className="sis_dias_Error opacity0">ошибка в воде данных</div>}
                            <div className="addPressureInputNote"><InputNote
                                disabled={true}
                                label="Лекарство"
                                hint="*** Временно недоступно"
                                value=''
                            />
                            </div>
                            <div onBlur={this.saveNote} className="addPressureInputNote"><InputNote
                                onChange={this.changeNote}
                                value={this.state.value}
                            />
                            </div>


                            <div className="AddPressureSmileWrap">
                                {this.props.smileRow}
                            </div>


                            <div className="AddPressure--ButtonWrap__computer">
                                <div className="AddPressure--Button">
                                    <Button onClick={this.savePressure} text="Сохранить"
                                            style={{lineHeight: '47px', width: '167px', padding: "0 45px"}}/>
                                </div>
                                <div className="AddPressure--Button">
                                    <Button onClick={this.cancelFunc} text="Отменить" type='grey'
                                            style={{lineHeight: '47px',width: '167px', padding: "0 45px"}}/>
                                </div>
                            </div>
                            <div className="AddPressure--ButtonWrap__mobile">
                                <div className="AddPressure--Button">
                                    <Button onClick={this.savePressure} text="Сохранить"
                                            style={{lineHeight: '42px', fontSize: '14px', width: '119px', padding: "0"}}/>
                                </div>
                                <div className="AddPressure--Button">
                                    <Button onClick={this.cancelFunc} text="Отменить" type='grey'
                                            style={{lineHeight: '42px', fontSize: '14px', width: '119px', padding: "0"}}/>
                                </div>
                            </div>
                        </div>

                    </div>}
                </Dialog>

            </div>
        )
    }
}


export default  connect(state => ({
        date: state.others.get('date')
    }),{
    addPressure
}
)(InspectionError(AddPressurePopUp))


  




