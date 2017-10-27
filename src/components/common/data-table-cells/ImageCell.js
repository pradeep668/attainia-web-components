import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'


export default class ImageCell extends React.PureComponent {
    render() {
        const {cellData, ...props} = this.props
        return (
            <Cell {...props}>
                <img
                    src={cellData.imageSource}
                    alt={cellData.altText}
                    title={cellData.altText}
                />
            </Cell>
        )
    }
}

ImageCell.propTypes = {
    cellData: PropTypes.shape({
        imageSource: PropTypes.string.isRequired,
        altText: PropTypes.string.isRequired
    }).isRequired
}
