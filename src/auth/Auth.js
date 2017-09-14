import React from 'react'
import PropTypes from 'prop-types'

import Routes from './Routes.container'

const Auth = ({isLoggedIn, children}) =>
    (isLoggedIn ? children : <Routes />)

Auth.propTypes = {
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool.isRequired
}

Auth.defaultProps = {
    children: null,
    isLoggedIn: false
}

export default Auth
