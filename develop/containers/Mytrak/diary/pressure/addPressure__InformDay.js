import React, {PropTypes, Component} from 'react';
import Dialog from 'lib/dialog'
import Button from "components/Buttons/index"

export default  function AddPressure__InformDay(props) {

        return (

            <Dialog active={props.active}
                    type="addPressurePopUp"
                    light
                    onEscKeyDown={ props.close}
                    onOverlayClick={ props.close}>
                <div className="addPressurePopUpWindow">
                    <div className="addPressurePopUp--informDayTitle">Внимание</div>
                    <div className="addPressurePopUp--informDayText">Значение сохранено в дневник предыдущего дня. За
                        более детальной информацией обратитесь в
                    </div>
                    <div className="addPressurePopUp--informDayInformation">раздел «Справка»</div>
                    <div className="addPressurePopUp--informDayButtonWrap">
                        <Button onClick={ props.close} text="Ок" type='grey'
                                style={{lineHeight: '47px',width: '188px'}}/>
                    </div>
                </div>
            </Dialog>
        )
}

  AddPressure__InformDay.propTypes = {
        close: PropTypes.func.isRequired,
        active: PropTypes.bool.isRequired
    }
