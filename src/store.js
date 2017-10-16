import axios from 'axios'
import {createBrowserHistory} from 'history'
import {mergeDeepLeft} from 'ramda'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import createMiddleware from 'redux-saga'

import initialState from './initialState'
import reducers from './reducers'
import rootSaga from './sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const RESOURCE_URL = process.env.REACT_APP_RESOURCES_API_BASE_URL || 'localhost'
const resourcesService = axios.create({baseURL: RESOURCE_URL})

const sagaMiddlware = createMiddleware()
const browserHistory = createBrowserHistory()

const store = createStore(
    reducers,
    mergeDeepLeft({
        auth: {baseUrl: process.env.REACT_APP_AUTH_BASE_URL}
    }, initialState),
    composeEnhancers(applyMiddleware(sagaMiddlware, routerMiddleware(browserHistory), logger))
)

sagaMiddlware.run(rootSaga, resourcesService)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
