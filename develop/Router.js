import React, {Component, PropTypes} from 'react'
import {Router, Route, IndexRoute, Redirect, IndexRedirect, NotFoundRoute} from 'react-router'
import {Provider, connect} from 'react-redux'
import {
    INDEX_ROUTE,
    FRIENDS_ROUTE,
    PROFILE_ROUTE,
    PRESSURE_ROUT,
    WATER_ROUT,
    DIARY_ROUTE,
    DASHBOARD_ROUT,
    STATISTIC_ROUTE,
    DEVICES_ROUTE,
    MYTRAK_SECTION,
    FRIENDS_SECTION,
    PROFILE_SECTION,
    STATISTIC_SECTION,
    DEVICES_SECTION,
    UPGRADE_ROUT,
DIARY__ROUTE,
    PAYMENT_HISTORY_ROUT
} from './constants.js'
import AppContainer from './containers/AppContainer'
import Mytrak from './containers/Mytrak'
import Friends from './containers/Friends'
import Profile from './containers/Profile'
import Statistic from './containers/Statistic'
import Device from './containers/Device'
import CategoryMenu from './containers/Device/menu.js'
import Category from './containers/Device/category.js'
import NotFoundSection from './components/NotFoundSection'
import Water from './containers/Mytrak/diary/water'
import Pressure from './containers/Mytrak/diary/pressure/index'
import Upgrade from './containers/Device/upgrade'
import Dashboard from './containers/Mytrak/dashboard'

import PaymantHistory from './containers/Device/paymentHistory/index'



export const CATEGORY_MENU = 'category_menu';
export const BRACLETS_ROUT = 'bracelets';
export const TONOMETRS_ROUT = 'tonometrs';
//export const UPGRADE_ROUT = 'upgrade';
//export const PAYMENT_HISTORY_ROUT = 'payment_history';

export const DEVICES_SUB_ROUTES = [BRACLETS_ROUT, TONOMETRS_ROUT, UPGRADE_ROUT, PAYMENT_HISTORY_ROUT]

export default class AppRouter extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    verifySubRoutes = (availedRoutes = []) => (nextRoutes, replace) => {

        //ПРОВЕРЯЕМ ЕСТЬ ЛИ РОУТЕР ВТОРОГО УРОВНЯ В ДОСТУПНЫХ ЕСЛИ НЕТ ПЕРЕВОДИМ НА РОДИТЕЛЯ
        if (!availedRoutes.some(r => r === nextRoutes.params.category)) {
            replace(nextRoutes.routes[1].path)
        }
    }


    checkAvailabedRoute = (nextRoutes, replace) => {

        const {getState} = this.props.store;

        //ЕСЛИ ПРОФИЛЬ НЕЗАПОЛНЕН ИЛИ ТАМ ЕСТЬ ОШИБКИ ТО ПЕРЕВЕДЕМ ПРИЛОЖЕНИЕ НА ПРОФИЛЬ

        /* if (getState().profile.getIn(['profileVerify', 'isMistake'])) {
         replace(PROFILE_ROUTE)
         return
         }*/

        //ЕСЛИ ЗАВЕРШЕННА ЗАГРУЗКА И ВХОД ЧЕРЕЗ АДРЕССНУЮ СТРОКУ НА НЕДОСТУПНЫЙ УРЛ ПЕРЕВЕДЕМ НА ДЕВАЙСЫ
        if (!getState().profile.get('isLoading')) {
            const enabledSections = getState().full_functionality.get('enabledSections');

            if (!enabledSections.some(r => r === nextRoutes.routes[1].path)) replace(DIARY__ROUTE)
        }
    }

    /* urlControl = (nextRoutes, replace) => {
     if (!nextRoutes.params.category)replace(INDEX_ROUTE)
     }*/

    macControl = (nextRoutes, replace) => {
        const {getState} = this.props.store;

        const devicesAtStore = getState().devices.get('bracelets')
        const myMac = nextRoutes.params.category

        const index = devicesAtStore.findIndex(item => item.get('state') == 'ACTIVE');


        if (myMac != devicesAtStore.getIn([index, 'mac'])) replace(DEVICES_ROUTE)
    }

    paymantControl = (nextRoutes, replace) => {
        const {getState} = this.props.store;
// нужно поправить, отсутствуют paymant_history и заход через адресную строку, выдает пустое окно
        console.error('когда нет paymant_history')

    }

    checkChildren = (nextRoutes, replace) => {

        if (nextRoutes.location.pathname == '/') {
            replace(DIARY__ROUTE)
        }

    }


    render() {
        const {history, store} = this.props;
        return (
            <Provider store={store}>
                <Router history={ history }>
                    <Route path="/" component={AppContainer} onEnter={this.checkChildren}>

                        {/*<IndexRoute component={Mytrak}/>*/}

                        <Route path={DIARY__ROUTE} component={Mytrak} >
                            <IndexRoute component={Dashboard}/>
                            <Route path={DASHBOARD_ROUT} component={Dashboard} onEnter={this.checkAvailabedRoute}/>
                            <Route path={PRESSURE_ROUT} component={Pressure} onEnter={this.checkAvailabedRoute}/>
                            <Route path={WATER_ROUT} component={Water}/>
                        </Route>

                        <Route path={FRIENDS_ROUTE} component={Friends} onEnter={this.checkAvailabedRoute}/>
                        <Route path={PROFILE_ROUTE} component={Profile}/>
                        <Route path={STATISTIC_ROUTE} component={Statistic} onEnter={this.checkAvailabedRoute}/>
                        <Route path={DEVICES_ROUTE} component={Device} onEnter={this.checkAvailabedRoute}>
                            <IndexRoute component={CategoryMenu}/>
                            <Route path={UPGRADE_ROUT} onEnter={this.macControl}>
                                <IndexRoute component={CategoryMenu} onEnter={this.urlControl}/>
                                <Route path=":category" component={Upgrade} onEnter={this.macControl}/>
                            </Route>

                            <Route path={PAYMENT_HISTORY_ROUT} component={PaymantHistory}
                                   onEnter={this.paymantControl}/>
                            <Route path=":category" onEnter={this.verifySubRoutes(DEVICES_SUB_ROUTES)}
                                   component={Category}/>
                        </Route>
                        <Route path='*' component={NotFoundSection}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}