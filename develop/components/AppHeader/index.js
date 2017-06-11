import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LogoOT from '../icons/LogoOT'
import './appHeader.scss'
import DecoratedNaviList from '../HeaderNaviList'


class AppHeader extends Component {

    static propTypes = {
        enabledSections: PropTypes.array.isRequired,
        profileVerify: PropTypes.object.isRequired
    }


    render() {
        const {enabledSections, profileVerify} = this.props

        return (
            <nav className="globalMenu">
                <div className="globalMenu--wrapp">
                    <a className="globalMenu--logoOnetrak" href="/">
                        <LogoOT />
                    </a>
                    <div className="globalMenu--sectionMenu">
                        {enabledSections.length ?
                            <DecoratedNaviList enabledSections={enabledSections} profileVerify={profileVerify}/> : null}
                    </div>
                    <div className="globalMenu--RightCorner">
                        <div href="#" className="globalMenu--BellWrap __hidden">
                            <div className="globalMenu--BellIcon"></div>
                            <span className="globalMenu--BellNotification">0</span></div>
                        <div href="#" className="globalMenu--Profile">
                            <div className="globalMenu--ProfileImageWrap">
                                <div className="globalMenu--ProfileImage" style={{
                                'backgroundImage': `url(${this.props.avatar_url? this.props.avatar_url: '/static/mytrak/public/img/profile_null.jpg'})`}}></div>
                            </div>
                            <span
                                className="globalMenu--UserName">{`${this.props.first_name? this.props.first_name : ''}  ${this.props.last_name? this.props.last_name : ''} `}</span>
                        </div>
                        <div className="miniMenu">
                            <ul>
                                <li className="miniMenu--toMyProf">Профиль</li>
                                <li className="miniMenu--toLogout">Выход</li>
                            </ul>
                        </div>
                        <div className="menuTrigger" href="#"></div>
                    </div>
                </div>
            </nav>
        )
    }

}


export default connect(state => ({
    first_name: state.profile.get('first_name'),
    last_name: state.profile.get('last_name'),
    avatar_url: state.profile.get('avatar_url')
}), {})(AppHeader)



