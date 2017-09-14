import types from './types'
import initialState from './initialState'

export default (state = initialState, {type, app, email, user, error}) => {
    switch (type) {
    case types.CANCEL: {
        return {
            ...state,
            route: 'login'
        }
    }
    case types.ERROR: {
        return {
            ...state,
            error
        }
    }
    case types.GOTO_REGISTRATION: {
        return {
            ...state,
            route: 'registration'
        }
    }
    case types.GOTO_APP_REGISTRATION: {
        return {
            ...state,
            route: 'application'
        }
    }
    case types.GOTO_PASSWORD_HELP: {
        return {
            ...state,
            route: 'password-help'
        }
    }
    case types.REGISTER_SUPER_USER:
    case types.REGISTER_USER: {
        return {
            ...state,
            route: 'login',
            user: {
                name: user.name,
                email: user.email
            }
        }
    }
    case types.PASSWORD_HELP: {
        return {
            ...state,
            route: 'login',
            user: {email}
        }
    }
    case types.REGISTER_APP: {
        return { ...state, app, route: 'login' }
    }
    case types.LOGIN: {
        return { ...state, user, route: 'home' }
    }
    case types.CLEAR_LOGIN:
    case types.LOGOUT: {
        return { ...initialState }
    }
    // no default
    }

    return state
}
