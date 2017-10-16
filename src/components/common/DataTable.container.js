import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import {DataTable, ColumnType} from './DataTable'

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min
  }

const makeFakeData = (size) => {
    return Array.apply(null, {length: size}).map(function(value, index) {
        return { name: `Name ${index + 1}`,  prop_1: `Value 1`,  prop_2: `Value 2`,  prop_3: `Value 3`,  prop_4: `Value 4`, prop_5: getRandomArbitrary(0, 1000).toFixed(2)}
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
                width: 200,
                fixed: true,
                columnType: ColumnType.TEXT
            },
            {
                name: "Property 1",
                key: "prop_1",
                width: 200,
                fixed: false,
                columnType: ColumnType.TEXT
            },
            {
                name: "Property 2",
                key: "prop_2",
                width: 200,
                fixed: false,
                columnType: ColumnType.TEXT
            },
            {
                name: "Property 3",
                key: "prop_3",
                width: 200,
                fixed: false,
                columnType: ColumnType.TEXT
            },
            {
                name: "Property 4",
                key: "prop_4",
                width: 200,
                fixed: false,
                columnType: ColumnType.TEXT
            },
            {
                name: "Property 5",
                key: "prop_5",
                width: 200,
                fixed: false,
                columnType: ColumnType.NUMBER
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
