import {
    SEND_CRASH_REPORT,
    START_LOADER,
    DATE,
    IS_ALL_LOADING,
    STOP_LOADER,
    CLOSE_IFORMATION_POP_UP,
    OPEN_IFORMATION_POP_UP
   } from '../constants.js';

export function sendCrashReport(body) {

    return {
        type: SEND_CRASH_REPORT,
        callApi: '../frontend_crash_report/v1/add_crash',
        options: {
            method: 'POST',
            headers: {
                'content-Type': "application/json;"
            },
            body
        }
    }
}

export function isAllLoading(props) {

    return (dispatch, getState) => {

        dispatch({
            type: IS_ALL_LOADING,
            pressureIsLoading: props.pressureIsLoading,
           /* isLoadingBeforeDate: props.isLoadingBeforeDate,
            isLoadingTodayDate: props.isLoadingTodayDate,
            isLoadingAfterDate: props.isLoadingAfterDate,*/
            caloriesIsLoading: props.caloriesIsLoading,
            dashboardIsLoading: props.dashboardIsLoading
        })
    }
}


export function my_informPopUp(text) {

    return (dispatch, getState) => {

        dispatch({
            type: OPEN_IFORMATION_POP_UP,
            text: text
        })
    }
}

export function close_informPopUp(text) {

    return (dispatch, getState) => {

        dispatch({
            type: CLOSE_IFORMATION_POP_UP,
            text: text
        })
    }
}

export function startloader(opt) {

    return (dispatch, getState) => {

        dispatch({
            type: START_LOADER,
            loaderBackground: opt,
            profile: getState().profile
        })
    }
}

export function stoploader(opt) {

    return (dispatch, getState) => {

        dispatch({
            type: STOP_LOADER,
            loaderBackground: opt,
            profile: getState().profile
        })
    }
}


export function changeMyDay(newDate) {

    return {
        type: DATE,
        newDate: newDate

    }

}