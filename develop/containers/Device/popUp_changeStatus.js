import React, {PropTypes, Component} from 'react';
import Dialog from 'lib/dialog'
import Button from "components/Buttons/index"
import {STATUS_ACTIVE, STATUS_LOST, STATUS_NOTACTIVE, STATUS_GIVE} from './deviceMap'

export default  function PopUp_status(props) {

    let status = 'текст в зависимости от жмакнутого текста'
    const give = {
        inform__boldText: 'статус “Подарен”:',
        statusInform: 'устройство будет отвязано от данного аккаунта и с него будет удалена вся информация.',
        statusQuestion: 'Вы уверены, что хотите продолжить?'
    }
    const lost = {
        inform__boldText: 'статус “Потерян”:',
        statusInform: 'возможность подключения сторонних лиц к устройству будет заблокирована, информация об утере будет направлена в отдел техподдержки.',
        statusQuestion: 'Вы уверены, что хотите продолжить?'
    }
    const notActive = {
        inform__boldText: 'статус “Неактивен”:',
        statusInform: 'устройство останется привязанным к текущему аккаунту, но информация с него не будет передаваться в приложение.',
        statusQuestion: 'Вы уверены, что хотите изменить статус на “Неактивный”?”'
    }
    const active = {
        inform__boldText: 'статус “Активен”:',
        statusInform: 'устройство будет использоваться в качестве основного, информация с него будет передаваться в приложение (при синхронизации).',
        statusQuestion: 'Вы уверены, что хотите продолжить?'
    }

    let isErrorState = false

    switch (props.status) {
        case STATUS_ACTIVE:
            status = active
            break
        case STATUS_GIVE:
            status = give
            break
        case STATUS_LOST:
            status = lost
            break
        case STATUS_NOTACTIVE:
            status = notActive
            break
        default:
            status = {
                inform__boldText: 'ОШИБКА',
                statusInform: '',
                statusQuestion: ''
            }
            isErrorState = true
    }


    return (

        <Dialog active={props.active}
                type="editStatusPopUp"
                light
                onEscKeyDown={isErrorState? ()=>{console.log('ОШИБКА с получением новых данных с сервера')} : props.close}
                onOverlayClick={isErrorState? ()=>{console.log('ОШИБКА с получением новых данных с сервера')} : props.close}>

            <div className="editStatusPopUp--Window">
                {isErrorState ? null : <div>
                    <div className="StatusPopUp--title">Изменить статус</div>
                    <div className="StatusPopUp--inform">“Вашему браслету будет присвоен</div>
                </div>}
                <div className="StatusPopUp--inform__boldText">{status.inform__boldText}</div>
                <div className="StatusPopUp--statusInform">{status.statusInform}</div>
                <div className="StatusPopUp--statusQuestion">{status.statusQuestion}</div>

                {isErrorState ? null : <div>
                    <div className="editStatus--ButtonWrap__computer">
                        <Button onClick={ props.editStatusFun} text="Изменить"
                                style={{lineHeight: '47px',width: '150px'}}/>
                        <Button onClick={ props.close} text="Отмена" type='grey'
                                style={{lineHeight: '47px',width: '150px'}}/>
                    </div>
                    <div className="editStatus--ButtonWrap__mobile">
                        <Button onClick={props.editStatusFun} text="Изменить"
                                style={{lineHeight: '42px', fontSize: '14px', width: '119px'}}/>
                        <Button onClick={props.close} text="Отмена" type='grey'
                                style={{lineHeight: '42px', fontSize: '14px', width: '119px'}}/>
                    </div>
                </div> }

            </div>
        </Dialog>
    )
}


PopUp_status.propTypes = {
    close: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    editStatusFun: PropTypes.func.isRequired,
}


