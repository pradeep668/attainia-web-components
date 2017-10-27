import React from 'react'

import PropTypes from 'prop-types'
import {Cell} from 'fixed-data-table-2'
import SimpleSvgIcon from '../SimpleSvgIcon'

export default class IconLinkCell extends React.PureComponent {
    render() {
        const {cellData, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={cellData.link}>
                    <SimpleSvgIcon icon={cellData.iconName} />
                </a>
            </Cell>
        )
    }
}

IconLinkCell.propTypes = {
    cellData: PropTypes.shape({
        link: PropTypes.string.isRequired,
        iconName: PropTypes.string.isRequired
    }).isRequired
}
