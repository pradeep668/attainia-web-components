import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

import Login from './components/auth/Login.container'
import AuthProvider from './components/auth/AuthProvider'
import {withLoginDecorators, withAuthentication} from './components/auth/decorators'

import Layout from './components/layout/Layout'
import NotFound from './components/layout/NotFound'
import PasswordHelp from './components/auth/PasswordHelp.container'
import Registration from './components/auth/Registration.container'
import RegisterApplication from './components/auth/RegisterApplication.container'

import Home from './App'

import store from './store'
import theme from './theme'

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <Layout>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={withAuthentication(Home)} />
                            <Route exact path="/login" component={withLoginDecorators(Login)} />
                            <Route exact path="/password-help" component={PasswordHelp} />
                            <Route exact path="/register" component={Registration} />
                            <Route exact path="/register-application" component={RegisterApplication} />
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                </Layout>
            </AuthProvider>
        </Provider>
    </ThemeProvider>
)
