import {PropTypes, Component} from 'react';
import Dialog from 'lib/dialog'
import Button from "components/Buttons/index"

export default function ErrorPopUp(props) {

          return (
            <Dialog active={props.active}
                    type="addPressurePopUp"
                    light
                    onEscKeyDown={ props.close}
                    onOverlayClick={ props.close}>
                <div className="addPressurePopUpWindow">
                    <div className="addPressurePopUp--timeErrorTitle">Ошибка</div>
                    <div className="addPressurePopUp--timeErrorText">Недостаточный интервал времени между измерениями!
                        Для точности полученных результатов промежуток между измерениями давления должен составлять не
                        менее 10 минут.
                    </div>
                    <div className="addPressurePopUp--timeErrorButtonWrap">
                        <Button onClick={ props.close} text="Отмена"
                                type='grey'
                                style={{lineHeight: '47px',width: '188px'}}
                        />
                    </div>
                </div>
            </Dialog>
        )


    }

    ErrorPopUp.propTypes = {
        close: PropTypes.func.isRequired,
        active: PropTypes.bool.isRequired
    }




