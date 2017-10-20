import initialState from './initialState'
import types from './types'
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
    prop_5: {imageSource: image, altText: 'Visible'},
    prop_6: {toolTip: 'This is a tooltip for the property.', text: 'Tool Tip Text', altText: 'Tooltip'}
}))

export default (state = initialState, action) => {

    switch (action.type) {
        case types.SORT_DATA: {
            return Object.assign({}, state, {
                data: state.data.slice(0).sort((a, b) => b[action.column] - a[action.column])
            })
        }
        case types.NEXT_PAGE: {
            return Object.assign({}, state, {
                data: state.data.concat(makeFakeData(100))
            })
        }
        // no default
    }
    
    return state
}
