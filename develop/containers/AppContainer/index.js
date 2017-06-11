import React, {Component, PropTypes} from 'react'
import {Provider, connect} from 'react-redux'
import AppHeader from 'components/AppHeader'
import {loadProfileData, checkFullFunctionality, profileVerification} from '../../AC/profile.js'
import {loadDashboardDiaryData, loadConsumedFood} from '../../AC/diaryData'
import {isAllLoading} from 'AC/others'
import {loadPressure} from '../../AC/pressure'
import sendCrashReport from 'middlewares/sendCrashReport'
import WrapLoader from 'lib/wrapLoader'
import InformPopUp from 'components/InformPopUp_my_text'
import {PROFILE_ROUTE, DIARY__ROUTE} from 'constants.js'
import 'styles/global.scss';
//import {sendCrashReport} from '../../AC/others.js'
//import {getCrashReport} from 'utils'


class AppContainer extends Component {

    static propTypes = {
        enabledSections: PropTypes.array.isRequired,
        profileVerify: PropTypes.object.isRequired,
        profileIsLoading: PropTypes.bool.isRequired,
        // sendCrashReport: PropTypes.func.isRequired,
        loadDashboardDiaryData: PropTypes.func.isRequired,
        loadConsumedFood: PropTypes.func.isRequired,
        loadPressure: PropTypes.func.isRequired,
        pressuresArr: PropTypes.array.isRequired,
        wrapLoader: PropTypes.object.isRequired,
        dashboardIsLoading: PropTypes.bool.isRequired,
        caloriesIsLoading: PropTypes.bool.isRequired,
        pressureIsLoading: PropTypes.bool.isRequired,
       // isLoadingBeforeDate: PropTypes.bool.isRequired,
       // isLoadingTodayDate: PropTypes.bool.isRequired,
        //isLoadingAfterDate: PropTypes.bool.isRequired,
        informPopUp: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }


    componentWillReceiveProps(nextProps) {

        const router = this.context.router;

        //ЕСЛИ ОБНАРУЖЕННО ЧТО В ПРОФИЛЕ ЕСТЬ НЕЗАПОЛНЕННЫЕ ДАННЫЕ ПЕРЕВЕДЕМ РОУТ НА ПРОФИЛЬ
        //ТАКАЯ ЖЕ ПРОВЕРКА ЕСТЬ В РОУТЕРЕ НО ОНА НЕ РЕАГИРУЕТ НА ИЗМЕНЕНИЕ ДАННЫХ А ТОЛЬКО НА ИЗМЕНЕННИЕ В АДРЕССНОЙ СТРОКЕ
        if (!this.props.profileVerify.isMistake && nextProps.profileVerify.isMistake) {
            router.replace(PROFILE_ROUTE)
            return
        }

        //ПОСЛЕ ЗАГРУЗКИ КОГДА СФОРМИРУЕТСЯ ДОСТУПНЫЕ РОУТЫ ПРОВЕРИТЬ ДОСТУПЕН ЛИ ЭТОТ УРЛ И ПЕПЕРЕСТИ НА ДЕВАЙСЫ ЕСЛИ НЕТ
        if (!this.props.enabledSections.length && nextProps.enabledSections.length) {
            //смотрим только по корневому роуту router.routes[1].path
            if (!nextProps.enabledSections.some(s => s === router.routes[1].path)) router.replace(DIARY__ROUTE)
        }

    }

    componentWillMount() {
        window.onerror = (mes, url, line, column, errObj) => {
            // const report = getCrashReport(url, errObj, line, column, mes);
            sendCrashReport(url, errObj, line, column, mes)
            // this.props.sendCrashReport( JSON.stringify(report))
        };
        this.props.loadProfileData(new Date(), {

            onSuccess: (res) => {

                this.props.checkFullFunctionality();
                this.props.profileVerification();

                this.props.loadConsumedFood(new Date(), {
                    onSuccess: (res) => {
                        this.props.isAllLoading(this.props)
                    }
                })
                this.props.loadDashboardDiaryData(new Date(), {
                    onSuccess: (res) => {
                        this.props.isAllLoading(this.props)
                    }
                });
                this.props.loadPressure(new Date(), this.props.pressuresArr, {
                    onSuccess: (res) => {
                        this.props.isAllLoading(this.props)
                    }
                });
                           }
        });

    }

    render() {
        const {profileIsLoading, enabledSections, profileVerify, wrapLoader:{active, background}} = this.props;


        return (
            <div className="appContainer">
                {/*
                 Здесь может быть глобальный попап или сообщения
                 */}
                <AppHeader enabledSections={enabledSections} profileVerify={profileVerify}/>
                <div className="appContainerBody">
                    {profileIsLoading  ? this.props.children : null} {/*если идет главный запрос то ничего не показываем*/}
                </div>
                <WrapLoader active={active} needBackground={background}/>

                <InformPopUp active={this.props.informPopUp.active} text={this.props.informPopUp.text}/>
            </div>
        )
    }

}


export default connect(state => {
    //Может быть куча логики

    return {
        profileVerify: state.profile.get('profileVerify').toJS(),
        enabledSections: state.full_functionality.get('enabledSections').toJS(),
        profileIsLoading: state.profile.get('isLoading'),
        wrapLoader: state.others.get('wrapLoader').toJS(),
        dashboardIsLoading: state.dashboard.get('isLoading'),
        caloriesIsLoading: state.calories.get('isLoading'),
        pressureIsLoading: state.pressure.get('isLoading'),
        //isLoadingBeforeDate: state.pressure.get('isLoadingBeforeDate'),
        //isLoadingTodayDate: state.pressure.get('isLoadingTodayDate'),
        //isLoadingAfterDate: state.pressure.get('isLoadingAfterDate'),
        pressuresArr: state.pressure.get('data').toJS(),
        informPopUp: state.others.get('informPopUp').toJS(),
        date: state.others.get('date')
    }
}, {
    loadProfileData,
    checkFullFunctionality,
    profileVerification,
    loadDashboardDiaryData,
    loadConsumedFood,
    loadPressure,
    isAllLoading,
    // sendCrashReport,

})(AppContainer)


