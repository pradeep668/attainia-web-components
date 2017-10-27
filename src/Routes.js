import React from 'react'
import {path, isNil} from 'ramda'
import {isNotNil} from 'ramda-adjunct'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import {ThemeProvider} from 'styled-components'

import Login from './components/auth/Login.container'
import AuthProvider from './components/auth/AuthProvider'
import {withTokenParsing} from './components/auth/ParseTokenFromStorage.container'
import PasswordHelp from './components/auth/PasswordHelp.container'
import Registration from './components/auth/Registration.container'
import RegisterApplication from './components/auth/RegisterApplication.container'
import Layout from './components/layout/Layout'
import NotFound from './components/layout/NotFound'

import Home from './App'

import store from './store'
import theme from './theme'

const locationHelper = locationHelperBuilder({})
const withAuthentication = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => isNotNil(path(['auth', 'user', 'id'], state)),
    wrapperDisplayName: 'Authenticator'
})

const withoutAuthentication = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => isNil(path(['auth', 'user', 'id'], state)),
    wrapperDisplayName: 'LoginWrapper'
})

export default (
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <AuthProvider>
                <Layout>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={withAuthentication(Home)} />
                            <Route exact path="/login" component={withoutAuthentication(withTokenParsing(Login))} />
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
