import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'

import createClient from './apollo.client'
import Auth from './Auth.container'

const AuthProvider = props =>
    <ApolloProvider client={createClient({...props})} {...props}>
        <Auth {...props} />
    </ApolloProvider>

AuthProvider.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    children: PropTypes.node,
    onLogin: PropTypes.func,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
    useSubscriptions: PropTypes.bool.isRequired
}

AuthProvider.defaultProps = {
    baseUrl: 'localhost',
    storage: 'local',
    useSubscriptions: true
}

export default AuthProvider
