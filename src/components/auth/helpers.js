import {path} from 'ramda'

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
export const removeToken = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
}
export const setToken = props => {
    if (/(local|session)/i.test(props.storage)) {
        const access_token = getAccessToken(props)
        if (access_token) {
            if (/local/i.test(props.storage)) {
                localStorage.setItem('token', access_token)
            } else if (/session/i.test(props.storage)) {
                sessionStorage.setItem('token', access_token)
            }
        }
    }
}
