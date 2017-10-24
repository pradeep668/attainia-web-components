import React from 'react'

import PropTypes from 'prop-types'

import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'
import SimpleSvgIcon from './SimpleSvgIcon'


const InlineImg = styled(SimpleSvgIcon)`
    display: inline;
    margin-right: 16px;
    vertical-align: middle;
`

export class InfoIconToolTipTextCell extends React.PureComponent {
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
    rowIndex: PropTypes.number.isRequired,
    columnKey: PropTypes.string.isRequired
}

export class LinkCell extends React.PureComponent {
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
    rowIndex: PropTypes.number.isRequired,
    columnKey: PropTypes.string.isRequired
}

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
    rowIndex: PropTypes.number.isRequired,
    columnKey: PropTypes.string.isRequired
}

export default {
    LinkCell,
    ImageCell,
    IconLinkCell,
    InfoIconToolTipTextCell
}
