import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import {withStatics} from '../common/helpers'
import AuthStatus from './AuthStatus'
import {handleError, logout} from './actions'
import IS_LOGGED_OUT from './subscriptions'

const mapStateToProps = state => ({
    token: path(['auth', 'user', 'token', 'access_token'], state)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    startSubscription() {
        return ownProps.client.subscribe({
            query: IS_LOGGED_OUT,
            variables: {token: stateProps.token}
        }).subscribe({
            next({error, isLoggedOut}) {
                if (error) dispatchProps.handleError(error)
                if (isLoggedOut) dispatchProps.logout()
            },
            error(err) {
                return dispatchProps.handleError(err)
            }
        })
    }
})

const withReduxConnect = () => connect(mapStateToProps, {logout, handleError}, mergeProps)

export const withAuthStatusSubscription = (DecoratedComponent) => {
    const WithAuthStatus = ({startSubscription, ...passThroughProps}) =>
        <AuthStatus startSubscription={startSubscription}>
            <DecoratedComponent {...passThroughProps} />
        </AuthStatus>

    WithAuthStatus.propTypes = {
        startSubscription: PropTypes.func
    }

    return withStatics(
        compose(withApollo, withReduxConnect())(WithAuthStatus),
        DecoratedComponent
    )
}

export default compose(withApollo, withReduxConnect())(AuthStatus)
