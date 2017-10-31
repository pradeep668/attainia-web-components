import React from 'react'

import PropTypes from 'prop-types'
import {Cell} from 'fixed-data-table-2'


export default class LinkCell extends React.PureComponent {
    render() {
        const {cellData: {link, label}, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={link}>{label}</a>
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
