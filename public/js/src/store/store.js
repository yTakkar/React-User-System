import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import user from '../reducers/user-reducer'

const reducers = combineReducers({
    user
})

const middlewares = applyMiddleware(promise(), thunk, logger)

const store = createStore(
    reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middlewares
)

export default store