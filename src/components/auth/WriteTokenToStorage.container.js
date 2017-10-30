import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withStatics} from '../common/helpers'
import WriteTokenToStorage from './WriteTokenToStorage'

const mapStateToProps = (state, ownProps) => ({
    token: path(['auth', 'user', 'token', 'access_token'], state),
    storageType: ownProps.storageType || state.auth.storageType
})

export const withWriteTokenToStorage = (DecoratedComponent) => {
    const WithWriteTokenToStorage = ({
        token,
        storageType,
        ...passThroughProps
    }) =>
        <WriteTokenToStorage token={token} storageType={storageType}>
            <DecoratedComponent {...passThroughProps} />
        </WriteTokenToStorage>

    WithWriteTokenToStorage.propTypes = {
        token: PropTypes.string,
        storageType: PropTypes.oneOf(['local', 'session', 'none'])
    }

    return withStatics(
        connect(mapStateToProps)(WithWriteTokenToStorage),
        DecoratedComponent
    )
}

export default connect(mapStateToProps)(WriteTokenToStorage)
