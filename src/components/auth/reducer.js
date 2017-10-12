import {compose, is, toString} from 'ramda'
import types from './types'
import initialState from './initialState'

const parseError = compose(
    ([label, message]) => message || label,
    str => str.split(/error:/i),
    toString,
    err => (is(Object, err) ? err.message : err)
)

export default (
    state = initialState, {
        type, app, email, user, error, token, refreshTimeout, navigation
    }
) => {
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
                error: parseError(error),
                status: ''
            }
        case types.GET_USER_NAV_MENU:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    navigation: navigation.map(label => ({label}))
                }
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
                refreshTimeout: clearTimeout(state.refreshTimeout) || refreshTimeout
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
        case types.REMEMBER_ME:
            return {
                ...state,
                rememberMe: !state.rememberMe
            }
        case types.UPDATED_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user,
                    token
                }
            }
        // no default
    }

    return state
}
