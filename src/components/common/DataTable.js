import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'

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

const DataTable = (
    {
        rowsCount, 
        rowHeight, 
        tableWidth,
        tableHeight,
        headerHeight
    }
) =>
    <div>
        <Table
            rowsCount={rowsCount}
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
            <Column
                header={<TooltipHeaderCell data="Basic Header 1" />}
                cell={<Cell>{"Basic data 1"}</Cell>}
                width={200}
                fixed={true}
            />
            <Column
                header={<TooltipHeaderCell data="Basic Header 2" />}
                cell={<Cell>{"Basic data 2"}</Cell>}
                width={200}
            />
            <Column
                header={<TooltipHeaderCell data="Basic Header 3" />}
                cell={<Cell>{"Basic data 3"}</Cell>}
                width={200}
            />
        </Table>
        <ReactTooltip place="top" effect="solid" />
    </div>

DataTable.propTypes = {
    rowsCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired,
    tableHeight: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired
}    

export default DataTable
