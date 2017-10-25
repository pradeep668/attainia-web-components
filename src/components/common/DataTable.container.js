import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import {DataTable} from './DataTable'
import {sortData, nextPage, selectRow} from './actions'


const mapStateToProps = (state) => state.common

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
