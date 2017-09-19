import React from 'react'
import PropTypes from 'prop-types'

import Login from './Login.container'
import PasswordHelp from './PasswordHelp.container'
import Registration from './Registration.container'
import RegisterApplication from './RegisterApplication.container'

const Router = ({route}) => {
    const ROUTE = route.toUpperCase().replace(/\//g, '')
    switch (ROUTE) {
    case 'LOGIN':
        return <Login />
    case 'REGISTRATION':
        return <Registration />
    case 'APPLICATION':
        return <RegisterApplication />
    case 'PASSWORD-HELP':
        return <PasswordHelp />
    default:
        return <Login />
    }
}

Router.propTypes = {
    route: PropTypes.string.isRequired
}

Router.defaultProps = {
    route: ''
}

export default Router
