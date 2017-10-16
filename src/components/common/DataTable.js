import uuid from 'uuid/v4'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {Table, Column, Cell} from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'

import {
    TooltipHeaderCell,
    TextCell,
    LinkCell,
    ImageCell,
    IconLinkCell,
    NumberCell,
    NumberTooltipHeaderCell
} from './DataTableCells'

export const ColumnType = {
    TEXT: Symbol('TEXT'),
    NUMBER: Symbol('NUMBER'),
    LINK: Symbol('LINK'),
    IMAGE: Symbol('IMAGE'),
    ICON_LINK: Symbol('ICON')
}

const StyledTable = styled(Table)`
    .fixedDataTableRowLayout_rowWrapper:hover .public_fixedDataTableCell_main {
        background-color: #d4e1f7;
    }
`

const TableHeader = styled.div`
    border: 1px solid #d3d3d3;
    border-bottom-style: none;
    padding: 8px;

    .header-checkbox {
        margin-right: 16px;
    }
`

const RenderColumns = (headers, data) =>
    {
        return headers.map(function(header) {

            switch (header.columnType) {
                case ColumnType.TEXT:
                    return <Column key={uuid()}
                        header={<TooltipHeaderCell data={header} />}
                        columnKey={header.key}
                        cell={<TextCell data={data} />}
                        width={header.width}
                        fixed={header.fixed}
                        />

                case ColumnType.NUMBER:
                    return <Column key={uuid()}
                        header={<NumberTooltipHeaderCell data={header} />}
                        columnKey={header.key}
                        cell={<NumberCell data={data} />}
                        width={header.width}
                        fixed={header.fixed}
                        />

                case ColumnType.LINK:
                    return <Column key={uuid()}
                        header={<TooltipHeaderCell data={header} />}
                        columnKey={header.key}
                        cell={<LinkCell data={data} />}
                        width={header.width}
                        fixed={header.fixed}
                        />
                
                case ColumnType.IMAGE:
                    return <Column key={uuid()}
                        header={<TooltipHeaderCell data={header} />}
                        columnKey={header.key}
                        cell={<ImageCell data={data} />}
                        width={header.width}
                        fixed={header.fixed}
                        />

                case ColumnType.ICON_LINK:
                    return <Column key={uuid()}
                        header={<TooltipHeaderCell data={header} />}
                        columnKey={header.key}
                        cell={<IconLinkCell data={data} />}
                        width={header.width}
                        fixed={header.fixed}
                        />

                default:
                    return <Column key={uuid()}
                        header={<TooltipHeaderCell data={header} />}
                        columnKey={header.key}
                        cell={<TextCell data={data} />}
                        width={header.width}
                        fixed={header.fixed}
                        />

            }
    })}

export const DataTable = ({
    rowHeight,
    tableWidth,
    tableHeight,
    headerHeight,
    headers,
    data
}) =>
    <div>
        <TableHeader><input type='checkbox' className='header-checkbox'/>{data.length} total</TableHeader>
        <StyledTable
            rowsCount={data.length}
            rowHeight={rowHeight}
            width={tableWidth}
            height={tableHeight}
            headerHeight={headerHeight}>
            <Column
                header={<Cell></Cell>}
                cell={<Cell><input type='checkbox' /></Cell>}
                width={35}
                fixed={true}
            />
            {RenderColumns(headers, data)}
        </StyledTable>
        <ReactTooltip place='top' effect='solid' />
    </div>

DataTable.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            toolTip: PropTypes.string,
            key: PropTypes.string,
            width: PropTypes.number,
            fixed: PropTypes.bool,
            columnType: PropTypes.symbol
        }),
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default {DataTable, ColumnType}
