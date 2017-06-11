import {LOAD_PROFILE_DATA, SUCCESS} from '../constants.js'
import {fromJS, Map} from 'immutable'

//suport_data key in stor
export default function (state = Map({}), action) {
    const {type, response} = action

    switch (type) {
        case LOAD_PROFILE_DATA + SUCCESS:
            return fromJS(response.result.support_data)
        default:
            return state
    }
}