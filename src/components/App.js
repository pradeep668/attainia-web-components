import React from 'react'
import PropTypes from 'prop-types'

import AuthProvider from './auth/AuthProvider'
import Footer from './layout/Footer.container'
import Header from './layout/Header.container'
import Main from './layout/Main'
import Page from './layout/Page'
import NavBarList from './layout/NavBarList'

const baseUrl = process.env.REACT_APP_AUTH_BASE_URL

const App = ({children}) =>
    <AuthProvider baseUrl={baseUrl}>
        <Page>
            <Header className="header" />
            <NavBarList className="sidebar" />
            <Main className="main">{children}</Main>
            <Footer className="footer" />
        </Page>
    </AuthProvider>

App.propTypes = {
    children: PropTypes.node
}

export default App
