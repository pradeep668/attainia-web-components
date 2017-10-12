import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from '../common/Logo'
import ApplicationSearchButton from '../common/ApplicationSearchButton'
import NotificationButton from '../common/NotificationButton'
import {colors} from '../common/constants'

const Li = styled.div`
    color: ${colors.cornflowerBlue};
    text-align: center;
    background: white;
    height: 100%;
    padding: 0 15px;

    & img.headerLogo {
        width: 95px;
        height: 25px;
    }

    @supports not (display: grid) {
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        align-content: center;
    }
`
const ListHeader = styled.ul`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    list-style: none;
    margin: 0;
    padding: 0;
    background: ${colors.isabellineGray};

    .logo {
        padding-left: 50px;
    }

    @supports not (display: grid) {
        .profileMenu,
        .btnSearch,
        .btnNotifications,
        .logo {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr repeat(2, 50px) 130px;
        grid-template-rows: 50px;
        grid-column-gap: 3px;
    }
`
const Header = ({className}) =>
    <ListHeader className={className}>
        <Li className="logo"><Logo className="headerLogo" /></Li>
        <Li className="btnSearch">
            <ApplicationSearchButton />
        </Li>
        <Li className="btnNotifications">
            <NotificationButton />
        </Li>
        <Li className="profileMenu"><div>User Profile</div></Li>
    </ListHeader>

Header.propTypes = {
    className: PropTypes.string.isRequired
}

export default Header
