import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {withStatics} from '../common/helpers'
import WriteTokenToStorage from './WriteTokenToStorage'

const mapStateToProps = ({auth: {user}}) => ({
    token: path(['token', 'access_token'], user)
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
