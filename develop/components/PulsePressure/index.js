import {PropTypes, Component} from 'react';
import {Heart} from 'components/icons/interface_icons'


class Pulse extends Component {
    //Сердце с подписью

    static propTypes = {
        pulseIndex: PropTypes.number // Значение возле сердечка
    }

    render() {
        const {pulse} = this.props

       // if (pulse) {
            return (
                <div className="informBoard--pulse">
                    <div className="HeartrateIcon"><Heart /></div>
                    <div className="informBoard--dataPulse">{pulse? pulse : '-'}</div>
                </div>
            )
       /* } else {
            //  если не приходи значение
            return (
                <div className="informBoard--pulse ">
                    <div className="HeartrateIcon"> <Heart /></div>
                    <div className="informBoard--dataPulse">-</div>
                </div>
            )
        }
*/

    }

}

export default Pulse