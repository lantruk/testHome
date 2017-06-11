import React, {PropTypes, Component} from 'react';
import Dialog from 'lib/dialog'

export default  function PopUp_status(props) {

    return (

        <Dialog active={props.active}
                type="editStatusPopUp"
                light
                onEscKeyDown={()=>{console.log('ОШИБКА на уровне сервера')}}
                onOverlayClick={()=>{console.log('ОШИБКА на уровне сервера')}}>
            <div className="editStatusPopUp--Window">
                <div className="StatusPopUp--inform__boldText">ОШИБКА</div>
                <div className="StatusPopUp--statusInform">Возможно у Вас проблемы с интернет соединением. Обновите
                    страницу!
                </div>
                <div className="StatusPopUp--statusQuestion">В случае неполадок не связанных с интернетом, обратитесь в
                    техподдержку ONETRAK
                </div>
            </div>
        </Dialog>
    )
}


PopUp_status.propTypes = {
    active: PropTypes.bool.isRequired
  }

