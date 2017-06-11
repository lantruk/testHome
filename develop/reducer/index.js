import { combineReducers } from 'redux'
import consumedReducer  from './consumed_calories'
import dashboardReducer  from './dashboard'
import profileReducer  from './profile'
import water  from './water'

import pressure from './pressure'
import devicesReducer  from './devices.js'
import fullFuntionalityReducer  from './fullFunctional.js'
//import supportDataReducer from './support_data.js'
import otherReducer from './others.js'
import { routerReducer } from 'react-router-redux'



export default combineReducers({
    pressure: pressure,
    calories: consumedReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
    water: water,
    devices: devicesReducer,
    full_functionality: fullFuntionalityReducer,
    routing: routerReducer, //Плагин для того чтобы видеть в DEVTools и и в сторе смену роутов
    //support_data: supportDataReducer,
    others: otherReducer
    
})
