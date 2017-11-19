import React from 'react'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import {Cell} from 'fixed-data-table-2'

const StyledAnchor = styled.a`
    color: #0072CE;
    &:active {
        color: #328ED7;
    }
    &:hover {
        color: #4C9CDC;
    }
    &:visited {
        color: #005BA4;
    }
    &:disabled {

    }
`

export default class LinkCell extends React.PureComponent {
    render() {
        const {cellData: {link, label}, ...props} = this.props
        return (
            <Cell {...props}>
                <StyledAnchor href={link}>{label}</StyledAnchor>
            </Cell>
        )
    }
}

LinkCell.propTypes = {
    cellData: PropTypes.shape({
        link: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired
}
