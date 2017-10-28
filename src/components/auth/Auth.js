import {is} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import AuthStatus from './AuthStatus.container'
import Refresher from './Refresher.container'
import Validator from './Validator.container'
import {getAccessTokenFromStorage, removeToken, setToken} from './helpers'

const Auth = props => {
    const {
        children,
        isLoggedOut,
        onLogout,
        rememberMe,
        storage,
        tokenInStore,
        useRefresh
    } = props

    let access_token = getAccessTokenFromStorage(storage)
    if (access_token === '[object Object]') {
        removeToken()
        access_token = ''
    }
    if (tokenInStore && rememberMe && access_token !== tokenInStore) {
        setToken(props)
    }

    if (access_token || tokenInStore) {
        if (onLogout && useRefresh) {
            return (
                <Validator token={access_token || tokenInStore} {...props}>
                    <Refresher token={access_token || tokenInStore}>
                        <AuthStatus>{children}</AuthStatus>
                    </Refresher>
                </Validator>
            )
        } else if (useRefresh) {
            return (
                <Validator token={access_token || tokenInStore} {...props}>
                    <Refresher token={access_token || tokenInStore}>
                        {children}
                    </Refresher>
                </Validator>
            )
        } else if (onLogout) {
            return (
                <Validator token={access_token || tokenInStore} {...props}>
                    <AuthStatus>{children}</AuthStatus>
                </Validator>
            )
        }

        return (
            <Validator token={access_token || tokenInStore} {...props}>
                {children}
            </Validator>
        )
    } else if (isLoggedOut && is(Function, onLogout)) {
        removeToken()
        onLogout()
    }

    return children
}

Auth.propTypes = {
    children: PropTypes.node,
    tokenInStore: PropTypes.string,
    isLoggedOut: PropTypes.bool.isRequired,
    onLogout: PropTypes.func,
    rememberMe: PropTypes.bool.isRequired,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
    useRefresh: PropTypes.bool.isRequired
}

Auth.defaultProps = {
    children: null,
    isLoggedOut: false,
    rememberMe: false,
    storage: 'local',
    useRefresh: true
}

export default Auth
