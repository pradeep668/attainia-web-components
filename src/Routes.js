import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import DataTable from './components/common/DataTable.container'
import ResourcesList from './components/resources/ResourcesList.container'
import ResourcesDetail from './components/resources/ResourcesDetail.container'
import ResourcesNew from './components/resources/ResourcesNew.container'

import store from './store'
import theme from './theme'

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ResourcesList} />
                    <Route exact path="/home" component={ResourcesList} />
                    <Route exact path="/resources" component={ResourcesList} />
                    <Route exact path="/resources/new" component={ResourcesNew} />
                    <Route exact path="/resources/:id" component={ResourcesDetail} />
                    <Route exact path="/data_table" component={DataTable} /> {/* Only used for dev purposes */}
                </Switch>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
)
