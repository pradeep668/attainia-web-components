import React from 'react'

import PropTypes from 'prop-types'

import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'
import SimpleSvgIcon from '../SimpleSvgIcon'


const InlineImg = styled(SimpleSvgIcon)`
    display: inline;
    margin-right: 16px;
    vertical-align: middle;
`

export default class InfoIconToolTipTextCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <div>
                <Cell {...props}>
                    <InlineImg
                        icon="info"
                        data-tip={data[rowIndex][columnKey].toolTip}
                        data-for={'cell-tooltip'}
                        alt={data[rowIndex][columnKey].altText}
                    />
                    <span>{data[rowIndex][columnKey].text}</span>
                </Cell>
            </div>
        )
    }
}

InfoIconToolTipTextCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowIndex: PropTypes.number,
    columnKey: PropTypes.string
}
