import {connect} from 'react-redux'
import React from 'react'
import styled from 'styled-components'

import {DataTable, ColumnType} from './DataTable'
import edit from './edit.svg'
import image from './image.svg'

const getRandomArbitrary = (min, max) =>
    (Math.random() * (max - min)) + min

const makeFakeData = size =>
    Array(size).fill().map((_, index) => ({
        name: `Name ${index + 1}`,
        prop_1: 'Value 1',
        prop_2: getRandomArbitrary(0, 1000).toFixed(2),
        prop_3: {label: 'Google', link: 'http://www.google.com'},
        prop_4: {iconSource: edit, altText: 'Edit', link: 'http://www.google.com'},
        prop_5: {imageSource: image, altText: 'Visible'}
    }))

const mapStateToProps = () => ({
    rowHeight: 50,
    tableWidth: 653,
    tableHeight: 500,
    headerHeight: 50,
    headers: [
        {
            name: 'Name',
            toolTip: 'The name of the thing',
            key: 'name',
            width: 200,
            fixed: true,
            columnType: ColumnType.TEXT
        },
        {
            name: 'Text Property',
            toolTip: 'Some text of the thing',
            key: 'prop_1',
            width: 200,
            fixed: false,
            columnType: ColumnType.TEXT
        },
        {
            name: 'Number Property',
            toolTip: 'Some number of the thing',
            key: 'prop_2',
            width: 200,
            fixed: false,
            columnType: ColumnType.NUMBER
        },
        {
            name: 'Link Property',
            toolTip: 'Some link of the thing',
            key: 'prop_3',
            width: 200,
            fixed: false,
            columnType: ColumnType.LINK
        },
        {
            name: 'Icon Link Property',
            toolTip: 'Some icon of the thing',
            key: 'prop_4',
            width: 200,
            fixed: false,
            columnType: ColumnType.ICON_LINK
        },
        {
            name: 'Image Property',
            toolTip: 'Some image of the thing',
            key: 'prop_5',
            width: 200,
            fixed: false,
            columnType: ColumnType.IMAGE
        }
    ],
    data: makeFakeData(100)
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

export default connect(mapStateToProps)(CenteredDataTable)
