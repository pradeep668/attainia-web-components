import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import DataTable from './DataTable'


const mapStateToProps = store => ({
})

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
        tableWidth={218}
        />
    </CenterDiv>

export default connect(mapStateToProps)(CenteredDataTable)
