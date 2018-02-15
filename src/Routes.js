import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import Stub from './components/homework/Stub'
import {NotFound} from './components/layout'

import store from './store'
import theme from './theme'

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Stub} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
)
