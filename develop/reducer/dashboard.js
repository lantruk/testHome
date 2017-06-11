import {LOAD_DASHBOARDDIARY_DATA, FAIL, START, SUCCESS} from '../constants.js'
import {merge, fromJS, Map} from 'immutable'

//profile key in store
const defaultState = fromJS({
    //набиваем тут те данные, что приходят с апишкой и которые будем полюбас от туда цеплять
    isLoading: false,
    consumed_calories: null,
    consumed_water: null,
    user_metrics: null,
    user_sleeps: null,
    user_goals: null,
    support_data: null,
    dataset: null,
})

export default (state = defaultState, action) => {
    const {type, payload, response, error} = action

    switch (type) {
        case LOAD_DASHBOARDDIARY_DATA + START:

            return state//.set('isLoading', true)

        case LOAD_DASHBOARDDIARY_DATA + SUCCESS:
        {
            // if(response.result == 'undefined') return state

            const {support_data, dataset}= response.result
            const {consumed_calories, consumed_water, user_metrics, user_sleeps, user_goals} = response.result.dataset


            //Новый объект с глубокой имутабельной структурой
            const newState = fromJS({
                // приходят массивы, если все сойдется, данные из них будем сразу цеплять, но если в массиве больше
                // одного индекса, нужно будет оставлять как массив
                //isLoading: true,
                consumed_calories,  //array
                consumed_water,  //array
                user_metrics,  //array
                user_sleeps,  //array
                user_goals,
                support_data: support_data, //object
                dataset: dataset, //object
            })

            //Возвращаем смерженные старый и новый profile
            return state.merge(newState).set('isLoading', true)
        }
    }

    return state
}
