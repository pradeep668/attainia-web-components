import React from 'react'

import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import {Cell} from 'fixed-data-table-2'

import info from './info.svg'


export class TooltipHeaderCell extends React.PureComponent {
    render() {
        const {data, ...props} = this.props
        return (
            <Cell {...props} data-tip={data.toolTip}>
                <div>
                    {data.name}
                </div>
            </Cell>
        )
    }
}

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

const inline_image = styled.img`
    display: inline;
    margin-right: 8px;
`

export class InfoIconToolTipTextCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <div>
                <Cell {...props}>
                    <inline_image src={info} data-tip data-for={`cell-${rowIndex}-${columnKey}`} alt={data[rowIndex][columnKey].altText}/><span>{data[rowIndex][columnKey].text}</span>
                </Cell>
                <ReactTooltip place="left" effect="solid" id={`cell-${rowIndex}-${columnKey}`}>
                    <span>{data[rowIndex][columnKey].toolTip}</span>
                </ReactTooltip>
            </div>
        )
    }
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

export class ImageCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <img src={data[rowIndex][columnKey].imageSource} alt={data[rowIndex][columnKey].altText} />
            </Cell>
        )
    }
}

export class IconLinkCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={data[rowIndex][columnKey].link}><img src={data[rowIndex][columnKey].iconSource} alt={data[rowIndex][columnKey].altText} /></a>
            </Cell>
        )
    }
}

export const NumberCell = styled(TextCell)`
    .public_fixedDataTableCell_cellContent {
        text-align: right;
    }
`

export const NumberTooltipHeaderCell = styled(TooltipHeaderCell)`
    .public_fixedDataTableCell_cellContent {
        text-align: right;
    }
`

export default {
    TooltipHeaderCell,
    TextCell,
    LinkCell,
    ImageCell,
    IconLinkCell,
    NumberCell,
    NumberTooltipHeaderCell,
    InfoIconToolTipTextCell
}
