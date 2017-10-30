import React from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer.container'
import Header from './Header.container'
import Main from './Main'
import Page from './Page'
import NavBarList from './NavBarList.container'

const Layout = ({children}) =>
    <Page>
        <Header className="header" />
        <NavBarList className="sidebar" />
        <Main className="main">{children}</Main>
        <Footer className="footer" />
    </Page>

Layout.propTypes = {
    children: PropTypes.node
}

export default Layout
