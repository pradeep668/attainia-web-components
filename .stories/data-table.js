import React from 'react'
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {ThemeProvider} from 'styled-components'

import theme from '../src/theme'
import {DataTable, ColumnType} from '../src/components/common/DataTable'
import ThisDataTable from './data-table-container'
import reducer from './data-table-reducer'

const store = createStore(reducer)

storiesOf('DataTable', module)
    .addDecorator((getStory) => (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                { getStory() }
            </Provider>
        </ThemeProvider>
    ))
    .add('Data Table Component', () => <ThisDataTable /> )
