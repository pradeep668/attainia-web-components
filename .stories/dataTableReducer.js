import {ColumnType} from '../src/components/common/DataTable'
import types from './dataTablesTypes'


// Utility functions for generating mock data
const getRandomArbitrary = (min, max) =>
    (Math.random() * (max - min)) + min

const makeMockData = size =>
    Array(size).fill().map((_, index) => ({
        selected: false,
        name: `Name ${index + 1}`,
        prop_1: 'Value 1',
        prop_2: getRandomArbitrary(0, 1000).toFixed(2),
        prop_3: {label: 'Google', link: 'http://www.google.com'},
        prop_4: {iconName: 'edit', altText: 'Edit', link: 'http://www.google.com'},
        prop_5: {imageSource: 'https://www.omnicheer.com/images/header-social/icon-grey-instagram.png', altText: 'Visible'},
        prop_6: {toolTip: 'This is a tooltip for the property.', text: 'Tool Tip Text', altText: 'Tooltip'}
    }))

const makeMockHeaders = () => ([
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
    },
    {
        name: 'Tooltip Text Property',
        toolTip: 'Some tooltip text of the thing',
        key: 'prop_6',
        width: 200,
        fixed: false,
        columnType: ColumnType.INFO_TEXT
    }
])

// Reducer for data tables
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SORT_DATA: {
            return {
                ...state,
                data: state.data.slice(0).sort((a, b) => b[action.column] - a[action.column]),
                sortData: {
                    columnKey: action.column,
                    sortDirection: action.direction
                }
            }
        }
        case types.NEXT_PAGE: {
            return {
                ...state,
                data: state.data.concat(makeMockData(100))
            }
        }
        case types.SELECT_ROW: {
            return {
                ...state,
                data: state.data.map((row, index) => {
                    const newRow = row

                    if (index === action.index) {
                        newRow.selected = action.selected
                    }

                    return newRow
                })
            }
        }
        // no default
    }

    return state
}

// Data table initial state
const initialState = {
    rowHeight: 50,
    tableWidth: 1253,
    tableHeight: 500,
    headerHeight: 50,
    hasCheckColumn: true,
    sortData: {
        columnKey: 'name',
        sortDirection: 'asc'
    },
    headers: makeMockHeaders(),
    data: makeMockData(100)
}
