import {is} from 'ramda'
import types from './types'
import initialState from './initialState'

export default (state = initialState, {type, app, email, user, error, refreshTimeout}) => {
    switch (type) {
        case types.CANCEL:
            return {
                ...state,
                route: 'login',
                status: ''
            }
        case types.CLEAR_ERROR:
            return {
                ...state,
                error: '',
                status: ''
            }
        case types.CLEAR_REFRESH:
            return {
                ...state,
                refreshTimeout: clearTimeout(state.refreshTimeout)
            }
        case types.CLEAR_LOGIN:
            return {...initialState}
        case types.ERROR:
            return {
                ...state,
                error: is(Object, error) ? error.message : error,
                status: ''
            }
        case types.GOTO_APP_REGISTRATION:
            return {
                ...state,
                route: 'application',
                status: ''
            }
        case types.GOTO_PASSWORD_HELP:
            return {
                ...state,
                route: 'password-help',
                status: ''
            }
        case types.GOTO_REGISTRATION:
            return {
                ...state,
                route: 'registration',
                status: ''
            }
        case types.LOGIN:
            return {
                ...state,
                user,
                route: 'home',
                status: 'login'
            }
        case types.LOGOUT:
            return {
                ...initialState,
                status: 'logout'
            }
        case types.PASSWORD_HELP:
            return {
                ...state,
                route: 'login',
                status: 'password',
                user: {email}
            }
        case types.REFRESH:
            return {
                ...state,
                refreshTimeout
            }
        case types.REGISTER_APP:
            return {
                ...state,
                app,
                route: 'login',
                status: ''
            }
        case types.REGISTER_USER:
            return {
                ...state,
                route: 'login',
                status: '',
                user: {
                    name: user.name,
                    email: user.email
                }
            }
        // no default
    }

    return state
}
