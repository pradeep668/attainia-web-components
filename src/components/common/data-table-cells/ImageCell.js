import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'


export class ImageCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <img
                    src={data[rowIndex][columnKey].imageSource}
                    alt={data[rowIndex][columnKey].altText}
                    title={data[rowIndex][columnKey].altText}
                />
            </Cell>
        )
    }
}

ImageCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowIndex: PropTypes.number.isRequired,
    columnKey: PropTypes.string.isRequired
}

export default ImageCell
