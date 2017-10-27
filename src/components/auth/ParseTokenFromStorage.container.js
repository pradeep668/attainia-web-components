import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ParseTokenFromStorage from './ParseTokenFromStorage'
import {parsedToken} from './actions'

export const withTokenParsing = (DecoratedComponent) => {
    const WithParsing = ({parsedToken: pToken, ...passThroughProps}) =>
        <ParseTokenFromStorage parsedToken={pToken}>
            <DecoratedComponent {...passThroughProps} />
        </ParseTokenFromStorage>

    WithParsing.propTypes = {
        parsedToken: PropTypes.func
    }

    return connect(null, {parsedToken})(WithParsing)
}

export default connect(null, {parsedToken})(ParseTokenFromStorage)
