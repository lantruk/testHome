import { Component, PropTypes } from 'react';
import Dialog from 'dialog';
import { CloseIcon  } from 'icons/interface_icons.js';

const GORIZONT = "gorizont";
const VERTICAL = "vertical";

class AvatarViewer extends Component {

    static propTypes = {
        active: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        onClose:  PropTypes.func
    }

    constructor(props){
        super()

        this.state = {
            viewMode: GORIZONT
        }

    }


    componentDidMount() {
        this.handleAutoresize()

        window.addEventListener('resize', this.handleAutoresize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleAutoresize)
    }


    handleAutoresize = () => {

       const height = document.documentElement.clientHeight;
       const width = document.documentElement.clientWidth;

        const viewMode = width > height ? GORIZONT : VERTICAL;

        this.setState({viewMode: viewMode})
    }

    render() {
        const { active, onClose, image } = this.props;

        const viewMode = this.state.viewMode;

        return (
            <Dialog type="avatarViewer" active={active}
                    light
                    onEscKeyDown={onClose}
                    onOverlayClick={onClose}>
                <div onClick={onClose} className="profileCrop--closeIcon"><CloseIcon /></div>
                <h3 className="AvatarViewer--header"></h3>
                <img className={"AvatarViewer--image" + (viewMode == VERTICAL ? ' __' + VERTICAL : ' __' + GORIZONT)} src={image}/>
                {/*<div style={style} className="AvatarViewer--image"></div>*/}
            </Dialog>
        )
    }
}


export default AvatarViewer