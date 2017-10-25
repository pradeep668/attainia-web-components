import uuid from 'uuid/v4'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {Table, Column, Cell} from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'

import Button from './Button'
import TooltipHeaderCell from './data-table-cells/TooltipHeaderCell'
import {NumberTooltipHeaderCell} from './data-table-cells/NumberTooltipHeaderCell'
import TextCell from './data-table-cells/TextCell'
import LinkCell from './data-table-cells/LinkCell'
import {NumberCell} from './data-table-cells/NumberCell'
import InfoIconToolTipTextCell from './data-table-cells/InfoIconToolTipTextCell'
import ImageCell from './data-table-cells/ImageCell'
import IconLinkCell from './data-table-cells/IconLinkCell'


export const ColumnType = {
    TEXT: Symbol('TEXT'),
    NUMBER: Symbol('NUMBER'),
    LINK: Symbol('LINK'),
    IMAGE: Symbol('IMAGE'),
    ICON_LINK: Symbol('ICON'),
    INFO_TEXT: Symbol('INFO_TEXT')
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

const TableFooter = styled.div`
    border: 1px solid #d3d3d3;
    border-top-style: none;
    padding: 8px;
    align-items: center;
    display: flex;
`

const LoadMoreButton = styled(Button)`
    width: 120px;
    height: 60px;
    margin-left: auto;
    margin-right: auto;
`

const RenderColumns = (headers, data, sortData, getSortedData) => (
    headers.map((header) => {
        switch (header.columnType) {
            case ColumnType.TEXT: {
                return <Column
                    key={uuid()}
                    header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
                    columnKey={header.key}
                    cell={<TextCell data={data} />}
                    width={header.width}
                    fixed={header.fixed}
                />
            }
            case ColumnType.NUMBER: {
                return <Column
                    key={uuid()}
                    header={<NumberTooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
                    columnKey={header.key}
                    cell={<NumberCell data={data} />}
                    width={header.width}
                    fixed={header.fixed}
                />
            }
            case ColumnType.LINK: {
                return <Column
                    key={uuid()}
                    header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
                    columnKey={header.key}
                    cell={<LinkCell data={data} />}
                    width={header.width}
                    fixed={header.fixed}
                />
            }
            case ColumnType.IMAGE: {
                return <Column
                    key={uuid()}
                    header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
                    columnKey={header.key}
                    cell={<ImageCell data={data} />}
                    width={header.width}
                    fixed={header.fixed}
                />
            }
            case ColumnType.ICON_LINK: {
                return <Column
                    key={uuid()}
                    header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
                    columnKey={header.key}
                    cell={<IconLinkCell data={data} />}
                    width={header.width}
                    fixed={header.fixed}
                />
            }
            case ColumnType.INFO_TEXT: {
                return <Column
                    key={uuid()}
                    header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
                    columnKey={header.key}
                    cell={<InfoIconToolTipTextCell data={data} />}
                    width={header.width}
                    fixed={header.fixed}
                />
            }
            // no default
        }

        return <Column
            key={uuid()}
            header={<TooltipHeaderCell data={header} sortData={sortData} sortCallback={getSortedData} />}
            columnKey={header.key}
            cell={<TextCell data={data} />}
            width={header.width}
            fixed={header.fixed}
        />
    })
)

const RenderCheckColumn = (hasCheckColumn, rowSelected, data) => {
    let checkColumn

    const handleCheck = (index) => {
        const selected = (typeof data === 'undefined') ? false : !data[index].selected
        rowSelected(index, selected)
    }

    const isChecked = (index) => {
        const checked = (typeof data === 'undefined') ? false : data[index].selected
        return checked
    }

    if (hasCheckColumn) {
        checkColumn = (
            <Column
                header={<Cell />}
                cell={({rowIndex}) => (
                    <Cell>
                        <input
                            type="checkbox"
                            onChange={() => handleCheck(rowIndex)}
                            checked={isChecked(rowIndex)}
                        />
                    </Cell>
                )}
                width={35}
                fixed
            />
        )
    }

    return checkColumn
}

export const DataTable = ({
    rowHeight,
    tableWidth,
    tableHeight,
    headerHeight,
    hasCheckColumn,
    sortData,
    rowSelected,
    getNextPage,
    getSortedData,
    headers,
    data
}) =>
    <div>
        <TableHeader>{data.length} total</TableHeader>
        <StyledTable
            rowsCount={data.length}
            rowHeight={rowHeight}
            width={tableWidth}
            height={tableHeight}
            headerHeight={headerHeight}
        >
            {RenderCheckColumn(hasCheckColumn, rowSelected, data)}
            {RenderColumns(headers, data, sortData, getSortedData)}
        </StyledTable>
        <ReactTooltip place="top" id="header-tooltip" effect="solid" />
        <ReactTooltip place="top" id="cell-tooltip" effect="solid" />
        <TableFooter>
            <LoadMoreButton onClick={getNextPage}>Load More</LoadMoreButton>
        </TableFooter>
    </div>

DataTable.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    hasCheckColumn: PropTypes.bool.isRequired,
    sortData: PropTypes.shape({
        columnKey: PropTypes.string,
        sortDirection: PropTypes.string
    }),
    rowSelected: PropTypes.func.isRequired,
    getNextPage: PropTypes.func.isRequired,
    getSortedData: PropTypes.func.isRequired,
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
