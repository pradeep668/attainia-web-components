import uuid from 'uuid/v4'
import {
    both,
    complement,
    compose,
    curry,
    defaultTo,
    equals,
    inc,
    isEmpty,
    is,
    length,
    not,
    path,
    prop
} from 'ramda'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Table, Column, Cell} from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'
import color from 'color'

import ColumnType from './ColumnType'
import Button from '../common/Button'
import {Conditional} from '../common/Conditional'
import TooltipHeaderCell from './TooltipHeaderCell'
import NumberTooltipHeaderCell from './NumberTooltipHeaderCell'
import TextCell from './TextCell'
import LinkCell from './LinkCell'
import NumberCell from './NumberCell'
import InfoIconToolTipTextCell from './InfoIconToolTipTextCell'
import ImageCell from './ImageCell'
import IconLinkCell from './IconLinkCell'
import {getThemeProp} from '../common/helpers'


const isNotEmpty = complement(isEmpty)
const countThe = curry((propPath, data) =>
    compose(length, defaultTo([]), path(propPath))(data)
)
const countRows = countThe(['rows'])
const hasRows = compose(Boolean, countRows)
const isDisabled = both(
    compose(is(Number), prop('page')),
    equals(countThe(['pageData', 'totalPages']), prop('page'))
)

const StyledTable = styled(Table)`
    .fixedDataTableCellLayout_wrap1 {
        height: 100%;
    }
    .fixedDataTableCellLayout_wrap1 span::selection {
        background-color: ${getThemeProp(['colors', 'primary', 'lt'])};
        color: white;
    }
    .public_fixedDataTable_bodyRow:hover .public_fixedDataTableCell_main {
        background-color: ${props =>
        color(
            getThemeProp(['colors', 'grayscale', 'lt'])(props)
        ).mix(
            color(getThemeProp(['colors', 'grayscale', 'md'])(props)), 0.1
        ).hex()
};
    }
    .public_fixedDataTableRow_highlighted {
        background-color: ${getThemeProp(['colors', 'grayscale', 'lt'])};
    }
`

const TableHeader = styled.div`
    border: 1px solid ${props =>
        color(
            getThemeProp(['colors', 'grayscale', 'lt'])(props)
        ).darken(0.1).hex()
};
    border-bottom-style: none;
    padding: 8px;

    .header-checkbox {
        margin-right: 16px;
    }
`

const TableFooter = styled.div`
    border: 1px solid ${props =>
        color(
            getThemeProp(['colors', 'grayscale', 'lt'])(props)
        ).darken(0.1).hex()
};
    border-top-style: none;
    padding: 8px;
    align-items: center;
    display: flex;
`

const LoadMoreButton = styled(Button)`
    width: 50%;
    height: 40px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px 0;
    background-color: ${getThemeProp(['colors', 'secondary', 'default'])};

    &:disabled {
        background: #C1CDD7;
        cursor: not-allowed;
    }
`

