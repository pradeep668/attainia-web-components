import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import {withStatics} from '../common/helpers'
import {REFRESH_TOKEN} from './mutations'
import Refresher from './Refresher'
import {handleError, updatedToken, refresh} from './actions'

const ONE_HOUR = 3600000

const mapStateToProps = store => ({
    token: path(['auth', 'user', 'token', 'access_token'], store),
    refreshInMs: Number(path(['auth', 'user', 'token', 'refreshInMs'], store) || 3600)
})

const mapDispatchToProps = {handleError, updatedToken, refresh}

const mergeProps = (storeProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...storeProps,
    queueNextRefresh({tryRefresh, token, refreshInMs = ONE_HOUR} = {}) {
        dispatchProps.refresh(setTimeout(() => tryRefresh(token), refreshInMs))
    },
    async tryRefresh(token) {
        try {
            const {data: {error, refreshUser}} = await ownProps.client.mutate({
                mutation: REFRESH_TOKEN,
                variables: {token}
            })
            if (error) {
                throw new Error(error)
            }
            if (refreshUser) {
                const refreshInMs = Math.max((Number(refreshUser.expires_in || ONE_HOUR) - 10) * 1000, 0)
                dispatchProps.updatedToken({
                    ...refreshUser,
                    refreshInMs,
                    refreshAt: new Date(Date.now() + refreshInMs)
                })
            }
        } catch (err) {
            dispatchProps.handleError(err)
        }
    }
})

const withReduxConnect = () => connect(mapStateToProps, mapDispatchToProps, mergeProps)

export const withTokenRefresh = (DecoratedComponent) => {
    const WithTokenRefresh = ({
        token,
        tryRefresh,
        queueNextRefresh,
        client,
        ...passThroughProps
    }) =>
        <Refresher {...{token, tryRefresh, queueNextRefresh, client}}>
            <DecoratedComponent {...passThroughProps} />
        </Refresher>

    WithTokenRefresh.propTypes = {
        queueNextRefresh: PropTypes.func,
        tryRefresh: PropTypes.func,
        token: PropTypes.string,
        client: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired
    }

    return withStatics(
        compose(withApollo, withReduxConnect())(WithTokenRefresh),
        DecoratedComponent
    )
}

export default compose(withApollo, withReduxConnect())(Refresher)
