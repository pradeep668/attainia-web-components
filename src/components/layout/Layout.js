import React from 'react'
import PropTypes from 'prop-types'

import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Page from './Page'
import NavBarList from './NavBarList.container'

const Layout = ({children, navItems}) =>
    <Page>
        <Header className="header" />
        <NavBarList items={navItems} className="sidebar" />
        <Main className="main">{children}</Main>
        <Footer className="footer" />
    </Page>

Layout.propTypes = {
    children: PropTypes.node,
    navItems: PropTypes.arrayOf(PropTypes.object)
}

export const withLayout = (WrappedComponent) => {
    const WithLayout = ({navItems, ...passThroughProps}) =>
        <Layout navItems={navItems}>
            <WrappedComponent {...passThroughProps} />
        </Layout>

    WithLayout.propTypes = {
        navItems: PropTypes.arrayOf(PropTypes.object)
    }

    return WithLayout
}

export default Layout
