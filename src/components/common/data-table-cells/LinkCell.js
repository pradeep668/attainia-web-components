import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'


export default class LinkCell extends React.PureComponent {
    render() {
        const {cellData, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={cellData.link}>{cellData.label}</a>
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
