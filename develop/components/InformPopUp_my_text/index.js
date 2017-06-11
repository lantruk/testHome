import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import Dialog from 'lib/dialog'
import {close_informPopUp} from '../../AC/others'

class InformPopUp extends Component {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        text: PropTypes.string
    }

     componentWillReceiveProps(nextProps) {
         if(nextProps.active){
             setTimeout(()=>{
               this.props.close_informPopUp()
             },
                 1000);
         }
     }

    state = {
        active: false
    }



    render() {


        return (

            <Dialog active={this.props.active}
                    type="editStatusPopUp"
                    light
                    onEscKeyDown={()=>{console.log('Данные уже изменены')}}
                    onOverlayClick={()=>{console.log('Данные уже изменены')}}>
                <div className="editStatusPopUp--Window">
                    <div
                        className="StatusPopUp--inform__boldText">{this.props.text}</div>

                </div>
            </Dialog>
        )
    }

}
export default connect(state => ({

    }),
    {
       close_informPopUp
    }
)(InformPopUp)
