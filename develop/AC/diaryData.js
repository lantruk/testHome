import {LOAD_DASHBOARDDIARY_DATA, START, SUCCESS, LOAD_CONSUMED_DATA} from '../constants.js';
import {dateToUrl} from '../utils'


export function loadDashboardDiaryData(date, opt) {

    return (dispatch, getState) => {

        dispatch({
        type: LOAD_DASHBOARDDIARY_DATA,
        callApi: 'api/v1/user_statistic/' + dateToUrl(date),
        date: date,
        getState: getState().water,
        ...opt
              })
    }
}


export function loadConsumedFood(date, opt) {

    return (dispatch, getState) => {

        dispatch({
            type: LOAD_CONSUMED_DATA,
            callApi: '/mytrak/api/v1/consumed_food/?date=' + dateToUrl(date),
            date: date,
            getState: getState().water,
            ...opt

        })

    }


}
