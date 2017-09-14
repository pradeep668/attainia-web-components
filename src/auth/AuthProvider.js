import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'

import client from './apollo.client'
import Login from './Login.container'

const Auth = ({isLoggedIn, children}) => (isLoggedIn ? children : <Login />)

Auth.propTypes = {
    children: PropTypes.node,
    isLoggedIn: PropTypes.bool.isRequired
}

Auth.defaultProps = {
    children: null,
    isLoggedIn: false
}

const AuthProvider = (props) =>
    <ApolloProvider client={client({...props})}>
        <Auth {...props} />
    </ApolloProvider>

AuthProvider.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    children: PropTypes.node,
    parseTokenFromStorage: PropTypes.bool.isRequired,
    useSubscriptionsToo: PropTypes.bool.isRequired
}

AuthProvider.defaultProps = {
    baseUrl: 'localhost',
    parseTokenFromStorage: true,
    useSubscriptionsToo: true
}

export default AuthProvider
