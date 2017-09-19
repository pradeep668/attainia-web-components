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
    parseTokenFromStorage: PropTypes.bool.isRequired,
    useSubscriptionsToo: PropTypes.bool.isRequired
}

AuthProvider.defaultProps = {
    baseUrl: 'localhost',
    parseTokenFromStorage: true,
    useSubscriptionsToo: true
}

export default AuthProvider
