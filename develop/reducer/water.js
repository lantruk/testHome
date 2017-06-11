import {List, Map, fromJS} from 'immutable'
import {getISODate, dateToUrl} from 'utils'
import {
    LOAD_PROFILE_DATA,
    SUCCESS,
    START,
    SAVE_WATER,
    LOAD_CONSUMED_DATA,
    LOAD_DASHBOARDDIARY_DATA

} from '../constants.js'

const defoultState = new List


export default function (state = defoultState, action) {
    const {type, date, getState, response, rest} = action


    switch (type) {



        case LOAD_CONSUMED_DATA + START:

            const newObjWater = {
                date: getISODate(date),
                consumed_water: 0,
                goal: 0,
                water__sum: 0
            }

            const waterArr = getState.toJS()

            if (waterArr.some((day)=> {
                    return day.date == getISODate(date)
                })) {
                return state
            } else {
                return state.update(newDay => newDay.push(fromJS(newObjWater)))
            }


        case LOAD_CONSUMED_DATA + SUCCESS:
            let myDayConsumed = dateToUrl(date)
            const indexDayConsumed = state.findIndex(item => item.get('date') == myDayConsumed);

            return state.setIn([indexDayConsumed, 'water__sum'], fromJS(response.result.support_data.water_sum))

        case LOAD_DASHBOARDDIARY_DATA + SUCCESS:

            const indexDayDush = state.findIndex(item => item.get('date') == getISODate(date));

            const goal = response.result.dataset.user_goals.find(item => {
                return item.goals_type_id === 4
            }).goal

            return state.setIn([indexDayDush, 'goal'], fromJS(goal)).setIn([indexDayDush, 'consumed_water'], fromJS(response.result.dataset.consumed_water.length? response.result.dataset.consumed_water[0].calc_water : 0)).setIn([indexDayDush, 'date'], fromJS(getISODate(date)))
        case SAVE_WATER + SUCCESS:

            const { newWater } = rest
               
            const indexSaveDay = state.findIndex(item => item.get('date') == date);

            return state.setIn([indexSaveDay, 'consumed_water'], fromJS(newWater))
    }


    return state
}
