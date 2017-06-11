import React, {PropTypes, Component} from 'react';
import Dialog from 'lib/dialog'
import {connect} from 'react-redux'
import {InputNote} from 'components/InputNote'
import {PresureIcon} from 'components/icons/metric_icons'
import Button from "components/Buttons/index"
import SelectType  from  'lib/selectType/selectType_medcart';
//import editPressureIndexes from 'middlewares/editPressureIndexes'
import {editPressure} from 'AC/pressure'
import InspectionError from "./decoratorAddPopUp.js"
import {
    getColorAndStatusFromSisPressure,
    getTimeAtString,
    getColorFromDiasPressure,
    getStatusFromPulsePressure,
    getISODate,
} from 'utils'

class EditPressureIndices extends Component {

    static propTypes = {
        propsState: PropTypes.object.isRequired,
        diaryDate: PropTypes.object.isRequired,
        close: PropTypes.func.isRequired,
        chart: PropTypes.object,
        active: PropTypes.bool.isRequired,
        changeIndex: PropTypes.func.isRequired,
        changeTime: PropTypes.func.isRequired,
        smileRow: PropTypes.array.isRequired,
        arrFuncForSelectType: PropTypes.func.isRequired,
        nowData: PropTypes.array.isRequired,
        beforeData: PropTypes.array.isRequired,
        afterDate: PropTypes.array.isRequired,
        isError: PropTypes.func.isRequired,
        isInformDay: PropTypes.func.isRequired
    }

    editPressure = () => {

        switch (true) {
            case this.props.options().upper_level <= this.props.options().lower_level:
                break
            case this.props.InspectionTimeInterval():
                this.props.isError()
                break
            case this.props.InspectionDayBefore():
                getISODate(new Date(this.props.options().datetime_ms_id)) == getISODate(this.props.date) ? this.props.isInformDay() : null
                // показывем инормационной popUp сохранения в предыдущий день когда надо!
                this.props.editPressure(this.props.date, this.props.options())
                this.props.close()
                break
            case !this.props.InspectionDayBefore():
                this.props.editPressure(this.props.date, this.props.options())
                this.props.close()
                break
        }

    }


