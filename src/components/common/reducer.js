import initialState from './initialState'
import types from './types'


const getRandomArbitrary = (min, max) =>
(Math.random() * (max - min)) + min

const makeFakeData = size =>
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
                data: state.data.concat(makeFakeData(100))
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
