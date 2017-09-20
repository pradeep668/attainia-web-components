import React from 'react'
import PropTypes from 'prop-types'

import Routes from './Routes.container'

const Auth = ({isLoggedIn, children, onLogin, storage, user}) => {
    if (isLoggedIn) {
        if (/(local|session)/i.test(storage)) {
            (/local/i.test(storage) ? localStorage : sessionStorage).setItem('token', user.token)
        }
        onLogin(user)
        return children
    }
    return <Routes />
}

Auth.propTypes = {
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
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
    onLogin: () => true,
    storage: 'local',
    user: {}
}

export default Auth
