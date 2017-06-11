import {LOAD_CONSUMED_DATA, FAIL, START, SUCCESS} from '../constants.js'
import {merge, fromJS, Map} from 'immutable'

//profile key in store
const defaultState = fromJS({
    isLoading: false,
    responseData: null // {}
})

export default (state = defaultState, action) => {
    const {type, payload, response, error} = action

    switch (type) {
       
        case LOAD_CONSUMED_DATA + SUCCESS:

            const responseData = {}

            responseData.support_data = response.result.support_data
            responseData.dataset = response.result.dataset

            return state.set('isLoading', true).merge(fromJS({responseData}))
    }

    return state
}
