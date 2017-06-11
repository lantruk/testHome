import { createStore, applyMiddleware, compose } from 'redux'
import { Iterable } from 'immutable'
import reducers from '../reducer'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import callApi from '../middlewares/callApi.js'
//import { routerMiddleware } from 'react-router-redux'



const logger = createLogger({
    stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
            if (Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        }

        return newState;
    },
    collapsed: true
})

const enhancer = compose(
    applyMiddleware( thunk, callApi, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, {}, enhancer);


// store.subscribe(() => {
//     console.log('STORE', store.getState())
// })


window.store = store

export default store
