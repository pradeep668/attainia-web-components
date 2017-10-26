import {ColumnType} from '../../src/components/common/DataTable'


// Utility functions for generating mock data
export const getRandomArbitrary = (min, max) =>
    (Math.random() * (max - min)) + min

export const getMockDataNoneSelected = size =>
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

export const getMockDataFirstSelected = size =>
    Array(size).fill().map((_, index) => ({
        selected: (index === 0) ? true : false,
        name: `Name ${index + 1}`,
        prop_1: 'Value 1',
        prop_2: getRandomArbitrary(0, 1000).toFixed(2),
        prop_3: {label: 'Google', link: 'http://www.google.com'},
        prop_4: {iconName: 'edit', altText: 'Edit', link: 'http://www.google.com'},
        prop_5: {imageSource: 'https://www.omnicheer.com/images/header-social/icon-grey-instagram.png', altText: 'Visible'},
        prop_6: {toolTip: 'This is a tooltip for the property.', text: 'Tool Tip Text', altText: 'Tooltip'}
    }))

export const getMockDataAllSelected = size =>
    Array(size).fill().map((_, index) => ({
        selected: true,
        name: `Name ${index + 1}`,
        prop_1: 'Value 1',
        prop_2: getRandomArbitrary(0, 1000).toFixed(2),
        prop_3: {label: 'Google', link: 'http://www.google.com'},
        prop_4: {iconName: 'edit', altText: 'Edit', link: 'http://www.google.com'},
        prop_5: {imageSource: 'https://www.omnicheer.com/images/header-social/icon-grey-instagram.png', altText: 'Visible'},
        prop_6: {toolTip: 'This is a tooltip for the property.', text: 'Tool Tip Text', altText: 'Tooltip'}
    }))

export const getSortDataFirstDesc = () => {
    return {
        columnKey: 'name',
        sortDirection: 'desc'
    }
}

export const getSortDataFirstAsc = () => {
    return {
        columnKey: 'name',
        sortDirection: 'asc'
    }
}

export const getSortDataThirdDesc = () => {
    return {
        columnKey: 'prop_2',
        sortDirection: 'desc'
    }
}

export const getSortDataThirdAsc = () => {
    return {
        columnKey: 'prop_2',
        sortDirection: 'asc'
    }
}

export const getMockHeadersFirstFixed = () => ([
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

export const getMockHeadersNoneFixed = () => ([
    {
        name: 'Name',
        toolTip: 'The name of the thing',
        key: 'name',
        width: 200,
        fixed: false,
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
