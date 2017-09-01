import types from './types'
import initialState from './initialState'

export default (state = initialState, action) => {
    switch (action.type) {
    case types.REGISTER:
    case types.LOGIN: {
        return {
            ...state,
            user: action.data
        }
    }
    case types.PASSWORD_HELP:
    case types.LOGOUT: {
        return {
            ...state,
            user: {}
        }
    }
    // no default
    }

    return state
}
