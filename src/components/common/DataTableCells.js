import React from 'react'

import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'
import SimpleSvgIcon from './SimpleSvgIcon'

import info from './info.svg'
import desc from './sort_desc.svg'
import asc from './sort_asc.svg'


export class TooltipHeaderCell extends React.PureComponent {
    render() {
        const {data, sortData, sortCallback, ...props} = this.props

        const handleClick = () => {
            sortCallback(data.key)
        }

        const FlexDiv = styled.div`
            display: flex;
        `

        const FlexSpan = styled.span`
            display: flex;
            flex-grow: 3;
            order: 1;
        `

        const HeaderLink = styled.a`
            text-decoration: underline;
            width: 100%;
            margin-right: 5px;
            :hover {
                cursor: pointer;
            }
        `

        const SortIcon = styled.img`
            display: flex;
            vertical-align: middle;
            width: 8px;
            order: 2;
        `
        var sortIcon = ''

        if (sortData.columnKey === data.key) {
            sortIcon = (sortData.sortDirection === 'desc') ? desc : asc
        }

        return (
            <Cell {...props} data-tip={data.toolTip} data-for={'header-tooltip'}>
                <FlexDiv>
                    <FlexSpan>
                        <HeaderLink onClick={handleClick}>{data.name}</HeaderLink>
                    </FlexSpan>
                    <SortIcon src={sortIcon}></SortIcon>
                </FlexDiv>
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

const InlineImg = styled.img`
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
                    <InlineImg src={info} data-tip={data[rowIndex][columnKey].toolTip} data-for={'cell-tooltip'} alt={data[rowIndex][columnKey].altText}/><span>{data[rowIndex][columnKey].text}</span>
                </Cell>
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
                <img src={data[rowIndex][columnKey].imageSource} alt={data[rowIndex][columnKey].altText} title={data[rowIndex][columnKey].altText}/>
            </Cell>
        )
    }
}

export class IconLinkCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props
        return (
            <Cell {...props}>
                <a href={data[rowIndex][columnKey].link}>
                    <SimpleSvgIcon icon={data[rowIndex][columnKey].iconSource} />
                </a>
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
    .public_fixedDataTableCell_cellContent a {
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
