import {path, is, allPass} from 'ramda'

export const isSupportedStorageType = storage => /(local|session)/i.test(storage)
export const isValidToken = allPass([
    token => !/\s/.test(token),
    token => token !== '[object Object]',
    is(String)
])
export const formatBaseUri = uri => (/^https?:\/\//i.test(uri) ? uri : `http://${uri}`)
export const getAccessToken = props => path(['user', 'token', 'access_token'], props)
export const getAccessTokenFromStorage = storage => {
    if (/local/i.test(storage)) {
        return localStorage.getItem('token')
    } else if (/session/i.test(storage)) {
        return sessionStorage.getItem('token')
    }
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}
export const removeToken = storage => {
    if (isSupportedStorageType(storage)) {
        if (/local/i.test(storage)) {
            localStorage.removeItem('token')
        } else if (/session/i.test(storage)) {
            sessionStorage.removeItem('token')
        }
    } else {
        localStorage.removeItem('token')
        sessionStorage.removeItem('token')
    }
}
export const setToken = (token, storage = 'local') => {
    if (isSupportedStorageType(storage) && token) {
        if (/local/i.test(storage)) {
            localStorage.setItem('token', token)
        } else if (/session/i.test(storage)) {
            sessionStorage.setItem('token', token)
        }
    }
}