const RenderColumns = (headers, data, getSortedData) =>
    headers.map((header = {}) => {
        const {columnType, key, width, fixed} = header
        switch (columnType) {
            case ColumnType.TEXT: {
                return <Column
                  key={uuid()}
                  header={
                      <TooltipHeaderCell
                        headerData={header}
                        sortData={data.sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={key}
                  cell={({rowIndex, columnKey}) => (<TextCell cellData={path(['rows', rowIndex, columnKey], data)} />)}
                  width={width}
                  fixed={fixed}
                />
            }
            case ColumnType.NUMBER: {
                return <Column
                  key={uuid()}
                  header={
                      <NumberTooltipHeaderCell
                        headerData={header}
                        sortData={data.sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={key}
                  cell={({rowIndex, columnKey}) => <NumberCell cellData={path(['rows', rowIndex, columnKey], data)} />}
                  width={width}
                  fixed={fixed}
                />
            }
            case ColumnType.LINK: {
                return <Column
                  key={uuid()}
                  header={
                      <TooltipHeaderCell
                        headerData={header}
                        sortData={data.sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={key}
                  cell={({rowIndex, columnKey}) => (<LinkCell cellData={path(['rows', rowIndex, columnKey], data)} />)}
                  width={width}
                  fixed={fixed}
                />
            }
            case ColumnType.IMAGE: {
                return <Column
                  key={uuid()}
                  header={
                      <TooltipHeaderCell
                        headerData={header}
                        sortData={data.sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={key}
                  cell={({rowIndex, columnKey}) => (<ImageCell cellData={path(['rows', rowIndex, columnKey], data)} />)}
                  width={width}
                  fixed={fixed}
                />
            }
            case ColumnType.ICON_LINK: {
                return <Column
                  key={uuid()}
                  header={
                      <TooltipHeaderCell
                        headerData={header}
                        sortData={data.sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={key}
                  cell={({rowIndex, columnKey}) =>
                      <IconLinkCell cellData={path(['rows', rowIndex, columnKey], data)} />
                  }
                  width={width}
                  fixed={fixed}
                />
            }
            case ColumnType.INFO_TEXT: {
                return <Column
                  key={uuid()}
                  header={
                      <TooltipHeaderCell
                        headerData={header}
                        sortData={data.sortData}
                        sortCallback={getSortedData}
                      />
                  }
                  columnKey={key}
                  cell={({rowIndex, columnKey}) => (
                      <InfoIconToolTipTextCell
                        cellData={path(['rows', rowIndex, columnKey], data)}
                      />
                  )}
                  width={width}
                  fixed={fixed}
                />
            }
            // no default
        }

        return <Column
          key={uuid()}
          header={
              <TooltipHeaderCell
                data={header}
                sortData={data.sortData}
                sortCallback={getSortedData}
              />
          }
          columnKey={key}
          cell={<TextCell data={data} />}
          width={width}
          fixed={fixed}
        />
    })
const isChecked = index => compose(Boolean, path([index, 'selected']))
const getSelectedValue = index => compose(not, defaultTo(true), path([index, 'selected']))
const incrementPage = compose(inc, Number, path(['pageData', 'page']))

const DataTable = ({
    rowHeight,
    tableWidth,
    tableHeight,
    headerHeight,
    hasCheckColumn,
    rowSelected,
    getNextPage,
    getSortedData,
    headers,
    data
}) =>
    <Conditional condition={isNotEmpty(data) && hasRows(data)}>
        <TableHeader>{countRows(data)} total</TableHeader>
        <StyledTable
          rowsCount={countRows(data)}
          rowHeight={rowHeight}
          width={tableWidth}
          height={tableHeight}
          headerHeight={headerHeight}
        >
            {hasCheckColumn ?
                <Column
                  header={<Cell />}
                  cell={({rowIndex}) => (
                      <Cell>
                          <input
                            type="checkbox"
                            onChange={() => rowSelected(rowIndex, getSelectedValue(rowIndex)(data.rows))}
                            checked={isChecked(rowIndex)(data.rows)}
                          />
                      </Cell>
                  )}
                  width={35}
                  fixed
                /> : null
            }
            {isNotEmpty(headers) ? RenderColumns(headers, data, getSortedData) : null}
        </StyledTable>
        <ReactTooltip place="top" id="header-tooltip" effect="solid" />
        <ReactTooltip place="top" id="cell-tooltip" effect="solid" />
        <TableFooter>
            <LoadMoreButton
              onClick={() => getNextPage(incrementPage(data))}
              disabled={isDisabled(data)}
            >
                Load More
            </LoadMoreButton>
        </TableFooter>
    </Conditional>

DataTable.displayName = 'DataTable'
DataTable.propTypes = {
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    hasCheckColumn: PropTypes.bool.isRequired,
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
    data: PropTypes.shape({
        sortData: PropTypes.shape({
            columnKey: PropTypes.string,
            sortDirection: PropTypes.string
        }),
        pageData: PropTypes.shape({
            page: PropTypes.number,
            totalPages: PropTypes.number,
            perPage: PropTypes.number,
            totalResults: PropTypes.number
        }),
        rows: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
}

export default DataTable
