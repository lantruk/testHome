import React, {PropTypes, Component} from 'react';
import {PresureIcon} from 'components/icons/metric_icons'
import {PressureDayOrNight_popUp, PressureNightClock_popUp} from 'components/icons/interface_icons'
import Profile_save_button from 'components/Buttons'
//import saveIsViewedPopup from 'middlewares/saveIsViewedPressurePopups.js'
//import SaveFirstEnterToPressure from 'middlewares/saveFirstEnterToPressure.js'
import Dialog from 'lib/dialog'
import DotesEclips from 'components/dotesEclips';

const SLIDES_IDS = [0, 1, 2];

class PopUpFirstEnter extends Component {

    static propTypes = {
        closePopUp: PropTypes.func.isRequired,
       // profile: PropTypes.object.isRequired,
        active: PropTypes.bool.isRequired
    }

    state = {
        stepPopUp: SLIDES_IDS[0]
    }

    changePopUo = (e) => {
        e.stopPropagation()

        const newSlide = this.state.stepPopUp !== 2 ? this.state.stepPopUp + 1 : 0;
        this.setState({
            stepPopUp: newSlide
        })
    }

    stopShowPopUpFirstEnter = (e) => {
        e.stopPropagation()
        this.props.closePopUp && this.props.closePopUp()
        const newProps = {art_pressure_viewed_popup: true};
        //this.props.profile.set(newProps)
       // SaveFirstEnterToPressure(newProps)
    }

    onClose = () => {
        this.props.closePopUp && this.props.closePopUp()
    }

    goToStep = (id, e) => {
        e.stopPropagation()

        this.setState({
            stepPopUp: id
        })
    }

    getItems() {
        switch (this.state.stepPopUp) {
            case 0:
                return {
                    icon: <PresureIcon />,
                    title: 'Приложение Давление',
                    text: <div className="popAppPressure--text">Следите за уровнем артериального давления с помощью
                        тонометра ONETRAK или используйте ручной ввод данных. Фиксируйте показатели
                        Систолического/Диастолического давления, пульс. Добавьте заметку или стикер самочувствия.</div>,
                    button: null
                }
            case 1:
                return {
                    icon: <PressureDayOrNight_popUp />,
                    title: 'Показатели давления',
                    text: <div className="popAppPressure--text">Приложение рассчитывает средние дневные и ночные
                        значения АД. К дневным относятся показатели, полученные в часы активности, к ночным - измерения
                        в моменты сна или пробуждения.</div>,
                    button: null
                }
            default:
                return {
                    icon: <PressureNightClock_popUp />,
                    title: 'Дневник давления',
                    text: <div className="popAppPressure--textWithButton">Определение суток в разделе «Давление»
                        отличается от календарного: новый день рассчитывается начиная со времени пробуждения плюс 24
                        часа. По умолчанию промежуток между 7:00 и 22:00 относится к дневному периоду, с 22:00 до 7:00 -
                        к ночному.</div>,
                    button: <Profile_save_button onClick={this.stopShowPopUpFirstEnter} text="Ок" type="grey"
                                                 style={{lineHeight: "47px", width: "188px", fontSize: '18px', marginBottom: '31px'}}/>

                }

        }
    }


    render() {
        const {icon, title, text, button} = this.getItems();
               const currentSlide = this.state.stepPopUp;

               return (
                <Dialog type="pressurePopUp"
                        light
                        onEscKeyDown={this.onClose}
                        onOverlayClick={this.onClose}
                        active={this.props.active}>

                    <div onClick={this.changePopUo} className="popAppFirstEnterPressure--window">
                        <div className="popAppPressure--image">{icon}</div>
                        <div className="popAppPressure--titleText">{title}</div>
                        {text}
                        {button}
                        <div className="Pressure--StepCircleWrap">
                            <DotesEclips list={SLIDES_IDS} checked={currentSlide} onChange={this.goToStep}/>
                        </div>
                    </div>
                </Dialog>

        )
    }
}


export default PopUpFirstEnter