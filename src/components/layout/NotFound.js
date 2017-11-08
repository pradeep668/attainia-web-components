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
    font-size: ${props => props.fontSize || getThemeProp(['fonts', 'fontSize'], '12px')(props)};
`

const NotFound = ({message, location: {pathname}, fontSize}) =>
    <Message fontSize={fontSize}>
        {message || (`${pathname || window.location.pathname} was not found on this site`)}
    </Message>

NotFound.propTypes = {
    message: PropTypes.string,
    fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    location: PropTypes.shape({
        pathname: PropTypes.string
    }).isRequired
}

NotFound.defaultProps = {
    location: {}
}

export default withTheme(NotFound)
