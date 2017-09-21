import React from 'react'
import PropTypes from 'prop-types'

import Login from './Login.container'
import PasswordHelp from './PasswordHelp.container'
import Registration from './Registration.container'
import RegisterApplication from './RegisterApplication.container'

const Router = (props) => {
    const ROUTE = props.route.toUpperCase().replace(/\//g, '')

    switch (ROUTE) {
    case 'LOGIN':
        return <Login {...props} />
    case 'REGISTRATION':
        return <Registration {...props} />
    case 'APPLICATION':
        return <RegisterApplication {...props} />
    case 'PASSWORD-HELP':
        return <PasswordHelp {...props} />
    default:
        return <Login {...props} />
    }
}

Router.propTypes = {
    route: PropTypes.string.isRequired
}

Router.defaultProps = {
    route: ''
}

export default Router
