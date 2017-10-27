import {createBrowserHistory} from 'history'
import {mergeDeepLeft} from 'ramda'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import initialState from './initialState'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const browserHistory = createBrowserHistory()

const store = createStore(
    reducers,
    mergeDeepLeft({
        auth: {baseUrl: process.env.REACT_APP_AUTH_BASE_URL}
    }, initialState),
    composeEnhancers(applyMiddleware(routerMiddleware(browserHistory), logger))
)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
