import React, { Component, PropTypes } from 'react'
import smoothOpacity from '../../decorators/smoothOpacity.js'
import {INDEX_ROUTE,DIARY__ROUTE, FRIENDS_ROUTE, PROFILE_ROUTE, STATISTIC_ROUTE, DEVICES_ROUTE,
    MYTRAK_SECTION, FRIENDS_SECTION, PROFILE_SECTION, STATISTIC_SECTION, DEVICES_SECTION
} from '../../constants.js'

export const sectionsMap = {
    [DIARY__ROUTE]: MYTRAK_SECTION,
    [FRIENDS_ROUTE]: FRIENDS_SECTION,
    [PROFILE_ROUTE]: PROFILE_SECTION,
    [STATISTIC_ROUTE]: STATISTIC_SECTION,
    [DEVICES_ROUTE]: DEVICES_SECTION
}

class NaviList extends Component {

    static propTypes = {
        enabledSections: PropTypes.array.isRequired,
        profileVerify: PropTypes.object.isRequired
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    setNaviHandler = (myroute) => (e) => {
        e.preventDefault()

        const router = this.context.router
        //
        const isUnfilledProfile = this.props.profileVerify.isMistake;

        //ЕСЛИ НЕЗАПОЛНЕН ПРОВИЛЬ НИКАКИЕ ССЫЛКИ НЕ ДЕЙСТВУЮТ
        if(isUnfilledProfile) return
        //ЕСЛИ ИЗМЕНЯЕТСЯ ТЕКУЩАЯ ЛОКАЦИЯ ТО ПЕРЕКЛЮЧАЕМ РОУТ
        if (router.location.pathname !== myroute) router.push(myroute)
    }


    renderNavigationList() {
        //РЕНДЕРИМ ШАПКУ С НАВИГАЦИЕЙ СОГЛАСНО ДОСТУПНЫМ СЕКЦИЯМ
        const enabledSection = this.props.enabledSections;

      return enabledSection.map(section => (
            <li key={section}><a onClick={this.setNaviHandler(section)} href="#">{sectionsMap[section]}</a></li>
        ))
    }


    render(){

        return (<ul className="globalMenu--listMenu">{this.renderNavigationList()}</ul>)
    }
}


export default smoothOpacity(NaviList)
