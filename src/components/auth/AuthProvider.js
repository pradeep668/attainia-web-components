import {pick, is} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'

import apolloClient from './apollo.client'
import Auth from './Auth.container'

const createClient = props =>
    props.ownClient({
        ...pick(['baseUrl', 'storage'], props),
        useSubscriptions: is(Function, props.onLogout)
    })

const AuthProvider = props =>
    <ApolloProvider client={createClient(props)} {...props}>
        <Auth {...props} />
    </ApolloProvider>

AuthProvider.propTypes = {
    baseUrl: PropTypes.string.isRequired,
    children: PropTypes.node,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    ownClient: PropTypes.func.isRequired,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
    useRefresh: PropTypes.bool.isRequired
}

AuthProvider.defaultProps = {
    baseUrl: 'localhost',
    storage: 'local',
    ownClient: apolloClient,
    useRefresh: true
}

export default AuthProvider
