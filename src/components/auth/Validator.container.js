import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, withApollo} from 'react-apollo'

import {handleError, logout} from './actions'
import Validator from './Validator'

const mapStateToProps = state => ({
    token: path(['auth', 'user', 'token', 'access_token'], state)
})

const withReduxConnect = () => connect(mapStateToProps, {logout, handleError})

export const withTokenValidation = (DecoratedComponent) => {
    const WithTokenValidation = ({
        client,
        token,
        logout: lgt,
        handleError: hError,
        ...passThroughProps
    }) =>
        <Validator
            client={client}
            logout={lgt}
            handleError={hError}
            token={token}
        >
            <DecoratedComponent {...passThroughProps} />
        </Validator>

    WithTokenValidation.propTypes = {
        token: PropTypes.string,
        logout: PropTypes.func,
        handleError: PropTypes.func,
        client: PropTypes.shape({
            query: PropTypes.func.isRequired
        }).isRequired
    }

    return compose(withApollo, withReduxConnect())(WithTokenValidation)
}

export default compose(withApollo, withReduxConnect())(Validator)
