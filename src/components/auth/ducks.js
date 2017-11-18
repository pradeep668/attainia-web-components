/* eslint "max-len": "off" */
import Duck, {createSelector, createValidator, isStringieThingie} from 'extensible-duck'
import {complement, omit, intersection, path, trim, compose, is, toString} from 'ramda'
import LocalizedStrings from 'react-localization'

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
    consts: {
        ONE_HOUR: 3600000,
        EMAIL_REGEX: new RegExp(/^[^\\.\\s@:][^\\s@:]*(?!\\.)@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*$/),
        PASSWORD_REGEX: new RegExp(/^([A-Z]|[a-z])([a-z]|[0-9]|[!@#$%^&*()[\];:,.<>?*^+=_-]){6,50}$/)
    },
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
    selectors: ({consts}) => ({
        root: state => state,
        error: state => state.auth.error,
        parsedToken: state => state.auth.parsed_token,
        id: state => path(['auth', 'user', 'id'], state),
        email: state => path(['auth', 'user', 'email'], state),
        token: state => path(['auth', 'user', 'token', 'access_token'], state),
        navigationItems: state => path(['auth', 'menu', 'navigation'], state),
        storedToken: new Duck.Selector(selectors =>
            createSelector(
                selectors.token,
                selectors.parsedToken,
                (t, pt) => t || pt
            )
        ),
        hasAuthError: new Duck.Selector(selectors => createSelector(selectors.error, Boolean)),
        isAuthenticated: new Duck.Selector(selectors => createSelector(selectors.id, isStringieThingie)),
        isNotAuthenticated: new Duck.Selector(selectors => createSelector(selectors.id, complement(isStringieThingie))),
        expires_in: state => path(['auth', 'user', 'token', 'expires_in'], state),
        permissions: (state, {permissions = []} = {}) =>
            !!intersection(permissions, (path(['auth', 'user', 'scopes'], state) || [])).length,
        refreshInMs: new Duck.Selector(selectors =>
            createSelector(
                selectors.expires_in,
                expiresIn => Math.max((Number(expiresIn || consts.ONE_HOUR) - 10) * 1000, 0)
            )
        ),
        refreshAt: new Duck.Selector(selectors =>
            createSelector(
                selectors.refreshInMs,
                refreshInMs => new Date(Date.now() + refreshInMs)
            )
        )
    }),
    creators: ({types}) => ({
        handleError: error => ({error, type: types.ERROR}),
        clearError: () => ({type: types.CLEAR_ERROR}),
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
    validators: ({consts}) => ({
        passwordHelp: {
            validate: createValidator({
                email: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {email: 'Please enter your email'},
                        fr: {email: 'Entrez votre adresse e-mail'},
                        es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                    }).email]
                ]
            })
        },
        login: {
            validate: createValidator({
                password: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {password: 'Please enter your password'},
                        fr: {password: 's\'il vous plait entrez votre mot de passe'},
                        es: {password: 'Por favor, introduzca su contraseña'}
                    }).password]
                ],
                email: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {email: 'Please enter your email'},
                        fr: {email: 'Entrez votre adresse e-mail'},
                        es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                    }).email]
                ]
            })
        },
        applicationRegistration: {
            validate: createValidator({
                name: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {name: 'Please enter your name'},
                        fr: {name: 'S\'il vous plaît entrez votre nom'},
                        es: {name: 'por favor, escriba su nombre'}
                    }).name]
                ],
                redirect: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {redirect: 'Please enter a URL'},
                        fr: {redirect: 'Entrez une URL'},
                        es: {redirect: 'Ingrese una URL'}
                    }).redirect]
                ]
            })
        },
        userRegistration: {
            validate: createValidator({
                name: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {name: 'Please enter your name'},
                        fr: {name: 'S\'il vous plaît entrez votre nom'},
                        es: {name: 'por favor, escriba su nombre'}
                    }).name]
                ],
                email: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {email: 'Please enter your email address'},
                        fr: {email: 'Entrez votre adresse e-mail'},
                        es: {email: 'Por favor, introduzca su dirección de correo electrónico'}
                    }).email],
                    [s => consts.EMAIL_REGEX.test(s), new LocalizedStrings({
                        en: {email: 'Invalid email address'},
                        fr: {email: 'Adresse e-mail invalide'},
                        es: {email: 'Dirección de correo electrónico no válida'}
                    }).email]
                ],
                password: [
                    [isStringieThingie, new LocalizedStrings({
                        en: {password: 'Please enter your password'},
                        fr: {password: 's\'il vous plait entrez votre mot de passe'},
                        es: {password: 'Por favor, introduzca su contraseña'}
                    }).password],
                    [s => consts.PASSWORD_REGEX.test(s), new LocalizedStrings({
                        en: {password: 'Passwords should be greater than 6 alphanumeric characters. Some special characters are allowed.'},
                        fr: {password: 'Les mots de passe doivent être supérieurs à 6 caractères. Algunos caracteres especiales están permitidos.'},
                        es: {password: 'Las contraseñas deben tener más de 6 caracteres. Certains caractères spéciaux sont autorisés.'}
                    }).password]
                ]
            })
        }
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
                        ...(action.jwt || {})
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
