import React from 'react'
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {ThemeProvider} from 'styled-components'

import theme from '../../src/theme'
import {DataTable, ColumnType} from '../../src/components/common/DataTable'
import ThisDataTable from './dataTableContainer'
import reducer from './dataTableReducer'

const store = createStore(reducer)

storiesOf('DataTable', module)
    .addDecorator((getStory) => (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                { getStory() }
            </Provider>
        </ThemeProvider>
    ))
    .add('Data Table with check column', () =>
        <ThisDataTable
            rowHeight={50}
            tableWidth={1253}
            tableHeight={500}
            headerHeight={50}
            hasCheckColumn={true}
        />
    )
    .add('Data Table without check column', () =>
    <ThisDataTable
        rowHeight={50}
        tableWidth={2253}
        tableHeight={500}
        headerHeight={50}
        hasCheckColumn={false}
    />
)
