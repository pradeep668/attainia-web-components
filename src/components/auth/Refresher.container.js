import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import Refresher from './Refresher'
import {handleError, updatedToken, refresh} from './actions'

const mapStateToProps = store => ({
    token: path(['auth', 'user', 'token', 'access_token'], store),
    refreshInMs: Number(path(['auth', 'user', 'token', 'refreshInMs'], store) || 3600)
})

const withReduxConnect = () => connect(mapStateToProps, {handleError, updatedToken, refresh})

export const withTokenRefresh = (DecoratedComponent) => {
    const WithTokenRefresh = ({
        token,
        handleError: hError,
        updatedToken: uToken,
        refresh: rfrsh,
        refreshInMs: rInMs,
        client,
        ...passThroughProps
    }) =>
        <Refresher
            refreshInMs={rInMs}
            handleError={hError}
            updatedToken={uToken}
            token={token}
            refresh={rfrsh}
            client={client}
        >
            <DecoratedComponent {...passThroughProps} />
        </Refresher>

    WithTokenRefresh.propTypes = {
        handleError: PropTypes.func,
        updatedToken: PropTypes.func,
        refresh: PropTypes.func,
        refreshInMs: PropTypes.number,
        token: PropTypes.string,
        client: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired
    }

    return compose(withApollo, withReduxConnect())(WithTokenRefresh)
}

export default compose(withApollo, withReduxConnect())(Refresher)
