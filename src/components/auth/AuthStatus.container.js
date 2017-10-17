import {path} from 'ramda'
import {connect} from 'react-redux'
import {withApollo} from 'react-apollo'

import AuthStatus from './AuthStatus'
import {handleError, logout} from './actions'
import IS_LOGGED_OUT from './subscriptions'

const mapStateToProps = state => ({
    token: path(['auth', 'user', 'token', 'access_token'], state)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    children: ownProps.children,
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

const withReduxData = connect(
    mapStateToProps,
    {handleError, logout},
    mergeProps
)(AuthStatus)

export default withApollo(withReduxData)