    render() {

        const checkDate = new Date(Date.parse(this.props.propsState.editDate))
        const pulse = getStatusFromPulsePressure(this.props.propsState.pulse, this.props.age);
        const lower = getColorFromDiasPressure(this.props.propsState.lower_level, checkDate.getHours());
        const upper = getColorAndStatusFromSisPressure(this.props.propsState.upper_level, checkDate.getHours());
        const text = this.props.propsState.is_manually ? 'вручную' : getTimeAtString(this.props.propsState.editDate) + ", тонометр"


        return (

            <div className="editPressureIndexes--PopUpWrap">
                < Dialog active={this.props.active}
                         type="addPressurePopUp"
                         light
                         onEscKeyDown={this.props.close}
                         onOverlayClick={this.props.close}
                >

                    <div className="addPressurePopUpWindow">
                        <div className="addPressure--headerWrap">
                            <div className="addPressure--IconContainer">
                                <div className="addPressure--icon"><PresureIcon /></div>
                                <p> Давление </p>
                            </div>

                            <div className="addPressure--headerDateWrap">
                                <div className="addPressure--headerDate">{this.props.diaryDate.toLocaleString("ru", {
                                    month: 'long',
                                    day: 'numeric'
                                }) + ' ' + this.props.diaryDate.getFullYear() + ", " + text}</div>
                            </div>
                        </div>


                        {this.props.propsState.is_manually ? <div className="addPressure--InputTypeWrap">


                            <div className="addPressure--InputTypePressureIndexWrap">
                                <div>
                                    <div className="addPressure--InputType__text">
                                        <p>Сист.</p>
                                        <p>мм рт.ст.</p>
                                    </div>
                                    <div className="">
                                        <div className='AddPressureInputType__item'>
                                            <SelectType scroll disabled={false}
                                                        onChange={this.props.changeIndex('upper_level')}
                                                        source={this.props.arrFuncForSelectType(0, 200)}
                                                        value={this.props.propsState.upper_level}/>
                                        </div>

                                    </div>
                                </div>
                                <div className="addPressure--InputTypeSlash addPressure--InputTypeSlash__mobile">/</div>
                                <div>
                                    <div className="addPressure--InputType__text">
                                        <p>Диас.</p>
                                        <p>мм рт.ст.</p>
                                    </div>
                                    <div className="AddPressureInputType__item">
                                        <SelectType scroll disabled={false}
                                                    onChange={this.props.changeIndex('lower_level')}
                                                    source={this.props.arrFuncForSelectType(0, 200)}
                                                    value={this.props.propsState.lower_level}/>
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
                                        <SelectType scroll disabled={false} onChange={this.props.changeIndex('pulse')}
                                                    source={this.props.arrFuncForSelectType(10,200)}
                                                    value={this.props.propsState.pulse}/>
                                    </div>
                                </div>
                            </div>
                            <div className="addPressure--InputTypePressureIndexWrap">
                                <div>
                                    <div className="addPressure--InputTypeTimeText">
                                        <p>Время</p>
                                    </div>
                                    <div className="AddPressureInputType__item">
                                        <SelectType scroll disabled={false}
                                                    source={this.props.arrFuncForSelectType(0,24)}
                                                    onChange={this.props.changeTime('hours')}
                                                    value={checkDate.getHours()}/>
                                    </div>
                                </div>

                                <div className="addPressure--InputTypeColon">:</div>
                                <div className="addPressure--InputTypeTime__minutes">
                                    <div className="AddPressureInputType__item">
                                        <SelectType scroll disabled={false}
                                                    source={this.props.arrFuncForSelectType(0,60)}
                                                    onChange={this.props.changeTime('minutes')}
                                                    value={checkDate.getMinutes()}/>
                                    </div>
                                </div>
                            </div>
                        </div> :

                            <div className="editPressure--not_manuallyWrap__borderBottom">
                                <div className="editPressure--not_manuallyWrap">
                                    <div className="editPressure--tonometerBlockSis">
                                        <div className="editPressure--tonometerData">
                                            <div
                                                className={`editPressure--tonometerIndex ${upper.className}`}>{this.props.propsState.upper_level}</div>
                                            <div className="editPressure--tonometerInformWrap">
                                                <div className="editPressure--tonometerInformText">Сист</div>
                                                <div className="editPressure--tonometerUM">мм рт.ст.</div>
                                            </div>
                                        </div>
                                        <div
                                            className={`editPressure--tonometerIndexStatus ${upper.className}`}>{upper.status}</div>
                                    </div>
                                    <div className="editPressure--tonometerBlockDias">
                                        <div className="editPressure--tonometerData">
                                            <div
                                                className={`editPressure--tonometerIndex ${lower.className}`}>{this.props.propsState.lower_level}</div>
                                            <div className="editPressure--tonometerInformWrap">
                                                <div className="editPressure--tonometerInformText">Диас</div>
                                                <div className="editPressure--tonometerUM">мм рт.ст.</div>
                                            </div>
                                        </div>
                                        <div
                                            className={`editPressure--tonometerIndexStatus ${lower.className}`}>{lower.status}</div>
                                    </div>
                                    <div className="editPressure--tonometerBlockPulse">
                                        <div className="editPressure--tonometerData">
                                            <div
                                                className="editPressure--tonometerIndex">{this.props.propsState.pulse}</div>
                                            <div className="editPressure--tonometerInformWrap">
                                                <div className="editPressure--tonometerInformText">Пульс</div>
                                                <div className="editPressure--tonometerUM">уд./мин.</div>
                                            </div>
                                        </div>
                                        <div className="editPressure--tonometerIndexStatus">{pulse.status}</div>
                                    </div>
                                </div>
                            </div>
                        } {this.props.propsState.upper_level <= this.props.propsState.lower_level ?
                        <div className="sis_dias_Error">* ошибка в воде данных</div> :
                        <div className="sis_dias_Error opacity0">ошибка в воде данных</div>}
                        <div className="addPressureInputNote"><InputNote
                            disabled={true}
                            label="Лекарство"
                            hint="*** Временно недоступно"
                            value=''
                        />
                        </div>
                        <div className="addPressureInputNote"><InputNote
                            onChange={this.props.changeIndex('note')}
                            value={this.props.propsState.note}

                        />
                        </div>
                        <div className="AddPressureSmileWrap">
                            {this.props.smileRow}
                        </div>


                        <div className="AddPressure--ButtonWrap__computer">
                            <div className="AddPressure--Button">
                                <Button onClick={this.editPressure} text="Сохранить"
                                        style={{lineHeight: '47px', width: '167px', padding: "0 45px"}}/>
                            </div>
                            <div className="AddPressure--Button">
                                <Button onClick={this.props.close} text="Отменить" type='grey'
                                        style={{lineHeight: '47px',width: '167px', padding: "0 45px"}}/>
                            </div>
                        </div>
                        <div className="AddPressure--ButtonWrap__mobile">
                            <div className="AddPressure--Button">
                                <Button onClick={this.editPressure} text="Сохранить"
                                        style={{lineHeight: '42px', fontSize: '14px', width: '119px', padding: "0"}}/>
                            </div>
                            <div className="AddPressure--Button">
                                <Button onClick={this.props.close} text="Отменить" type='grey'
                                        style={{lineHeight: '42px', fontSize: '14px', width: '119px', padding: "0"}}/>
                            </div>

                        </div>
                    </div>

                </Dialog>
            </div>
        )
    }
}

export default  connect(state => ({
    date: state.others.get('date')
}), {
    editPressure
})(InspectionError(EditPressureIndices))


