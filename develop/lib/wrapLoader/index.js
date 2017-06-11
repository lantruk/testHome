import React from 'react'
import Loader from '../loader'
import Overlay from '../overlay'
import './wrapLoader.scss'

class WrapLoader extends React.Component {

    static propTypes = {
        active: React.PropTypes.bool,
        needBackground: React.PropTypes.bool
    }

    render() {

        if (this.props.needBackground) {
            return (
                <Overlay active={this.props.active} type="light"><Loader multicolor active={this.props.active}/></ Overlay>
            )
        } else {
            return (
                <div className={"wrapLoader" + (this.props.active ? ' wrapLoader__active' : '')}>
                    {this.props.active ? <Loader multicolor active={this.props.active}/> : null}
                </ div>
            )
        }
    }
}


export default WrapLoader;

