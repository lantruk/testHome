import React, {PropTypes, Component} from 'react';
import Dialog from 'lib/dialog'
import Button from "components/Buttons/index"

export default  function PopUp_isActiveStatus(props) {

    return (
        <div>{


            <Dialog active={props.active}
                    type="editStatusPopUp"
                    light
                    onEscKeyDown={ props.close}
                    onOverlayClick={ props.close}>

                <div className="editStatusPopUp--Window">
                    <div className="StatusPopUp--title">Изменить статус</div>
                    <div className="StatusPopUp--inform">К одному аккаунту не может быть привязано два браслета со
                        статусом
                        "Активен". Сначала измените статус браслета, который используется в качестве основного, с
                        "Активен"
                        на "Неактивен". После этого вы сможете поставить статус "Активен" тому браслету, которым хотите
                        пользоваться.
                    </div>
                    <div className="editStatus--isActiveStatus">
                        <Button onClick={ props.close} text="Ок" type='grey'
                                style={{lineHeight: '47px',width: '150px'}}/>
                    </div>
                </div>

            </Dialog> }
        </div>


    )
}


PopUp_isActiveStatus.propTypes = {
    close: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,


}
