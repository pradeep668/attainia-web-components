import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import auth from './components/auth/reducer'
import resources from './components/resources/reducer'

export default combineReducers({
    form,
    auth,
    resources,
    routing
})
