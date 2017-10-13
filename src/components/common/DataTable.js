import uuid from 'uuid/v4'

import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {Table, Column, Cell} from 'fixed-data-table-2'
import 'fixed-data-table-2/dist/fixed-data-table.css'


class TooltipHeaderCell extends React.PureComponent {
    render() {
        const {data, ...props} = this.props
        return (
            <Cell
            {...props}
            data-tip={data}>
                <div>
                    {data}
                </div>
            </Cell>
        )
    }
}

class TextCell extends React.PureComponent {
    render() {
        const {data, rowIndex, columnKey, ...props} = this.props;
        return (
            <Cell {...props}>
            {data[rowIndex][columnKey]}
            </Cell>
        );
    }
};

const StyledTable = styled(Table)`
    .fixedDataTableRowLayout_rowWrapper:hover .public_fixedDataTableCell_main {
        background-color: #d4e1f7;
    }
`

const RenderColumns = (headers, data) =>
    {
        return headers.map(function(header) {
            return <Column key={uuid()}
                header={<TooltipHeaderCell data={header.name} />}
                columnKey={header.key}
                cell={<TextCell data={data} />}
                width={header.width}
                />
    })}

const DataTable = ({
    rowsCount,
    rowHeight,
    tableWidth,
    tableHeight,
    headerHeight,
    headers,
    data
}) =>
    <div>
        <StyledTable
            rowsCount={data.length}
            rowHeight={rowHeight}
            width={tableWidth}
            height={tableHeight}
            headerHeight={headerHeight}>
            <Column
                header={<Cell></Cell>}
                cell={<Cell><input type="checkbox" /></Cell>}
                width={35}
                fixed={true}
            />
            {RenderColumns(headers, data)}
        </StyledTable>
        <ReactTooltip place="top" effect="solid" />
    </div>

DataTable.propTypes = {
    rowsCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            key: PropTypes.string,
            width: PropTypes.number
        }),
    ),
    data: PropTypes.arrayOf(PropTypes.object)
}

export default DataTable
