import Duck from 'extensible-duck'
import {complement, omit, converge, memoize, last, identity, init, path, trim, compose, is, toString} from 'ramda'

import {isStringieThingie} from './validators'

const ONE_HOUR = 3600000

const createSelector = (...selectors) => memoize(converge(last(selectors), init(selectors)))

const parseError = compose(
    trim,
    ([label, message]) => message || label,
    str => str.split(/error:/i),
    val => (is(String, val) ? val : toString(val)),
    err => (is(Object, err) ? err.message : err)
)

export default new Duck({
    store: 'auth',
    namespace: 'awc',
    types: [
        'CLEAR_LOGIN',
        'CLEAR_ERROR',
        'CLEAR_REFRESH',
        'CONFIRM_USER_REGISTRATION',
        'DECODED_JWT',
        'ERROR',
        'GET_USER_NAV_MENU',
        'LOADING_FINISHED',
        'LOADING_STARTED',
        'LOGIN',
        'LOGOUT',
        'PARSED_TOKEN',
        'PASSWORD_HELP',
        'REFRESH',
        'REGISTER_APP',
        'REGISTER_USER',
        'REMEMBER_ME',
        'UPDATED_TOKEN',
        'USER_INFO_FROM_TOKEN',
        'VALIDATED_TOKEN'
    ],
    initialState: {
        app: {},
        baseUrl: 'localhost',
        error: '',
        loading: false,
        menu: {
            navigation: [],
            profile: []
        },
        rememberMe: false,
        storageType: 'local',
        user: {}
    },
    selectors: {
        root: identity,
        error: path(['auth', 'error']),
        id: path(['auth', 'user', 'id']),
        name: path(['auth', 'user', 'name']),
        role: path(['auth', 'user', 'role']),
        email: path(['auth', 'user', 'email']),
        parsedToken: path(['auth', 'parsed_token']),
        token: path(['auth', 'user', 'token', 'access_token']),
        navigationItems: path(['auth', 'menu', 'navigation']),
        storedToken: new Duck.Selector(selectors =>
            createSelector(
                selectors.token,
                selectors.parsedToken,
                (t, pt) => t || pt
            )
        ),
        hasUser: new Duck.Selector(selectors =>
            createSelector(
                selectors.id,
                selectors.name,
                (...props) => props.every(isStringieThingie)
            )
        ),
        hasAuthError: new Duck.Selector(selectors => createSelector(selectors.error, Boolean)),
        isAuthenticated: new Duck.Selector(selectors => createSelector(selectors.id, isStringieThingie)),
        isNotAuthenticated: new Duck.Selector(selectors => createSelector(selectors.id, complement(isStringieThingie))),
        expires_in: path(['auth', 'user', 'token', 'expires_in']),
        refreshInMs: new Duck.Selector(selectors =>
            createSelector(
                selectors.expires_in,
                expiresIn => Math.max((Number(expiresIn || ONE_HOUR) - 10) * 1000, 0)
            )
        ),
        refreshAt: new Duck.Selector(selectors =>
            createSelector(
                selectors.refreshInMs,
                refreshInMs => new Date(Date.now() + refreshInMs)
            )
        )
    },
    creators: ({types}) => ({
        handleError: error => ({error, type: types.ERROR}),
        clearError: () => ({type: types.CLEAR_ERROR}),
        confirmRegistration: () => ({type: types.CONFIRM_USER_REGISTRATION}),
        decodedJwt: jwt => ({jwt, type: types.DECODED_JWT}),
        getUserNavMenu: navigation => ({navigation, type: types.GET_USER_NAV_MENU}),
        passwordHelp: email => ({email, type: types.PASSWORD_HELP}),
        refresh: refreshTimeout => ({refreshTimeout, type: types.REFRESH}),
        clearRefresh: () => ({type: types.CLEAR_REFRESH}),
        register: user => ({user, type: types.REGISTER_USER}),
        registerApp: app => ({app, type: types.REGISTER_APP}),
        toggleRememberMe: rememberMe => ({rememberMe, type: types.REMEMBER_ME}),
        login: user => ({user, type: types.LOGIN}),
        logout: () => ({type: types.LOGOUT}),
        updatedToken: token => ({token, type: types.UPDATED_TOKEN}),
        parsedToken: token => ({token, type: types.PARSED_TOKEN}),
        validatedToken: token => ({token, type: types.VALIDATED_TOKEN}),
        userInfoFromToken: user => ({user, type: types.USER_INFO_FROM_TOKEN}),
        startedLoading: () => ({type: types.LOADING_STARTED}),
        finishedLoading: () => ({type: types.LOADING_FINISHED})
    }),
    reducer(state, action, {types, initialState}) {
        switch (action.type) {
            case types.CANCEL:
                return {...state}
            case types.CLEAR_ERROR:
                return {...state, error: ''}
            case types.CLEAR_REFRESH:
                return {
                    ...state,
                    refreshTimeout: clearTimeout(state.refreshTimeout)
                }
            case types.CLEAR_LOGIN:
                return {...state, ...omit(['baseUrl'], initialState)}
            case types.ERROR:
                return {
                    ...state,
                    error: parseError(action.error),
                    loading: false
                }
            case types.GET_USER_NAV_MENU:
                return {
                    ...state,
                    menu: {
                        ...state.menu,
                        navigation: action.navigation.map(label => ({label}))
                    }
                }
            case types.DECODED_JWT:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...(action.jwt || {}),
                        id: path(['jwt', 'sub'], action) || state.user.id
                    }
                }
            case types.LOADING_FINISHED:
                return {...state, loading: false}
            case types.LOADING_STARTED:
                return {...state, loading: true}
            case types.LOGIN:
                return {...state, user: action.user}
            case types.LOGOUT: {
                if (state.refreshTimeout) clearTimeout(state.refreshTimeout)

                return {
                    ...omit(['refreshTimeout', 'parsed_token'], state),
                    ...omit(['baseUrl'], initialState)
                }
            }
            case types.PASSWORD_HELP:
                return {...state, user: {email: action.email}}
            case types.REFRESH: {
                if (state.refreshTimeout) clearTimeout(state.refreshTimeout)

                return {
                    ...state,
                    refreshTimeout: action.refreshTimeout
                }
            }
            case types.REGISTER_APP:
                return {...state, app: action.app}
            case types.REGISTER_USER:
                return {
                    ...state,
                    user: {
                        name: action.user.name,
                        email: action.user.email
                    }
                }
            case types.REMEMBER_ME:
                return {...state, rememberMe: !state.rememberMe}
            case types.PARSED_TOKEN:
                return {...state, parsed_token: action.token}
            case types.VALIDATED_TOKEN:
            case types.UPDATED_TOKEN: {
                return {
                    ...omit(['parsed_token'], state),
                    user: {
                        ...state.user,
                        token: action.token
                    }
                }
            }
            case types.USER_INFO_FROM_TOKEN:
                return {
                    ...omit(['parsed_token'], state),
                    user: {
                        ...state.user,
                        ...action.user
                    }
                }
            // no default
        }

        return state
    }
})
