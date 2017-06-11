import { Component, PropTypes } from 'react';
import Dialog from 'lib/dialog';
import Button from 'components/Buttons/index';



class goalsConfirming extends Component {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        onClose: PropTypes.func,
        onSave: PropTypes.func
    }

    render() {
        const { active, onClose, onSave } = this.props;


        return (
            <Dialog type="goalsConfirming" active={active}
                    light
                    onEscKeyDown={onClose}
                    onOverlayClick={onClose}>
                <div className="goalsConfirming--Wrap">
                <h3 className="goalsConfirming--header">Цели и нормы</h3>
                <p className="goalsConfirming--text">Вы уверены, что хотите вернуть рекомендуемые значения для целей и норм?</p>
                <div className="goalsConfirming--buttonWrap">
                    <div className="goalsConfirming--leftButton"><Button onClick={onSave} text="Вернуть" style={{ width:"150px", lineHeight:"47px"}}  /></div>
                    <div className="goalsConfirming--rightButton"><Button onClick={onClose} text="Отмена" style={{ width:"150px", lineHeight:"47px"}} type="grey" /></div>
                </div>
                </div>
            </Dialog>
        )
    }
}


export default goalsConfirming