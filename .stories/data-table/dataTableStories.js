import React from 'react'
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {ThemeProvider} from 'styled-components'

import theme from '../../src/theme'
import {DataTable, ColumnType} from '../../src/components/common/DataTable'
import CenteredDataTable from './dataTableContainer'
import reducer from './dataTableReducer'
import {
    getMockDataNoneSelected,
    getMockDataFirstSelected,
    getMockDataAllSelected,
    getMockHeadersFirstFixed,
    getMockHeadersNoneFixed,
    getSortDataFirstAsc,
    getSortDataFirstDesc,
    getSortDataThirdAsc,
    getSortDataThirdDesc
} from './dataTableMockData'

const store = createStore(reducer)

storiesOf('DataTable', module)
    .addDecorator((getStory) => (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                { getStory() }
            </Provider>
        </ThemeProvider>
    ))
    .add('Without check column, no sort', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={false}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={{}}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
    .add('Without check column, no sort, no fixed', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={false}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={{}}
            headers={getMockHeadersNoneFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
    .add('Check column, no sort', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={{}}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
    .add('Check column, no sort, first row selected', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={{}}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataFirstSelected(10)}
        />
    )
    .add('Check column, no sort, all rows selected', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={{}}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataAllSelected(10)}
        />
    )
    .add('Check column, first col sorted asc', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={getSortDataFirstAsc()}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
    .add('Check column, first col sorted desc', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={getSortDataFirstDesc()}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
    .add('Check column, number col sorted asc', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={getSortDataThirdAsc()}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
    .add('Check column, number col sorted desc', () =>
        <CenteredDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
            getNextPage={action('nextPage')}
            rowSelected={action('selectRow')}
            getSortedData={action('sortData')}
            sortData={getSortDataThirdDesc()}
            headers={getMockHeadersFirstFixed()}
            data={getMockDataNoneSelected(10)}
        />
    )
