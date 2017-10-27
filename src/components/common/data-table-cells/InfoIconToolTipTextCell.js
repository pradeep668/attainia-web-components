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
        const {cellData, ...props} = this.props
        return (
            <div>
                <Cell {...props}>
                    <InlineImg
                        icon="info"
                        data-tip={cellData.toolTip}
                        data-for={'cell-tooltip'}
                        alt={cellData.altText}
                    />
                    <span>{cellData.text}</span>
                </Cell>
            </div>
        )
    }
}

InfoIconToolTipTextCell.propTypes = {
    cellData: PropTypes.shape({
        toolTip: PropTypes.string.isRequired,
        altText: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
}
