import {compose, createStore, applyMiddleware} from 'redux'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import {createBrowserHistory} from 'history'
import createMiddleware from 'redux-saga'
import logger from 'redux-logger'
import axios from 'axios'

import reducers from './reducers'
import rootSaga from './sagas'
import constants from './constants'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const {API_URL} = constants.resources
const resourcesService = axios.create({baseURL: API_URL})
const sagaMiddlware = createMiddleware()
const browserHistory = createBrowserHistory()
const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(sagaMiddlware, routerMiddleware(browserHistory), logger))
)

sagaMiddlware.run(rootSaga, resourcesService)

export const history = syncHistoryWithStore(browserHistory, store)

export default store
