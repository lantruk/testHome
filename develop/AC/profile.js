import {
    LOAD_PROFILE_DATA,
    SUCCESS,
    CHECK_FULL_FUNCTIONALITY,
    PROFILE_VERIFICATION,
    START_LOADER,
    STOP_LOADER,
    ERROR_POP_UP_FROM_SERVER
} from '../constants.js';


export function loadProfileData(date, opt) {

    return {
        type: LOAD_PROFILE_DATA,
        callApi: 'api/v1/profile?tz_seconds=' + date.getTimezoneOffset() * -60,
        ...opt
    }
}

export function checkFullFunctionality() {

    return (dispatch, getState) => {

        dispatch({
            type: CHECK_FULL_FUNCTIONALITY,
            devices: getState().devices.toJS()
        })
    }
}

export function profileVerification() {

    return {
        type: PROFILE_VERIFICATION
    }
}
