import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import ContentCentered from './ContentCentered'
import {getThemeProp} from '../common/helpers'

const Message = styled(ContentCentered)`
    color: ${getThemeProp(['colors', 'primary', 'default'])};
    height: 100%;
    display: grid;
    align-items: center;
`

const NotFound = ({message, location: {pathname}}) =>
    <Message>
        {message || (`${pathname || window.location.pathname} was not found on this site`)}
    </Message>

NotFound.propTypes = {
    message: PropTypes.string,
    location: PropTypes.shape({
        pathname: PropTypes.string
    }).isRequired
}

NotFound.defaultProps = {
    location: {}
}

export default withTheme(NotFound)
