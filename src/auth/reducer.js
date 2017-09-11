import types from './types'
import initialState from './initialState'

export default (state = initialState, {type, app, email, user}) => {
    switch (type) {
    case types.REGISTER_SUPER_USER:
    case types.REGISTER_USER: {
        return {
            ...state,
            user: {
                name: user.name,
                email: user.email
            }
        }
    }
    case types.PASSWORD_HELP: {
        return {
            ...state,
            user: {email}
        }
    }
    case types.REGISTER_APP: {
        return { ...state, app }
    }
    case types.LOGIN: {
        return { ...state, user }
    }
    case types.CLEAR_LOGIN:
    case types.LOGOUT: {
        return { ...initialState }
    }
    // no default
    }

    return state
}
