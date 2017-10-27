import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'


export default class LinkCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={data[rowIndex][columnKey].link}>{data[rowIndex][columnKey].label}</a>
            </Cell>
        )
    }
}

LinkCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowIndex: PropTypes.number,
    columnKey: PropTypes.string
}
