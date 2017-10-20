import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import {DataTable} from './DataTable'
import {sortData, nextPage} from './actions'


const mapStateToProps = (state, ownProps) => {
    return state.common
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getNextPage(pageNumber) {
        return dispatch(nextPage(pageNumber))
    },
    getSortedData(column, data) {
        return dispatch(sortData(column, 'nope'))
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
