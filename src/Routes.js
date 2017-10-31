import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import Home from './App'
import {Layout, NotFound} from './components/layout'
import {
    AuthProvider,
    LoginContainer,
    PasswordHelpContainer,
    RegistrationContainer,
    RegisterApplicationContainer
} from './components/auth'

import {withLoginEnhancers} from './components/auth/enhancers'
import {withAuthentication} from './components/auth/decorators'

import store from './store'
import theme from './theme'

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={withAuthentication(Home)} />
                            <Route exact path="/login" component={withLoginEnhancers(LoginContainer)} />
                            <Route exact path="/password-help" component={PasswordHelpContainer} />
                            <Route exact path="/register" component={RegistrationContainer} />
                            <Route exact path="/register-application" component={RegisterApplicationContainer} />
                            <Route component={NotFound} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
