import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import DataTable from './DataTable'


const mapStateToProps = (state, ownProps) => {
    return {data: []}
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return { stateProps, dispatchProps, ownProps }
}

const CenterDiv = styled.div`
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`

const CenteredDataTable = () =>
    <CenterDiv>
        <DataTable 
        rowsCount={100}
        rowHeight={50}
        tableWidth={453}
        tableHeight={500}
        headerHeight={50}
        />
    </CenterDiv>

export default connect(mapStateToProps, null, mergeProps)(CenteredDataTable)
