import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import DataTable from './DataTable'


const makeFakeData = (size) => {
    return Array.apply(null, {length: size}).map(function(value, index) {
        return { name: `Name ${index + 1}`,  prop_1: `Value 1`,  prop_2: `Value 2`}
    });
}

const mapStateToProps = (state, ownProps) => {
    return {
        rowsCount: 100,
        rowHeight: 50,
        tableWidth: 653,
        tableHeight: 500,
        headerHeight: 50,
        headers: [
            {
                name: "Name",
                key: "name",
                width: 200
            },
            {
                name: "Property 1",
                key: "prop_1",
                width: 200
            },
            {
                name: "Property 2",
                key: "prop_2",
                width: 200
            }
        ],
        data: makeFakeData(100)
    }
}

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
