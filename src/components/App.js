import React from 'react'
import PropTypes from 'prop-types'

import AuthProvider from './auth/AuthProvider'
import Footer from './layout/Footer.container'
import Header from './layout/Header.container'
import Main from './layout/Main'
import Page from './layout/Page'

const App = ({children}) =>
    <AuthProvider>
        <Page>
            <Header className="header" />
            <Main className="main">{children}</Main>
            <Footer className="footer" />
        </Page>
    </AuthProvider>

App.propTypes = {
    children: PropTypes.node
}

export default App
