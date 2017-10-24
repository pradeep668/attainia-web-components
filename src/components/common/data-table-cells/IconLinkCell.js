import React from 'react'

import PropTypes from 'prop-types'

import {Cell} from 'fixed-data-table-2'
import SimpleSvgIcon from '../SimpleSvgIcon'

export class IconLinkCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={data[rowIndex][columnKey].link}>
                    <SimpleSvgIcon icon={data[rowIndex][columnKey].iconName} />
                </a>
            </Cell>
        )
    }
}

IconLinkCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowIndex: PropTypes.number,
    columnKey: PropTypes.string
}

export default IconLinkCell
