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

const DataTable = ({rowsCount, rowHeight, tableWidth}) =>
    <div>
        <Table
            rowsCount={rowsCount}
            rowHeight={rowHeight}
            width={tableWidth}
            height={500}
            headerHeight={50}>
            <Column
                header={<TooltipHeaderCell data="Basic Header" />}
                cell={<Cell>Basic Content</Cell>}
                width={200}
            />
        </Table>
        <ReactTooltip place="top" effect="solid" />
    </div>

DataTable.propTypes = {
    rowsCount: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    tableWidth: PropTypes.number.isRequired
}    

export default DataTable
