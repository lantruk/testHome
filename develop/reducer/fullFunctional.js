import {
    CHANGE_DEVICES_COLECTION,
    CHECK_FULL_FUNCTIONALITY,
    DEVICE_STATUS_BROKEN,
    DEVICE_STATUS_LOST,
    INDEX_ROUTE,
    FRIENDS_ROUTE,
    CHANGE_DEVICE_STATUS,
    SUCCESS,
    PROFILE_ROUTE,
    STATISTIC_ROUTE,
    DEVICES_ROUTE,
    DIARY__ROUTE,
    DIARY_ROUTE
} from '../constants.js'
import {fromJS} from 'immutable'

//full_functionality key in store
const defaultState = fromJS({
    isTrue: false,
    enabledSections: []
})

export default (state = defaultState, action) => {

    const {type, devices} = action

    switch (type) {
        //ПРОВЕРКА ПОЛНЫЙ НЕПОЛНЫЙ ФУНКЦИОНАЛ
        case CHECK_FULL_FUNCTIONALITY:

            const {bracelets} = devices;

            const sports = bracelets.filter(device => device.device_type_id === 1);
            const lifes = bracelets.filter(device => device.device_type_id === 2);
            const shkolnik = bracelets.filter(device => device.device_type_id === 16);
            const hasEnabledSport = sports.some(device => device.state === 'ACTIVE'/*null || device.state === DEVICE_STATUS_BROKEN || device.state === DEVICE_STATUS_LOST*/);
            const hasEnabledLife = lifes.some(device => device.state === 'ACTIVE'/*null || device.state === DEVICE_STATUS_BROKEN || device.state === DEVICE_STATUS_LOST*/);
            const hasShkolnik = shkolnik.some(device => device.state === 'ACTIVE');
            const isFullFunctionality = hasEnabledSport || hasEnabledLife || hasShkolnik;
            //const isFullFunctionality = false


            return fromJS({
                isTrue: isFullFunctionality,
                enabledSections: isFullFunctionality ? [DIARY__ROUTE, FRIENDS_ROUTE, PROFILE_ROUTE, STATISTIC_ROUTE, DEVICES_ROUTE] : [PROFILE_ROUTE, DEVICES_ROUTE]
            })

        default:
            return state
    }


}





