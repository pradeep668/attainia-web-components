import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Logo from '../common/Logo'
import {colors} from '../common/constants'

const H1 = styled.h1`
    color: ${colors.rossoCorsa};
    background-color: white;
    text-align: center;
    vertical-align: middle;
    padding: 20px 0;

    & img {
        margin: 5px auto;
    }
`
const Header = ({className}) =>
    <H1 className={className}><Logo /></H1>

Header.propTypes = {
    className: PropTypes.string.isRequired
}

export default Header
