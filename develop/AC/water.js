import {
    SAVE_WATER
   } from '../constants.js';

import {getISODate, dateToUrl} from 'utils'

export function saveWater(opt) {
    const {date, options, callApi, newWater, method} = opt
    
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_WATER,
            callApi: callApi,
            method: method,
            options: options,
            newWater: newWater,
            date: getISODate(date)

        })
    }
}




