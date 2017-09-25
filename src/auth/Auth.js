import React from 'react'
import PropTypes from 'prop-types'

import Routes from './Routes.container'
import Refresher from './Refresher.container'

const Auth = props => {
    const {isLoggedIn, isLoggedOut, children, onLogin, onLogout, storage, user, useRefresh} = props

    if (isLoggedIn) {
        if (/(local|session)/i.test(storage)) {
            if (/local/i.test(storage)) localStorage.setItem('token', user.token)
            else if (/session/i.test(storage)) sessionStorage.setItem('token', user.token)
        }
        onLogin(user)

        if (useRefresh) return <Refresher>{children}</Refresher>

        return children
    } else if (isLoggedOut) {
        onLogout()
    }

    return <Routes {...props} />
}

Auth.propTypes = {
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool.isRequired,
    isLoggedOut: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
    useRefresh: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string,
        token: {
            access_token: PropTypes.string
        }
    })
}

Auth.defaultProps = {
    children: null,
    isLoggedIn: false,
    isLoggedOut: false,
    onLogin: () => true,
    onLogout: () => true,
    storage: 'local',
    useRefresh: true,
    user: {}
}

export default Auth
