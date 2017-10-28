import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import WriteTokenToStorage from './WriteTokenToStorage'

const mapStateToProps = state => ({
    token: path(['auth', 'user', 'token', 'access_token'], state),
    canWriteToStorage: !!state.auth.rememberMe,
    storageType: state.auth.storageType
})

export const withWriteTokenToStorage = (DecoratedComponent) => {
    const WithWriteTokenToStorage = ({
        token,
        storageType,
        canWriteToStorage,
        ...passThroughProps
    }) =>
        <WriteTokenToStorage
            token={token}
            storageType={storageType}
            canWriteToStorage={canWriteToStorage}
        >
            <DecoratedComponent {...passThroughProps} />
        </WriteTokenToStorage>

    WithWriteTokenToStorage.propTypes = {
        token: PropTypes.string,
        storageType: PropTypes.oneOf(['local', 'session', 'none']),
        canWriteToStorage: PropTypes.bool
    }

    return connect(mapStateToProps)(WithWriteTokenToStorage)
}

export default connect(mapStateToProps)(WriteTokenToStorage)
