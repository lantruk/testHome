import {
    LOAD_PRESSURE_DATA,
    ADD_PRESSURE,
    EDIT_PRESSURE,
    DELETE_PRESSURE,
OPEN_POP_UP_ADD,
CLOSE_POP_UP_ADD
} from '../constants.js';
import {getISODate, dateToUrl} from 'utils'


export function loadPressure(date, pressures, opt) {
    const todayDate = dateToUrl(date)//2015-07-30T08:00:00+03:00

    return (dispatch, getState) => {

            dispatch({
                type: LOAD_PRESSURE_DATA, //+ TODAY,
                callApi: '/mytrak/api/v1/arterial_pressure/?date=' + todayDate,
                date: todayDate.slice(0, 10),
                ...opt
            })
        }
 }


export function pushPressure(date, pressures, opt) {
    const beforeDate = dateToUrl(new Date(date.setDate(date.getDate() - 1)))
    const afterDate = dateToUrl(new Date(date.setDate(date.getDate() + 2)))
    date.setDate(date.getDate() - 1)
    const todayDate = dateToUrl(date)//2015-07-30T08:00:00+03:00

    return (dispatch, getState) => {

        if (!pressures.some(day => day.date == beforeDate.slice(0, 10))) {
            dispatch({
                type: LOAD_PRESSURE_DATA,
                callApi: '/mytrak/api/v1/arterial_pressure/?date=' + beforeDate,
                date: beforeDate.slice(0, 10),
                ...opt
            })
        }
        if (!pressures.some(day=> day.date == todayDate.slice(0, 10))) {
            dispatch({
                type: LOAD_PRESSURE_DATA,
                callApi: '/mytrak/api/v1/arterial_pressure/?date=' + todayDate,
                date: todayDate.slice(0, 10),
                ...opt
            })
        }
        if (!pressures.some(day=> day.date == afterDate.slice(0, 10))) {
            dispatch({
                type: LOAD_PRESSURE_DATA,
                callApi: '/mytrak/api/v1/arterial_pressure/?date=' + afterDate,
                date: afterDate.slice(0, 10),
                ...opt
            })
        }
    }

}

export function addPressure(date, options) {

    return (dispatch, getState) => {
        dispatch({
            type: ADD_PRESSURE,
            callApi: '/mytrak/api/v1/arterial_pressure/',
            method: 'POST',
            options: options,
            date: date,
            getState: getState().pressure
        })
    }
}

export function editPressure(date, options) {
    return (dispatch, getState) => {
        dispatch({
            type: EDIT_PRESSURE,
            callApi: '/mytrak/api/v1/arterial_pressure/' + options.datetime_ms_id,
            method: 'PUT',
            options: options,
            date: date,
            getState: getState().pressure
        })
    }
}

export function deletePressure(date, options) {
    return (dispatch, getState) => {

        dispatch({
            type: DELETE_PRESSURE,
            callApi: '/mytrak/api/v1/arterial_pressure/' + options.datetime_ms_id,
            method: 'DELETE',
            options: options,
            date: options.metric_time,
            deletId: options.datetime_ms_id,
            getState: getState().pressure
        })
    }
}

export function openAddPopUp() {
    return {
         type: OPEN_POP_UP_ADD
    }
}

export function closeAddPopUp() {
    return {
         type: CLOSE_POP_UP_ADD
    }
}



