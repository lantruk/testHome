import {List, Map, fromJS} from 'immutable'
import {getISODate, dateToUrl} from 'utils'
import {
    LOAD_PRESSURE_DATA,
    ADD_PRESSURE,
    DELETE_PRESSURE,
    EDIT_PRESSURE,
    SUCCESS,
    LOAD_PROFILE_DATA,
    OPEN_POP_UP_ADD,
    CLOSE_POP_UP_ADD

} from '../constants.js'

const defoultState = fromJS({
    data: [],
    isLoading: false,
    isEnter: false,
    isOpenAddPopUp: false
})


export default function (state = defoultState, action) {
    const {type, date, getState, deletId, options, response} = action

    switch (type) {
        case LOAD_PROFILE_DATA + SUCCESS:
            //Возвращаем смерженные старый и новый profile

            return state.setIn(['isEnter'], fromJS(response.result.dataset.art_pressure_viewed_popup))

        case LOAD_PRESSURE_DATA + SUCCESS :
            const objBefore = {
                date: date,
                indexs: response.result.dataset
            }

            return state.updateIn(['data'], day => day.push(fromJS(objBefore))).setIn(['isLoading'], true);
        case ADD_PRESSURE:

            const isThisDay = +options.metric_time.slice(11, 13) >= 7
            const thisDay = dateToUrl(date)
            const beforeDay = getISODate(new Date(new Date(thisDay).setDate(new Date(thisDay).getDate() - 1)))
            const addDay = isThisDay ? thisDay.slice(0, 10) : beforeDay  //"2017-02-13"
            const index = getState.get('data').findIndex(item => item.get('date') == addDay);

            return state.updateIn(['data', index, 'indexs'], day => day.push(fromJS(options)));
        case ADD_PRESSURE + SUCCESS:

            return state
        case EDIT_PRESSURE:

            let myDay = dateToUrl(date)
            const previousDay = getISODate(new Date(new Date(myDay).setDate(new Date(myDay).getDate() - 1)))
            const nextDay = getISODate(new Date(new Date(myDay).setDate(new Date(myDay).getDate() + 1)))
            myDay = myDay.slice(0, 10)
            const editDayString = options.metric_time.slice(0, 10) // новая дата "2017-02-13"
            const editTimeNumber = +options.metric_time.slice(11, 13) // новое время в часах от 0 до 23
            const editThisDayIndex = getState.get('data').findIndex(item => item.get('date') == myDay);
            const editPreviousDayIndex = getState.get('data').findIndex(item => item.get('date') == previousDay);
            const editNextDayIndex = getState.get('data').findIndex(item => item.get('date') == nextDay);
            const index_thisDay_dayTime = getState.get('data').getIn([editThisDayIndex]).get('indexs').findIndex(item => item.get('datetime_ms_id') == options.datetime_ms_id);

            if (editDayString == myDay && editTimeNumber >= 7 || editDayString != myDay && editTimeNumber < 7) {
                //меняю в текущем дне на дневное время или в прошлом дне на ночное время
                return state.setIn(['data', editThisDayIndex, 'indexs', index_thisDay_dayTime], fromJS(options))

            } else if (editDayString == myDay && editTimeNumber < 7) {
                //из текущего дня в ночное время прошлого дня
                return state.updateIn(['data', editPreviousDayIndex, 'indexs'], pressure => pressure.push(fromJS(options))).deleteIn(['data', editThisDayIndex, 'indexs', index_thisDay_dayTime]);

            } else if (editDayString != myDay && editTimeNumber >= 7) {
                //из прошлое ночное время меняю на дневное время завтрашнего деня
                return state.updateIn(['data', editNextDayIndex, 'indexs'], pressure => pressure.push(fromJS(options))).deleteIn(['data', editThisDayIndex, 'indexs', index_thisDay_dayTime]);

            } else {
                console.error('что-то пошло не так')
                return state
            }
        case EDIT_PRESSURE + SUCCESS:

            return state

        case DELETE_PRESSURE:
            const deleteDay = date.slice(0, 10) //"2017-02-13"
            const deleteIndexDay = getState.get('data').findIndex(item => item.get('date') == deleteDay);
            const indexsDel = getState.get('data').getIn([deleteIndexDay]).get('indexs').findIndex(item => item.get('datetime_ms_id') == deletId);

            return state.deleteIn(['data', deleteIndexDay, 'indexs', indexsDel])
        case OPEN_POP_UP_ADD:
            return state.setIn(['isOpenAddPopUp'], true)
        case CLOSE_POP_UP_ADD:
            return state.setIn(['isOpenAddPopUp'], false)

    }


    return state
}