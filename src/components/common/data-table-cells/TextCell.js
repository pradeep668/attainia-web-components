import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'


export class TextCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <span>{data[rowIndex][columnKey]}</span>
            </Cell>
        )
    }
}

TextCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowIndex: PropTypes.number,
    columnKey: PropTypes.string
}

export default {TextCell}
