import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import {NotFound, Modal} from '../components/layout'
import {AuthProvider} from '../components/auth'

import {withAuthentication} from '../components/auth/decorators'

import store from '../store'
import theme from '../theme'

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/category/new" component={withAuthentication(Modal)} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
