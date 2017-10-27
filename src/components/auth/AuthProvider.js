import {pick, is} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {ApolloProvider} from 'react-apollo'
import {connect} from 'react-redux'
import {withTheme} from 'styled-components'

import apolloClient from './apollo.client'

const createClient = props =>
    props.ownClient({
        ...pick(['baseUrl', 'storage'], props),
        useSubscriptions: is(Function, props.onLogout)
    })

const AuthProvider = props =>
    <ApolloProvider client={createClient(props)} {...props}>
        {props.children}
    </ApolloProvider>

AuthProvider.propTypes = {
    baseUrl: PropTypes.string,
    children: PropTypes.node,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    ownClient: PropTypes.func.isRequired,
    storage: PropTypes.oneOf(['local', 'session', 'none']),
    useRefresh: PropTypes.bool.isRequired
}

AuthProvider.defaultProps = {
    storage: 'local',
    ownClient: apolloClient,
    useRefresh: true
}

export default connect(
    store => ({urlFromStore: store.auth.baseUrl}),
    null,
    (storeProps, _, ownProps) => ({
        ...ownProps,
        baseUrl: ownProps.baseUrl || storeProps.urlFromStore
    })
)(withTheme(AuthProvider))
