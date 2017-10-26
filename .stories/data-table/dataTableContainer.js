import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {DataTable, ColumnType} from '../../src/components/common/DataTable'


const mapStateToProps = (state) => state

const CenterDiv = styled.div`
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
`

const CenteredDataTable = (props) =>
    <CenterDiv>
        <DataTable {...props} />
    </CenterDiv>

export default connect(mapStateToProps)(CenteredDataTable)
