import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {DataTable, ColumnType} from '../../src/components/common/DataTable'
import types from './dataTablesTypes'


// Actions
const sortData = (column, direction) => ({column, direction, type: types.SORT_DATA})
const nextPage = pageNumber => ({pageNumber, type: types.NEXT_PAGE})
const selectRow = (index, selected) => ({index, selected, type: types.SELECT_ROW})

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => ({
    rowSelected(index, selected) {
        return dispatch(selectRow(index, selected))
    },
    getNextPage(pageNumber) {
        return dispatch(nextPage(pageNumber))
    },
    getSortedData(column, sortDirection) {
        return dispatch(sortData(column, sortDirection))
    }
})

const CenterDiv = styled.div`
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`

const CenteredDataTable = (props) =>
    <CenterDiv>
        <DataTable {...props} />
    </CenterDiv>

export default connect(mapStateToProps, mapDispatchToProps)(CenteredDataTable)
