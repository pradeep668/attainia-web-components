import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withApollo, compose} from 'react-apollo'

import {handleError, login} from './actions'
import TokenInfo from './TokenInfo'

const mapStateToProps = state => ({
    token: path(['auth', 'user', 'token', 'access_token'], state)
})

const withReduxConnect = () => connect(mapStateToProps, {handleError, login})

export const withTokenInfo = (DecoratedComponent) => {
    const WithTokenInfo = ({
        token,
        client,
        handleError: hError,
        login: lgn,
        ...passThroughProps
    }) =>
        <TokenInfo
            token={token}
            client={client}
            handleError={hError}
            login={lgn}
        >
            <DecoratedComponent {...passThroughProps} />
        </TokenInfo>

    WithTokenInfo.propTypes = {
        handleError: PropTypes.func,
        login: PropTypes.func,
        token: PropTypes.string,
        client: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired
    }

    return compose(withApollo, withReduxConnect())(WithTokenInfo)
}

export default compose(withApollo, withReduxConnect())(TokenInfo)
