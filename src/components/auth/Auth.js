import {isEmpty, is} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import AuthStatus from './AuthStatus.container'
import Refresher from './Refresher.container'
import Routes from './Routes.container'
import Validator from './Validator.container'
import {getAccessTokenFromStorage, removeToken, setToken} from './helpers'

const Auth = props => {
    const {
        children,
        isLoggedOut,
        onLogin,
        onLogout,
        storage,
        tokenInStore,
        user,
        useRefresh
    } = props

    const access_token = getAccessTokenFromStorage(storage)

    if (access_token || tokenInStore) {
        setToken(props)

        onLogin(isEmpty(user) ? {token: {access_token}} : user)

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

    return <Routes {...props} />
}

Auth.propTypes = {
    children: PropTypes.node,
    tokenInStore: PropTypes.string,
    isLoggedOut: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
    useRefresh: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string,
        token: PropTypes.shape({
            access_token: PropTypes.string
        })
    })
}

Auth.defaultProps = {
    children: null,
    isLoggedOut: false,
    onLogin: () => true,
    storage: 'local',
    useRefresh: true,
    user: {}
}

export default Auth
