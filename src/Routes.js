import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import Home from './App'
import {withLayout, NotFound} from './components/layout'
import {
    AuthProvider,
    LoginContainer,
    PasswordHelpContainer,
    RegistrationContainer,
    RegisterApplicationContainer
} from './components/auth'

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication, declarePermissionRestrictions} from './components/auth/decorators'

import store from './store'
import theme from './theme'

const withPermission = declarePermissionRestrictions(['app', 'admin'])

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={withAuthentication(withPermission(withLayout(Home)))} />
                        <Route exact path="/login" component={withLoginEnhancers(LoginContainer)} />
                        <Route exact path="/password-help" component={PasswordHelpContainer} />
                        <Route exact path="/register" component={RegistrationContainer} />
                        <Route exact path="/register-application" component={RegisterApplicationContainer} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
