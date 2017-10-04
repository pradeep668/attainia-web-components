import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors} from '../common/constants'

const Footer = styled.footer`
    background-color: ${colors.outerSpace};
    color: white;
    padding: 10px 20px;
    text-align: center;

    & a {
        color: white;
    }

    & a:hover,
    & a:focus {
        border-bottom: 1px solid white;
    }
`
const WrappedFooter = ({className}) =>
    <Footer className={className}>
        <small>
            2017 © Attainia, Inc. All Rights Reserved.
            <span> | </span>
            <a href="http://www.attainia.com/privacy_policy">Privacy Policy</a>
            <span> | </span>
            <a href="http://www.attainia.com/terms_of_service">Terms of Service</a>
        </small>
    </Footer>

WrappedFooter.propTypes = {
    className: PropTypes.string.isRequired
}

export default WrappedFooter
