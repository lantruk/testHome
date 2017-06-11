import {my_informPopUp} from 'AC/others'

import {
    SEND_CRASH_REPORT,
    START_LOADER,
    STOP_LOADER,
    ERROR_POP_UP_FROM_SERVER,
    DATE,
    SAVE_WATER,
    CLOSE_IFORMATION_POP_UP,
    IS_ALL_LOADING,
    OPEN_IFORMATION_POP_UP,
    DELETE_PRESSURE, LOAD_PRESSURE_DATA, SUCCESS, START, ADD_PRESSURE, EDIT_PRESSURE, FAIL, CHANGE_DEVICE_STATUS
} from '../constants.js'
import {fromJS, Map} from 'immutable'

const defaultState = fromJS({
    date: new Date,
    globalLoader: false,
    mistakesReports: [],
    wrapLoader: {active: true, background: true},
    informPopUp: {active: false, text: ''}

    /*forExample
     * global popup, notifications, mistakes
     * screen modes (fullscreen, tablet, mobile)
     * */
});

//others key in stor
export default function (state = defaultState, action={}) {

    const {type, loaderBackground, newDate, caloriesIsLoading, dashboardIsLoading, pressureIsLoading, text} = action;
    let bg = loaderBackground ? loaderBackground : false


    switch (type) {

        case SEND_CRASH_REPORT:
            if (!action.options || !action.options.body) throw new Error('А где объект ошибки??');

            const mistakeObj = JSON.parse(action.options.body);

            const newMistakeList = state.get('mistakesReports').push(mistakeObj);

            return state.set('mistakesReports', newMistakeList);

        case START_LOADER:

            return state.setIn(['wrapLoader', 'active'], true).setIn(['wrapLoader', 'background'], bg)
        case STOP_LOADER:

            return state.setIn(['wrapLoader', 'active'], false).setIn(['wrapLoader', 'background'], bg)
        case DATE:

            return state.setIn(['date'], fromJS(newDate))
        /*-------------- общая загрузка -------------*/

        case CLOSE_IFORMATION_POP_UP:

            return state.setIn(['informPopUp', 'active'], false)

        case IS_ALL_LOADING:

            const isAllApiLoading = caloriesIsLoading && dashboardIsLoading && pressureIsLoading//&& isLoadingBeforeDate && isLoadingTodayDate && isLoadingAfterDate

            return state.setIn(['wrapLoader', 'active'], !isAllApiLoading).setIn(['wrapLoader', 'background'], !isAllApiLoading)

        /*-------------- для мои устройства -------------*/
        case CHANGE_DEVICE_STATUS + FAIL:

            return state.setIn(['informPopUp', 'active'], true).setIn(['informPopUp', 'text'], 'Ошибка с сервера!')

        case CHANGE_DEVICE_STATUS + SUCCESS:

            return state.setIn(['informPopUp', 'active'], true).setIn(['informPopUp', 'text'], 'Cтатус изменен!').setIn(['wrapLoader', 'active'], false)
        /*-------------- для давления -------------*/
        case LOAD_PRESSURE_DATA:
            return state.setIn(['wrapLoader', 'active'], true)
        case 'LOAD_PROFILE_DATA_SUCCESS':
            return state.setIn(['wrapLoader', 'active'], false).setIn(['wrapLoader', 'background'], false)//.setIn(['wrapLoader', 'active'], false).setIn(['wrapLoader', 'background'], false)
case 'LOAD_PRESSURE_DATA_SUCCESS':
            return state.setIn(['wrapLoader', 'active'], false).setIn(['wrapLoader', 'background'], false)//.setIn(['wrapLoader', 'active'], false).setIn(['wrapLoader', 'background'], false)


        case ADD_PRESSURE + START:

            return state.setIn(['wrapLoader', 'active'], true)
        case ADD_PRESSURE + SUCCESS:

            return state.setIn(['informPopUp', 'active'], true).setIn(['informPopUp', 'text'], 'Добавили!').setIn(['wrapLoader', 'active'], false)
        case EDIT_PRESSURE + START:

            return state.setIn(['wrapLoader', 'active'], true)
        case EDIT_PRESSURE + SUCCESS:

            return state.setIn(['informPopUp', 'active'], true).setIn(['informPopUp', 'text'], 'Исправлено!').setIn(['wrapLoader', 'active'], false)
        case DELETE_PRESSURE + START:

            return state.setIn(['wrapLoader', 'active'], true)
        case DELETE_PRESSURE + SUCCESS:

            return state.setIn(['informPopUp', 'active'], true).setIn(['informPopUp', 'text'], 'Удалено!').setIn(['wrapLoader', 'active'], false)
        /*-------------- для воды -------------*/
        case SAVE_WATER + START:
            return state.setIn(['wrapLoader', 'active'], true)
        case SAVE_WATER + SUCCESS:
            return state.setIn(['wrapLoader', 'active'], false)
         case SAVE_WATER + FAIL:
            return state.setIn(['informPopUp', 'active'], true).setIn(['informPopUp', 'text'], 'Ошибка, наверное Api')

    }


    return state


}