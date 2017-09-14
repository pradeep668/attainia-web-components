import types from './types'

export const cancel = () =>
    ({type: types.CANCEL})
export const handleError = (error) =>
    ({error, type: types.ERROR})
export const gotoPasswordHelp = () =>
    ({type: types.GOTO_PASSWORD_HELP})
export const gotoRegistration = () =>
    ({type: types.GOTO_REGISTRATION})
export const gotoAppRegistration = () =>
    ({type: types.GOTO_APP_REGISTRATION})
export const passwordHelp = email =>
    ({email, type: types.PASSWORD_HELP})
export const registerUser = user =>
    ({user, type: types.REGISTER_USER})
export const registerSuperUser = user =>
    ({user, type: types.REGISTER_SUPER_USER})
export const registerApp = app =>
    ({app, type: types.REGISTER_APP})
export const login = user =>
    ({user, type: types.LOGIN})
export const logout = () =>
    ({type: types.LOGOUT})
