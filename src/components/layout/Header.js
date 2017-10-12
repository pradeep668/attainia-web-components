import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from '../common/Logo'
import {colors} from '../common/constants'

const H1 = styled.h1`
    color: ${colors.rossoCorsa};
    text-align: center;
    vertical-align: middle;

    & img {
        margin-left: 40px;
        width: 95px;
        height: 25px;
    }
`
const StyledHeader = styled.header`
    background-color: white;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
`
const Header = ({className}) =>
    <StyledHeader className={className}>
        <H1><Logo /></H1>
    </StyledHeader>

Header.propTypes = {
    className: PropTypes.string.isRequired
}

export default Header
